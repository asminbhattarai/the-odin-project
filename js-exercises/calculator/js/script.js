// =================
// Global Variables
// =================

const container = document.querySelector('.container');
const operator = document.querySelector('.operator');
const current = document.querySelector('.current');
const previous = document.querySelector('.previous');
let wasAssignment = false;

// ===============
// EVENT LISTENER
// ===============

container.addEventListener('click', (event) => {
  processClick(event.target);
});

document.addEventListener('keydown', (event) => {
  processKeyDown(event.key);
});

// ==================
// LOGICAL FUNCTIONS
// ==================

/**
  * Function to process click
  * @param {Element} element - Clicked element to be processed
  */
function processClick(element) {
  let name = element.name;
  let value = element.value;

  if (element.name === undefined) {
    return;
  }

  switch (name)
  {

    case 'number':
      processNumber(value);
      break;

    case 'operator':
      processOperator(value);
      break;

    case 'eraser':
      processEraser(value);
      break;

    case 'special':
      processSpecial(value);
      break;

    default:
      break;
  }
}

/**
  * Function to process key down
  * @param {Key} key - key to be processed
  */
function processKeyDown(key)
{
  const operators = '+-*/=';
  const specials = '.%';
  const clears = 'Backspace'

  if (+key >= 0 && +key <= 9) {
    processNumber(key);
  } else if (operators.includes(key)) {
    processOperator(key);
  } else if (key === clears) {
    processEraser(key);
  } else if (specials.includes(key)) {
    processSpecial(key);
  }
}

/**
  * Function to adjust font size based on element width
  * @param {Element} element - Element whose font size is to be changed
  */
function adjustFontSize(element) {
  element.style.removeProperty('font-size');
  while (element.scrollWidth > element.offsetWidth) {
    const fontSize = parseInt(window.getComputedStyle(element).fontSize);
    element.style.fontSize = `${fontSize - 1}px`;
  }
}

/**
  * Function to process number
  * @param {Number} number - Number to process
  */
function processNumber(number) {
    const length = current.textContent.length;

    if (length >= 25) {
      return;
    }

    if (current.textContent === '0') {
      current.textContent = number;
    } else if (wasAssignment) {
      previous.textContent = current.textContent;
      current.textContent = number;
      wasAssignment = false;
    } else {
      current.textContent += number;
    }

    adjustFontSize(current);
}

/**
  * Function to process operator
  * @param {Operator} operator - Operator to process
  */
function processOperator(op) {
  const calculate = {
    '+': (a, b) => +a + +b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (+b === 0 || (typeof +b) !== 'number') {
        return 'bumblebee';
      } else {
        return a / b;
      }
    },
  };

  const left = previous.textContent;
  const right = current.textContent;
  const oper = operator.textContent;

  if (op === '=') {
    previous.textContent = current.textContent;
    if (oper === '') return;

    const result = calculate[oper](left, right);
    if (result === 'bumblebee') {
      current.textContent = result;
    } else {
      current.textContent = +result.toPrecision(10);
    }

    wasAssignment = true;
  } else if (wasAssignment || current.textContent === '0') {
    operator.textContent = op;
  } else {
    operator.textContent = op;
    previous.textContent = current.textContent;
    current.textContent = '0';
  }

  adjustFontSize(previous);
  adjustFontSize(current);
}

/**
  * Function to process eraser
  * @param {Eraser} eraser - Eraser to process
  */
function processEraser(eraser) {
  if (eraser === 'all-clear') {
    operator.textContent = '';
    previous.textContent = current.textContent = 0;
  } else if (eraser === undefined || eraser === 'Backspace') {
    current.textContent = current.textContent.slice(0, -1);
  }
}

/**
  * Function to process special operator
  * @param {Special} special - Special operator to process
  */
function processSpecial(special) {
  if (special === 'percent' || special === '%') {
    current.textContent = +(current.textContent / 100).toPrecision(10);
  } else if (special === 'dot' || special === '.') {
    if (wasAssignment) {
      previous.textContent = current.textContent;
      current.textContent = '0.';
      wasAssignment = false;
    }
    else if (!(current.textContent.includes('.') || current.textContent.includes('e'))) {
      current.textContent += '.';
    }
  }

  adjustFontSize(current);
}
