function processStr(str) {
  const accepted = 'abcdefghihklmnopqrstuvwxyz0123456789';
  return str
    .toLowerCase()
    .split('')
    .filter(char => accepted.indexOf(char) !== -1)
    .join('');
}

const palindromes = function (str) {
  const processedStr = processStr(str);
  const len = processedStr.length;
  for (let i = 0; i < len / 2 - 1; i++)
  {
    if (processedStr[i] !== processedStr[len-i-1])
      return false;
  }

  return true;
};

// Do not edit below this line
module.exports = palindromes;
