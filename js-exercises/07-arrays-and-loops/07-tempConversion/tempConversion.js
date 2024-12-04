const PRECISION = 1;

const convertToCelsius = function(fahrenheit) {
  const celsius = (fahrenheit - 32) * 5 / 9;
  const preciseCelsius = +celsius.toFixed(PRECISION);
  return preciseCelsius;
};

const convertToFahrenheit = function(celsius) {
  const fahrenheit = (celsius * 9 / 5) + 32;
  const preciseFahrenheit = +fahrenheit.toFixed(PRECISION);
  return preciseFahrenheit;
}

// Do not edit below this line
module.exports = {
  convertToCelsius,
  convertToFahrenheit
};
