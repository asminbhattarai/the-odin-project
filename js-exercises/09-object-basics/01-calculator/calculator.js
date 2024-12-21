const add = function(a, b) {
  return a + b;
};

const subtract = function(a, b) {
  return a - b;
};

const sum = function(arr) {
  return arr.reduce( (acc, item) => acc += item, 0);
};

const multiply = function(arr) {
  return arr.reduce ( (acc, item) => acc *= item, 1);
};

const power = function(base, exp) {
  return base ** exp;
};

const factorial = function(number) {
  return number <= 1 ? 1 : number * factorial(number - 1);
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
