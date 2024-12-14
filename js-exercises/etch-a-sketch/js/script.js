// VARIABLE INITIATIONS

// constant global variables
const DEFAULT_SCREEN = "sketch";
const DEFAULT_TOOL = "paint";
const MAX_TOOL_SIZE = 100;
const DEFAULT_TOOL_SIZE = 85;
const DEFAULT_PAINT_STYLE = "mono";
const DEFAULT_MONO_COLOR = "rgb(0, 0, 0)";

// global variables for event listening
const PAD = document.querySelector(".pad");
const HANDLE_FIRST = PAD.querySelector(".handle.first");
const COLOR_PICKER = HANDLE_FIRST.querySelector("#color-picker");
const SKETCH = PAD.querySelector(".sketch");
const INFO = PAD.querySelector(".info");
const SLIDER = PAD.querySelector("#slider");

// global variables to keep track of current mode
let currentScreen = DEFAULT_SCREEN;
let currentTool = DEFAULT_TOOL;
let currentToolSize = DEFAULT_TOOL_SIZE;
let currentPaintStyle = DEFAULT_PAINT_STYLE;
let currentMonoColor = DEFAULT_MONO_COLOR;

// global variables for action depending on device input
let hover, click;
if ('onmousedown' in window || 'onmousemove' in window) {
  click = 'click';
  hover = 'mouseover';
} else {
  click = hover = 'swiped';
}


// LOGIC FUNCTIONS

// function to generate and return random rgba color
// a is in-between 0 and 1 and always multiple of 0.1
function getRandomRGBA () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const a = Math.floor(Math.random() * 10) / 10;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// function to process THE div
function processDiv (div) {
  switch (currentPaintStyle) {

    case DEFAULT_PAINT_STYLE:
      if (currentTool == DEFAULT_TOOL) {
        toolDiv(div, currentMonoColor, currentMonoColor)
      } else {
        toolDiv(div, 'rgb(255, 255, 255)', 'rgba(184, 184,184, 0.5)');
      }
      break;

    case 'rainbow':
      currentTool = DEFAULT_TOOL;
      currentPaintStyle = 'rainbow';

      let newRGBA, alpha = +div.dataset.alpha;

      if (alpha >= 1) {
        return;
      } else if (alpha) {
        alpha = (alpha + 0.1).toFixed(1);
	div.dataset.alpha = alpha;
        const rgba = getRandomRGBA();
	const alphaStartIndex = rgba.lastIndexOf(',') + 1;
	newRGBA = rgba.slice(0, alphaStartIndex) + ` ${alpha})`;
      } else {
        newRGBA = getRandomRGBA();
	alpha = newRGBA.slice(newRGBA.lastIndexOf(',') + 1, newRGBA.length - 1);
        div.dataset.alpha = alpha;
      }

      toolDiv(div, newRGBA, newRGBA);
      break;

    default:
      break;
  }
}

// function to process info button
function processInfoBtn() {
  switch(currentScreen) {

    case DEFAULT_SCREEN:
      currentScreen = 'info';
      toggleInfo();
      break;

    case 'info':
      currentScreen = DEFAULT_SCREEN;
      toggleInfo();
      break;

    default:
      break;
  }
}

// function to process paint button
function processPaintBtn () {
  switch (currentScreen) {

    case DEFAULT_SCREEN:
      if (!checkSketchChildren()) startPaint();
      currentScreen = DEFAULT_SCREEN;
      break;

    case 'info':
      currentScreen = DEFAULT_SCREEN;
      toggleInfo();
      break;

    default:
      break;
  }
}

// function to process clear button
function processClearBtn () {
  if (currentScreen !== DEFAULT_SCREEN) {
    return;
  }

  deleteSketchChildren();
  startPaint();
}

// function to check if sketch class has children or not
function checkSketchChildren () {
  const firstChild = SKETCH.querySelector('div');

  if (firstChild) {
    return true;
  } else {
    return false;
  }
}


// UI FUNCTIONS

// function to paint THE div
function toolDiv (div, color, borderColor) {
  div.style.background = color;
  div.style.border = `solid 1px ${borderColor}`;
}

// function to display info
function toggleInfo () {
  INFO.classList.toggle('show-flex');
}

// function to create divs in the sketch
function startPaint () {
  const border = "solid 1px rgba(184, 184, 184, 0.5)";
  let divsInRow = MAX_TOOL_SIZE - currentToolSize + 1;

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  for (let i = 0; i < divsInRow; i++) {
    const columnDiv = document.createElement('div');
    columnDiv.style.display = "flex";
    columnDiv.style.flex = "1 auto";

    for (let j = 0; j < divsInRow; j++) {
      const rowDiv = document.createElement('div');
      rowDiv.style.border = border;
      rowDiv.style.flex = "1 auto";

      columnDiv.appendChild(rowDiv);
    }

    containerDiv.appendChild(columnDiv);
    SKETCH.appendChild(containerDiv);
  }
}

// function to delete all children of sketch class
function deleteSketchChildren () {
  checkSketchChildren() && SKETCH.replaceChildren();
}


// EVENT LISTENERS

// listen for button clicks
PAD.addEventListener(click, (event) => {

  let button;

  console.log(event.type);

  if (event.target.alt)
  {
    button = event.target.alt;
  }
  else if (event.target.id == 'slider')
  {
    if (currentScreen == 'info') {
      event.target.value = currentToolSize;
    }
    else
    {
      currentToolSize = event.target.value;
      processClearBtn();
    }
    return;
  }
  else
  {
    return;
  }

  switch (button) {

    case 'info':
      processInfoBtn();
      break;

    case 'paint':
      currentTool = DEFAULT_TOOL;
      processPaintBtn();
      break;

    case 'clear':
      processClearBtn();
      break;

    case 'eraser':
      currentTool = button;
      break;

    case 'rainbow':
      currentPaintStyle = button;
      break;

    default:
      break;
  }
});

// listen for hover
SKETCH.addEventListener(hover, (event) => {
  const div = event.target;
  const isSketchDiv = div == SKETCH;

  if (isSketchDiv) return;

  processDiv(div);
});

// click color picker is bugging out so separate listen event
// listen for color picker input
PAD.addEventListener('input', (event) => {
  if (event.target.id == 'color-picker') {
    currentPaintStyle = DEFAULT_PAINT_STYLE;
    currentMonoColor = event.target.value;
  }
});


// START
HANDLE_FIRST.querySelector('img[alt="paint"]').click();
HANDLE_FIRST.querySelector('img[alt="info"]').click();
