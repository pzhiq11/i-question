console.log('同步1')
const promiseA = Promise.resolve('1') // 放入微任务队列
console.log('同步2')
promiseA
  .then((res) => {
    console.log('promiseA then1', res)
  })
  .then((res) => {
    console.log('promiseA then2', res)
  })

const promiseB = Promise.resolve('2') // b同理
promiseB
  .then((res) => {
    console.log('promiseB then1', res)
  })
  .then((res) => {
    console.log('promiseB then2', res)
  })


async function asy1() {
  console.log(1);
  await asy2();
  console.log(2);
}

const asy2 = async () => {
  console.log(3);
  await setTimeout(() => {
    Promise.resolve().then(() => {
      console.log(4);
    });
    console.log(5);
  }, 0);
};

const asy3 = async () => {
  Promise.resolve().then(() => {
    console.log(6);
  });
};

asy1();
console.log(7);
asy3();
// 1 3 7 6 2 5 4


setTimeout(() => {
  console.log(1)
}, 0)

new Promise((resolve) => {
  console.log(2)
  for (let i = 0; i < 10000; i++) {
    i === 999 && resolve()
  }
  // 先执行完后面的逻辑再将then放入队列中
  Promise.resolve().then(() => {
    console.log(6)
  })
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
// 2 3 5 6 4 1


console.log('<<<<<<<<<<');

let a
let b = new Promise((resolve) => {
  console.log(1)
  setTimeout(() => {
    resolve()
  }, 1000)
}).then(() => {
  console.log(2)
})

a = new Promise(async (resolve) => {
  console.log('a1', a)
  await b
  console.log('a2', a)
  console.log(3)
  await a
  resolve(true)
  console.log(4)
})

console.log(5)





const first = () => {
  return new Promise((resolve, reject) => {
    console.log(3)
    let p = new Promise((resolve, reject) => {
      console.log(7)
      setTimeout(() => {
        console.log(5)
        resolve(6)
        console.log(p)
      }, 0)
      resolve(1)
    })
    resolve(2)
    p.then((arg) => {
      console.log(arg, 'p')
    })
  })
}

first().then((arg) => {
  console.log(arg, 'first')
})

console.log(4)