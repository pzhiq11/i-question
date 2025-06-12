Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || window; // 默认为window
  const key = Symbol(); // 唯一属性名键，避免冲突
  ctx[key] = this; // this即函数
  const result = ctx[key](...args); // 执行函数（cxt上下文调用后，函数的this就指向ctx）
  delete ctx[key]; // 删除属性
  return result;
};

function greet(name) {
  console.log(name);
  console.log(this);
}
const person = {
  name: "Alice",
};
greet.myCall(person, "wifi");

/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function (arr, fn) {
  // return arr.sort((acc, cur) => fn(acc) - fn(cur));
  // 不使用 sort

  const result = [...arr];
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (fn(result[j]) > fn(result[j + 1])) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  return result;
};

console.log(sortBy([{ x: 10 }, { x: 0 }, { x: 5 }], (o) => o.x));

var join = function (arr1, arr2) {
  const map = new Map();
  arr1.concat(arr2).forEach((item) => {
    map.set(item.id, {
      ...map.get(item?.id),
      ...item,
    });
  });
  return [...map.values()].sort((a, b) => a.id - b.id);
};
console.log(
  join(
    [
      { id: 1, x: 1 },
      { id: 2, x: 9 },
    ],
    [{ id: 3, x: 5 }]
  )
);

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #_status = PENDING;
  #_result;
  #thenables = [];

  constructor(executor) {
    const resolve = (data) => {
      // console.log("resolve", data);
      this.#changeStatus(FULFILLED, data);
    };
    const reject = (reason) => {
      // console.log("reject", reason);
      this.#changeStatus(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // 状态一旦改变就不能再改变
  #changeStatus(status, result) {
    if (this.#_status !== "pending") return;
    this.#_status = status;
    this.#_result = result;
    this.#run();
  }

  #handleCallback(callback, resolve, reject) {
    if (typeof callback !== "function") {
      queueMicrotask(() => {
        const settled = this.#_status === FULFILLED ? resolve : reject;
        settled(this.#_result);
      });
      return;
    }
    queueMicrotask(() => {
      try {
        const result = callback(this.#_result);
        if (result instanceof MyPromise || result instanceof Promise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  #run() {
    if (this.#_status === PENDING) return;
    while (this.#thenables.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#thenables.shift();
      if (this.#_status === FULFILLED) {
        this.#handleCallback(onFulfilled, resolve, reject);
      } else {
        this.#handleCallback(onRejected, resolve, reject);
      }
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#thenables.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally();
        return value;
      },
      (reason) => {
        onFinally();
        throw reason;
      }
    );
  }
  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }
}
const p = new MyPromise(async (resolve, reject) => {
  console.log("pppp");
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p.then(async (res) => {
  console.log("res then", res);
  let a = await new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 1000);
  });
  return a;
})
  .then((res) => {
    console.log("res then2", res);
    // throw new Error("error2");
  })
  .catch((err) => {
    console.log("err", err);
  })
  .finally(() => {
    console.log("finally");
  });

/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  if (!arr.length) return;
  const getArrayFistValue = (array) => {
    let value = [];
    array?.forEach((item) => {
      if (Array.isArray(item)) {
        value = [...value, ...getArrayFistValue(item)];
      } else {
        value.push(item);
      }
    });
    return value;
  };
  for (const item of getArrayFistValue(arr)) {
    yield item;
  }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */

/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  let result = [];
  const arr = this;
  let curRowIndex = 0;
  let curColIndex = 0;
  let curDir = "down";
  for (let i = 0; i < arr.length; i++) {
    result[curRowIndex][curColIndex] = arr[i];
    if (curDir === "down") {
      curRowIndex++;
    } else {
      curRowIndex--;
    }
    if (curRowIndex === rowsCount) {
      curColIndex++;
      curDir = "up";
      curRowIndex -= 1;
    }
    if (curRowIndex === -1) {
      curColIndex++;
      curDir = "down";
      curRowIndex += 1;
    }
  }
  return result;
};
// 输入：
// nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
// rowsCount = 5
// colsCount = 4
// 输出：
// [
//  [19,17,16,15], 00 10 20 30 40  41 31 21 11 01
//  [10,1,14,4],
//  [3,2,12,20],
//  [7,5,18,11],
//  [9,8,6,13]
// ]

/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
  // 方法1： 使用reduce+递归
  if (n === 0) return arr;
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && n > 0) {
      acc.push(...flat(cur, n - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
  //循环 + 递归
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item) && n > 0) {
      result.push(...flat(item, n - 1));
    } else {
      result.push(item);
    }
  }
  return result;
};

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, t);
  };
};

var TimeLimitedCache = function () {
  this.cache = new Map();
};

/**
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function (key, value, duration) {
  let oldValue = this.cache.get(key);
  oldValue && clearTimeout(oldValue.timerId);
  let timerId = setTimeout(() => this.cache.delete(key), duration);
  this.cache.set(key, { value, timerId });
  return !!oldValue;
};

/**
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function (key) {
  return this.cache.get(key)?.value ?? -1;
};

/**
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function () {
  return this.cache.size;
};

/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
  let cache = new Map();
  return function (...args) {
    let key = args.join(",");
    if (cache.has(key)) {
      return cache.get(key);
    }
    let result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

class EventEmitter {
  eventMap = new Map();
  /**
   * @param {string} eventName
   * @param {Function} callback
   * @return {Object}
   */
  subscribe(eventName, callback) {
    let event = this.eventMap.get(eventName);
    const id = Symbol();
    const eventItem = {
      id,
      callback,
    };
    if (!event) {
      this.eventMap.set(eventName, [eventItem]);
    } else {
      event.push(eventItem);
    }
    return {
      unsubscribe: () => {
        this.eventMap.set(
          eventName,
          this.eventMap.get(eventName).filter((item) => item.id !== id)
        );
        return undefined;
      },
    };
  }

  /**
   * @param {string} eventName
   * @param {Array} args
   * @return {Array}
   */
  emit(eventName, args = []) {
    let event = this.eventMap.get(eventName);
    if (!event) return [];
    return event.map((item) => item.callback(...args));
  }
}
