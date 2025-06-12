Array.prototype.snail = function (rowsCount, colsCount) {
  const arr = this;
  if (rowsCount * colsCount !== arr.length) return [];
  let result = [];
  let curRowIndex = 0;
  let curColIndex = 0;
  let curDir = "down";
  const nextDir = () => {
    curColIndex++;
    curDir = curDir === "down" ? "up" : "down";
  };
  for (let i = 0; i < arr.length; i++) {
    result[curRowIndex] = result[curRowIndex] ?? [];
    result[curRowIndex][curColIndex] = arr[i];
    if (curDir === "down") {
      curRowIndex++;
    } else {
      curRowIndex--;
    }
    if (curRowIndex === rowsCount) {
      nextDir();
      curRowIndex -= 1;
    }
    if (curRowIndex === -1) {
      nextDir();
      curRowIndex += 1;
    }
  }
  return result;
};
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].snail(3, 4);
console.log(arr);

// 输入：init = 5, calls = ["increment","reset","decrement"]
// 输出：[6,5,4]
// 解释：
// const counter = createCounter(5);
// counter.increment(); // 6
// counter.reset(); // 5
// counter.decrement(); // 4
var createCounter = function (init) {
  let count = init;
  return {
    increment: function () {
      return ++count;
    },
    reset: function () {
      count = init;
      return init;
    },
    decrement: function () {
      return --count;
    },
  };
};
