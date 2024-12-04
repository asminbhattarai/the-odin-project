const reverseString = function(string) {
  let arrString = string.split('');
  let revArr = arrString.reverse();
  let revString = revArr.join('');
  return revString;
};

// Do not edit below this line
module.exports = reverseString;
