/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
var checkIfInstanceOf = function (obj, classFunction) {
  if (obj === null || obj === undefined) return false;
  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto.constructor === classFunction) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
};
class Animal {}
class Dog extends Animal {}
console.log(checkIfInstanceOf(new Dog(), Animal));
console.log(new Dog() instanceof Animal);

