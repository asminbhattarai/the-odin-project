const removeFromArray = function(arr, ...num) {
  let filteredArr = arr.filter( x => !num.includes(x));
  return filteredArr;
};

// Do not edit below this line
module.exports = removeFromArray;
