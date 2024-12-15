// ========================
// VARIABLE INITIALIZATION
// ========================

// Default configuration constants
const DEFAULT_SCREEN = "info";
const DEFAULT_TOOL = "draw";
const MAX_TOOL_SIZE = 100;
const DEFAULT_TOOL_SIZE = 85;
const DEFAULT_PAINT_STYLE = "mono";
const DEFAULT_MONO_COLOR = "rgb(0, 0, 0)";

// DOM element references
const MAIN = document.querySelector("main");
const TOOLBAR_TOP = MAIN.querySelector(".toolbar.top");
const COLOR_PICKER = TOOLBAR_TOP.querySelector("#color-picker");
const SKETCH_AREA = MAIN.querySelector(".sketch");
const INFO_PANEL = MAIN.querySelector(".info");
const TOOL_SIZE_SLIDER = MAIN.querySelector("#slider");

// State variables
let currentScreen = DEFAULT_SCREEN;
let currentTool = DEFAULT_TOOL;
let currentToolSize = DEFAULT_TOOL_SIZE;
let currentPaintStyle = DEFAULT_PAINT_STYLE;
let currentMonoColor = DEFAULT_MONO_COLOR;
let currentGlowing = null;
let previousHoveredDiv = null;

// Debounce variables
let sliderDebounceTimer = null;

// =====================
// LOGIC + UI FUNCTIONS
// =====================

/**
 * Generates a random RGBA color with 0 as the initial alpha.
 * @returns {string} Random RGBA color
 */
function generateRandomRGBA() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0)`;
}

/**
  * Processes (paints or erases) the given div based on the current tool and paint style.
  * @param {HTMLElement} div - The target div to process
  */
function processDiv(div) {
  let color = null;
  let border = null;

  switch (currentPaintStyle) {
    case DEFAULT_PAINT_STYLE: // Mono-color painting
      color = currentTool === DEFAULT_TOOL ? currentMonoColor : "rgb(255, 255, 255)";
      border = currentTool === DEFAULT_TOOL ? currentMonoColor: "rgba(184, 184, 184, 0.5)";
      break;

    case 'rainbow': // Rainbow painting
      if (currentTool == DEFAULT_TOOL) {
        let alpha = parseFloat(div.dataset.alpha) || Math.random() * 0.9;
        if (alpha >= 1) return;

        alpha = (alpha + 0.1).toFixed(1);
        div.dataset.alpha = alpha;

        const randomColor = generateRandomRGBA();
        color = randomColor.replace('0)', `${alpha})`);
        border = color;
      } else {
        color = "rgb(255, 255, 255)";
	border = "rgba(182, 184, 184, 0.5)";
      }
      break;

    default:
      break;
  }

  applyToolStyle(div, color, border);
}

/**
  * Toggles the visibility of the info panel.
  */
function toggleInfoPanel() {
/*  const infoPanelDisplay = window.getComputedStyle(INFO_PANEL).display;
  INFO_PANEL.style.display = infoPanelDisplay === 'flex' ? 'none' : 'flex'; */
  INFO_PANEL.classList.toggle("hidden");
}

/**
  * Clears the sketch area and starts fresh.
  */
function clearSketchArea() {
  if (currentScreen !== DEFAULT_SCREEN) {
    deleteSketchChildren();
    initializeSketchArea();
  }
}

/**
  * Deletes all child elements of the sketch area.
  */
function deleteSketchChildren() {
  SKETCH_AREA.replaceChildren();
}

/**
  * Creates the grid of divs for the sketch area.
  */
function initializeSketchArea() {
  const divsPerLine = MAX_TOOL_SIZE - currentToolSize + 1;
  const border = "solid 1px rgba(184, 184, 184, 0.5)";
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  for (let i = 0; i < divsPerLine; i++) {
    const columnDiv = document.createElement('div');
    columnDiv.style.display = "flex";
    columnDiv.style.flex = "1 auto";

    for (let j = 0; j < divsPerLine; j++) {
      const cellDiv = document.createElement('div');
      cellDiv.style.border = border;
      cellDiv.style.flex = "1 auto";
      columnDiv.appendChild(cellDiv);
    }

    containerDiv.appendChild(columnDiv);
  }

  SKETCH_AREA.appendChild(containerDiv);
}

/**
 * Applies the given tool style (color and border) to a div.
 * @param {HTMLElement} div - The div to style
 * @param {string} color - The background color
 * @param {string} borderColor - The border color
 */
function applyToolStyle(div, color, borderColor) {
  div.style.background = color;
  div.style.border = `solid 1px ${borderColor}`;
}

// ==============
// HANDLE EVENTS
// ==============

/**
 * Handles pointer up events for the toolbar and sketch area.
 * @param {Event} event - The triggered event
 */
function handleToolbarClick(event) {
  const target = event.target;

  if (target !== SKETCH_AREA && SKETCH_AREA.contains(target) && target !== previousHoveredDiv) {
    previousHoveredDiv = target;
    processDiv(target);
    return;
  }

  const toolType = target.alt;
  const rainbow = TOOLBAR_TOP.querySelector('img[alt="rainbow"]');
  const draw  = TOOLBAR_TOP.querySelector('img[alt="draw"]');
  const eraser = TOOLBAR_TOP.querySelector('img[alt="eraser"]');
  const clear = TOOLBAR_TOP.querySelector('img[alt="clear"]');
  const info = TOOLBAR_TOP.querySelector('img[alt="info"]');

  switch (toolType) {
    case DEFAULT_SCREEN:
      currentScreen = currentScreen === DEFAULT_SCREEN ? "sketch" : DEFAULT_SCREEN;
      toggleInfoPanel();
      info.classList.toggle("btn-on");
      break;

    case DEFAULT_TOOL:
      currentTool = DEFAULT_TOOL;
      if (!SKETCH_AREA.children.length) initializeSketchArea();
      if (currentScreen === DEFAULT_SCREEN) {
        currentScreen = "sketch";
	toggleInfoPanel();
      }
      draw.classList.add("btn-on");
      eraser.classList.remove("btn-on");
      info.classList.remove("btn-on");
      break;

    case "clear":
      clearSketchArea();
      break;

    case "eraser":
      currentTool = "eraser";
      eraser.classList.add("btn-on");
      draw.classList.remove("btn-on");
      break;

    case "rainbow":
      currentPaintStyle = "rainbow";
      rainbow.classList.add("btn-on");
      COLOR_PICKER.classList.remove("btn-on");
      break;

    default:
      break;
  }
}

/**
 * Handles pointer movement to paint the divs within the sketch area.
 * @param {Event} event - The triggered event
 */
function handlePointerMove(event) {
  if (event.pointerType === "touch") event.preventDefault();

  const x = event.clientX || event.touches[0].clientX;
  const y = event.clientY || event.touches[0].clientY;
  const hoveredDiv = document.elementFromPoint(x, y);

  const isValidDiv = hoveredDiv !== SKETCH_AREA && hoveredDiv !== previousHoveredDiv && SKETCH_AREA.contains(hoveredDiv);
  if (!isValidDiv) return;

  previousHoveredDiv = hoveredDiv;
  processDiv(hoveredDiv);
}

/**
  * Handles window load and resize to update body's minimum height.
  */
function handleWindowEvent() {
  document.body.style.minHeight = `${window.innerHeight}px`;
}

/**
  * Handles color picker input to pick new color.
  * @param {Event} event - The triggered event
  */
function handleColorPickerInput(event) {
  currentPaintStyle = DEFAULT_PAINT_STYLE;
  currentMonoColor = event.target.value;
  event.target.classList.add("btn-on");
  TOOLBAR_TOP.querySelector('img[alt="rainbow"]').classList.remove("btn-on");
}

/**
  * Handles tool size slider input to pick new tool size.
  * @param {Event} event - The triggered event
  */
function handleToolSizeSliderInput(event) {
  if (slideDebounceTimer) {
    clearTimeout(sliderDebounceTimer);
  }

  sliderDebounceTimer = setTimeout(() => {

    if (currentScreen === "info") {
      event.target.value = currentToolSize;
    } else {
      currentToolSize = parseInt(event.target.value, 10);
      clearSketchArea();
    }
  }, 300);
}

// ==========================
// INITIALIZATION
// ==========================

function initialize() {
  // Attach event listeners for pointers
  MAIN.addEventListener("pointerup", handleToolbarClick);
  SKETCH_AREA.addEventListener("pointermove", handlePointerMove);
  SKETCH_AREA.addEventListener("touchmove", handlePointerMove, { passive: false });

  // Attach event listeners for page load and resize
  window.addEventListener("resize", handleWindowEvent);

  // Attach event listener for color picker changes
  COLOR_PICKER.addEventListener("input", handleColorPickerInput);

  // Attach event listener for tool size slider changes
  TOOL_SIZE_SLIDER.addEventListener("input", handleToolSizeSliderInput);

  // Set body minimum height on window load
  handleWindowEvent();

  // Set initial toolbar states
  TOOLBAR_TOP.querySelector('img[alt="info"]').classList.add("btn-on");
  TOOLBAR_TOP.querySelector('img[alt="draw"]').classList.add("btn-on");
  COLOR_PICKER.classList.add("btn-on");

  // Initialize sketch area
  initializeSketchArea();
}

// Call the initialization function on page load
window.onload = initialize;
