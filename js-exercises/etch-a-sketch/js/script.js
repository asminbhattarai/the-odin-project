// VARIABLE INITIATIONS

// constant global variables
const DEFAULT_MODE = "draw";
const DEFAULT_SCREEN = "draw";
const DEFAULT_SIZE = 16;
const DEFAULT_STYLE = "mono";
const DEFAULT_COLORPICKER = "rgb(255, 255, 255)";

// global variables for event listening
const PAD = document.querySelector(".pad");
const HANDLE_FIRST = PAD.querySelector(".handle.first");
const COLOR_PICKER = HANDLE_FIRST.querySelector("#color-picker");
const SCREEN = PAD.querySelector(".sketch");
const INFO = PAD.querySelector(".info");
const SLIDER = PAD.querySelector("#slider");

// global variables to keep track of current mode
let current_mode = DEFAULT_MODE;
let current_screen = DEFAULT_SCREEN;
let current_size = DEFAULT_SIZE;
let current_style = DEFAULT_STYLE;
let current_colorPicker = DEFAULT_COLORPICKER;

// set initial values

// LOGIC FUNCTIONS

// function to convert hex color to rgb color code
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex.split('').map(function (hexChar) {
      return hexChar + hexChar;
    }).join('');
  }

  if (hex.length === 6) {
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
}


// UI FUNCTIONS

// function to display info
function toggleInfo () {
  INFO.classList.toggle('show-flex');
}

// LOGIC + UI FUNCTIONS

// EVENT LISTENERS

// listen for button clicks
PAD.addEventListener('click', (event) => {
  const button = event.target.alt;

  switch (button) {

    case 'info':
      toggleInfo();
      break;

    default:
      console.log("In development!");
      break;
  }
});
