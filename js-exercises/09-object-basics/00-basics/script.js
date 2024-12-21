// ================
// JAVASCRIPT.INFO
// ================

// creating object
user = {}
dummy = {}

// adding properties to object
user.name = 'John';
user.surname = 'Smith';

// modify property in object
user['name'] = 'Pete';

// deleting property from object
delete user['name'];

/**
  * Check if an object has properties or not
  * @param {Object} - obj to check in
  */
function isEmpty(obj) {
  for (let prop in obj) return false;
  return true;
}

// print isEmpty result
// alert(isEmpty(user));
// alert(isEmpty(dummy));

// object to keep salary of the team
let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
}

/**
  * Return total salary of the team
  * @param {Object} - obj storing salaries
  * @returns {float} - total salary
  */
function addAllSalary(obj) {
  let sum = 0;
  for (let prop in obj) sum += obj[prop];
  return sum;
}

// print total salary
// alert(addAllSalary(salaries));

/**
  * Multiply all numeric property values by 2
  * @param {Object} - obj whose numeric property values is to be doubled
  */
function multiplyNumeric(obj) {
  for (let prop in obj) {
    if (typeof obj[prop] === 'number') {
      obj[prop] *= 2;
    }
  }
}

// object to store menu property
let menu = {
  width: 200,
  height: 300,
  title: "Learn Object Basics",
}

// display menu property
// console.log(menu);

// apply multiplyNumeric to menu
multiplyNumeric(menu);

// display menu property
// console.log(menu);

// ====
// MDN
// ===

// creating object
const person = {
  name: {
    first: 'Bob',
    last: 'Smith',
  },
  age: 30,
  bio: function() {
    console.log(`${this.name.first} ${this.name.last} is ${this.age} years old.`);
  },
  introduceSelf() {
    console.log(`Hi! I'm ${this.name.first}.`);
  },
};

// setting object members
const myDataName = 'height';
const myDataValue = '1.75m';
person.age = 45;
person['name']['last'] = 'Cratchit';
person[myDataName] = myDataValue;


// creating object members
person['eyes'] = 'hazel';
person.farewell = function() {
  console.log("Bye everybody!");
};

// function to create object
function createPerson(name) {
  const obj = {};
  obj.name = name;
  obj.introduceSelf = function() {
    console.log(`Hi! I'm ${this.name}.`);
  };
  return obj;
}

// creating object using createPerson
const asmin = createPerson('Asmin');
const notAsmin = createPerson("Not Asmin");

// call object methods
// asmin.introduceSelf();
// notAsmin.introduceSelf();

// constructor
function Person(name) {
  this.name = name;
  this.introduceSelf = (() => {
    console.log(`Hi! I'm ${this.name}.`);
  });
}

// creating object using new and Person
const anotherAsmin = new Person("Another Asmin");
const notAnotherAsmin = new Person("Not Another Asmin");

// call object methods
// anotherAsmin.introduceSelf();
// notAnotherAsmin.introduceSelf();

// create Notification object
const myNotification = new Notification('Hello!');

// ================
// JAVASCRIPT.INFO
// ================

/**
  * Remove hyphen and capitalize letter after hyphen
  * @param {string} - str to be camelized
  */
function camelize(str) {
  return str
    .split('-')
    .map(
      (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join('');
}

// creating an array
const arr = ['background-color', 'list-style-type', '-webkit-transition', "border-left-width"];

// create an array that stores camelized arr
const camelizedArr = arr.map( (item) => camelize(item));

// display camelized array
// console.log(camelizedArr);

// function to filter values out of the range
function filterRange(arr, min, max) {
  return arr
    .filter( (num) => num >= min && num <= max );
}

// creating a numerical array
const numArr = [3, 5, 8, 1];

// creating an array to store filtered array
const filteredNumArr = filterRange(numArr, 3, 6);

// display filtered numerical array
// console.log(filteredNumArr);

// function to remove filtered out items from array
function filterRangeInPlace(arr, min, max) {
  for (let i = 0; i < arr.length; i++ ) {
    let item = arr[i];
    if (item < min || item > max) {
      arr.splice(i, 1);
      i--;
    }
  }
}

// filter out from numerical array
filterRangeInPlace(numArr, 1, 5);

// display numerical array
// console.log(numArr);

// function to sort in descending order
function sortRev(arr) {
  return arr
    .sort( (a, b) => b-a );
}

// sort numerical array in descending order
sortRev(numArr);

// display numerical array
// console.log(numArr);

// function to copy array and return sorted copy array
function copySorted(arr) {
  let newArr = [...arr];
  return newArr
    .sort();
}

// creating an array to copy sorted arr
const sortedArr = copySorted(arr);

// display an array
// console.log(sortedArr);

// creating a constructor
function Calculator() {
  this.methods = {
    '-': (a, b) => a-b,
    '+': (a, b) => a+b,
  };

  this.calculate = function(str) {
    let [operandOne, operator, operandTwo] = str.split(' ');
    operandOne = +operandOne, operandTwo = +operandTwo;
    if (!this.methods[operator] || isNaN(operandOne) || isNaN(operandTwo)) return NaN;
    return this.methods[operator](operandOne, operandTwo);
  }

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  }
}

// creating new Calculator
const abacusCalculator = new Calculator;

// perform and display calculations with abacus calculator
// console.log(abacusCalculator.calculate("231 + 321"));
// console.log(abacusCalculator.calculate("231 - 321"));

// creating new Calculator
const simpleCalculator = new Calculator;

// add new methods to simpleCalculator
simpleCalculator.addMethod('*', ( (a, b) => a*b ));
simpleCalculator.addMethod('/', ( (a, b) => a/b ));
simpleCalculator.addMethod('**', ( (a, b) => a**b ));

// perform and display calculations with simple calculator
// console.log(simpleCalculator.calculate("231 - 321 "));
// console.log(simpleCalculator.calculate("231 + 321 "));
// console.log(simpleCalculator.calculate("231 * 321 "));
// console.log(simpleCalculator.calculate("231 / 321 "));
// console.log(simpleCalculator.calculate("23 ** 32 "));

// function to return keys of name property in an array of objects
function keysToArray(objArr) {
  return objArr
    .map( (obj) => obj.name );
}

// creating some objects
const hari = { name: 'Hari', age: 20, surname: 'Ale', };
const alok = { name: 'Alok', age: 23, surname: 'Luitel', };
const gita = { name: 'Gita', age: 22, surname: 'Shrestha', };

// grouping objects into an array
const customers = [hari, alok, gita];

// get customer names in an array
const customerNames = keysToArray(customers);

// display customer names
// console.log(customerNames);

// function to map to object
function mapToObj(objObj) {
  return Object.keys(objObj)
    .reduce((acc, key) => {
      const { name, age, surname } = objObj[key];
      acc[key] = { fullName: `${name} ${surname}`, age: age, };
      return acc;
    }, {});
};

// grouping objects into an object
const customersAgain = { hari, alok, gita, };

// get objects in an object
const customerObject = mapToObj(customersAgain);

// display customer details
// console.log(customerObject);

// function to sort array of object based on a key
function sortByAge(objArr) {
  objArr.sort( (a, b) => a.age - b.age);
}

// sort customers
sortByAge(customers);

// display customers
// console.log(customers);

// function to shuffle an array
function shuffle(arr) {
  const length = arr.length;
  for (i = 0; i < length; i++) {
    const random = Math.floor((Math.random() * length));
    const temp = arr[random];
    arr[random] = arr[i];
    arr[i] = temp;
  }
}

// display array
// console.log(numArr);

// function to get average age
function getAverageAge(objArr) {
  return objArr
    .reduce( (acc, obj) => acc += obj.age, 0 )
    / objArr.length;
}

// calculate average age
const averageAge = getAverageAge(customers);

// display average age
// console.log(averageAge);

// function to return unique array
function unique(arr) {
  return arr
    .filter( (item, index) => arr.indexOf(item) === index );
}

// create array with repeating items
const repeatArr = [1, 3, 1, 8, 1, 2, 4, 6, 1, 2, 3, 1, 7, 4, 9, 5, 1];

// make array unique
const uniqArr = unique(repeatArr);

// display array
// console.log(uniqArr);

// function to make value of key name object name
function groupByName(objArr) {
  return objArr
    .reduce( (acc, obj) => {
      acc[obj.name.toLowerCase()] = obj;
      return acc;
    }, {});
}

// create grouped object
const groupedCustomers = groupByName(customers);

// display grouped object
// console.log(groupedCustomers);

// ============================
// CARDIO PRACTICE 1 - Wes Bos
// ============================

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

const people = [
  'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
  'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
  'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
  'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
  'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
];
    
// Array.prototype.filter()
// Filter the list of inventors for those who were born in the 1500's
// console.table(inventors.filter( (obj) => obj.year >= 1500 && obj.year < 1600));

// Array.prototype.map()
// Give us an array of the inventors first and last names
// console.table(inventors.map( (obj) => obj.first + ' ' + obj.last));

// Array.prototype.sort()
// Sort the inventors by birthdate, oldest to youngest
// console.table(inventors.sort( (objA, objB) => objA.year - objB.year));

// Array.prototype.reduce()
// How many years did all the inventors live all together?
// console.log(inventors.reduce( (acc, obj) => acc += obj.passed - obj.year, 0));

// Sort the inventors by years lived
// console.table(inventors.sort( (objA, objB) => (objA.passed-objA.year) - (objB.passed-objB.year)));

// Create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
const boulevards = Array.from(document.querySelectorAll('li'));
const boulevardsArr = boulevards.map( (boulevard) => boulevard.textContent);
// console.log(boulevardsArr.filter( (boulevard) => boulevard.indexOf('de') !== -1));

// Sort Exercise
// Sort the people alphabetically by last name
// console.log(people.sort( (a, b) => a.localeCompare(b)));

// Reduce Exercise
// Sum up the instances of each of these
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
/**
console.log(data
  .reduce( (obj, item) => {
    obj[item] = obj[item] ? obj[item] + 1 : 1;
    return obj;
  }, {}));
*/

// ============================
// CARDIO PRACTICE 2 - Wes Bos
// ============================

const peopleAgain = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
];

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 }
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
// Array.prototype.every() // is everyone 19 or older?
const currentYear = new Date().getFullYear();
// console.log(peopleAgain.some( (obj) => (currentYear - obj.year) >= 19 ));
// console.log(peopleAgain.every( (obj) => (currentYear - obj.year) >= 19 ));

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
// console.log(comments.find( (obj) => obj.id === 823423));

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
const indexFound = comments.findIndex( (obj) => obj.id === 823423);
// console.log(indexFound);
// console.table(comments);
delete comments[indexFound];
// console.table(comments);
