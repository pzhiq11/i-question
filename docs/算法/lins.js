Function.prototype.myCall = function (context, ...args) {
  const ctx = context || global || window;
  const key = Symbol();
  ctx[key] = this;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};

function a(num) {
  console.log("pppp:", this.name, num, this);
}

a.myCall({ name: "zq" }, 12);
