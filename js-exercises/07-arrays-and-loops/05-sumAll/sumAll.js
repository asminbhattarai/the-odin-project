const sumAll = function(start, end) {
  if (
    start < 0
    || end < 0
    || !(Number.isInteger(start))
    || !(Number.isInteger(end))
  ) {
    return 'ERROR';
  }

  let sum = 0;

  let i = (start < end) ? start : end;
  let j = (start > end) ? start : end;

  while (i <= j) {
    sum += i;
    i++;
  }

  return sum;
};

// Do not edit below this line
module.exports = sumAll;
