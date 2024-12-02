// JS info

let name = "Ilya";
alert (`hello ${1}`);
alert(`hello ${"name"}`);
alert(`hello ${name}`);

console.log(5 > 4);
console.log("apple" > "pineapple");
console.log("2" > "12");
console.log(undefined == null);
console.log(undefined === null);
console.log(null == "\n0\n");
console.log(null === +"\n0\n");

alert(null || 2 || undefined);
alert(alert(1) || 2 || alert(3));
alert(1 && null && 2);
alert(alert(1) && alert(2));
alert(null || 2 && 3 || 4);

let age = prompt("Age:", 18);
if (age >= 14 && age <= 90) {
  alert("You can watch the movie.");
}

age = prompt("Age:", 18);
if (!(age >= 14 && age <= 90)) {
  alert("You are too young. Or too old!");
}

age = prompt("Age:", 18);
if (age < 14 || age > 90) {
  alert("You are too young. Or too old!");
}

if (-1 || 0) alert( 'first' );
if (-1 && 0) alert( 'second' );
if (null || -1 && 1) alert( 'third' );

let userLevel = prompt('Who\'s there?');
if (userLevel === 'Admin') {
  let pw = prompt('Password?');
  if (pw === 'TheMaster') {
    alert('Welcome!');
  } else if (pw == null) {
    alert('Cancelled');
  } else {
    alert('Wrong Password');
  }
} else if (userLevel == null) {
  alert('Cancelled');
} else {
  alert('I don\'t know you.');
}

if ('0') {
  alert('Hello!');
}

let officialName = prompt('What\'s the \'official\' name of JavaScript?');
if (officialName === 'ECMAScript') {
  alert('Right!');
} else {
  alert('You don\'t know? \'ECMAScript\'!');
}

let value = prompt('Type a number', 0);

if (value > 0) {
  alert(1);
} else if (value < 0) {
  alert(-1);
} else {
  alert(0);
}

const a = 0, b = 3;
let result = (a + b < 4) ? 'Below' : 'Over';

let login;
let message = (login === 'Employee') ? 'Hello' :
  (login === 'Director') ? 'Greetings' :
  (login === '') ? 'No login' :
  '';

let browser;
if(browser == 'Edge') {
  alert("You've got the Edge!");
} else if (browser == 'Chrome'
 || browser == 'Firefox'
 || browser == 'Safari'
 || browser == 'Opera') {
  alert( 'Okay we support these browsers too' );
} else {
  alert( 'We hope that this page looks ok!' );
}

let c = +prompt('c?', '');

switch (c) {
  case 0:
    alert( 0 );
    break;

  case 1:
    alert( 1 );
    break;

  case 2:
  case 3:
    alert( '2,3' );
    break;
}

// JS info end
