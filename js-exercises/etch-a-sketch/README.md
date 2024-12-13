# Etch-a-Sketch

## Overview
This project is a dynamic sketch pad that uses a grid of square divs to allow users to create effects (and pixelated drawings?). The page is responsive. Various tools are provided.

## Features
- The grid is automatically resized based on the selected tool size. The larger the tool size, the smaller the grid becomes, and vice versa.
  - Tool size 1 corresponds to a 100x100 grid (smaller squares).
  - Tool size 100 corresponds to a 1x1 grid (larger squares).
- **Tool Selection**: 
  - **Color Picker**: Choose a single color for drawing.
  - **Rainbow Mode**: Colors will change randomly on each hover.
  - **Pencil**: Choose a pencil which draws in the selected color or random color if in rainbow mode.
  - **Eraser**: Use the eraser tool to erase drawings (reverts squares to white).
  - **Clear**: Clears the entire board.
- **Responsive Design**: The layout adapts to different screen sizes. On mobile, buttons appear at the top, and on desktop, they appear on the left side.
- **Slider for Tool Size**: A slider allows users to select the size of their drawing tool, adjusting the grid accordingly.

## Technologies Used
- **HTML**: Structure of the page and elements.
- **CSS**: Responsive styling using Flexbox.
- **JavaScript**: Handling the dynamic grid creation, tool effects, and interactivity.

## Acknowledgments
- This project is part of The Odin Project practice for mastering Flexbox, and DOM Manipulation.
