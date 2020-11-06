import { alogrithm, wallCorners } from './scripts/algorithm';
import { Node } from './scripts/node';
import { createvisualGrid, colorStartEnd, colorWalls, clearWalls, clearGrid, visualCellsVisited } from './scripts/visuals';
const updateGridBtn = document.getElementById('update_grid');
updateGridBtn.addEventListener('click', updateGrid)

let cols = 20;
let rows = 20;
let grid = [];
let isMouseDown = false;
let startKeyDown = false;
let endKeyDown = false;
let start;
let end;

// IIFE creating defauly grids
(() => {
  createvisualGrid(rows, cols)
  createArrayGrid()
})()


// Create the grid the function will be working with and add each array with a Node object
function createArrayGrid() {
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols)
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Node(i, j, rows - 1, cols - 1);
    }
  }
  //console.log(grid);
}


// appies user input updates to the grid 
function updateGrid() {
  rows = document.getElementById('rows').value;
  cols = document.getElementById('cols').value;
  createvisualGrid(rows, cols);
  createArrayGrid();
}

// takes the ids of the grids HTML DOM elements and cleans them to and array of Y, X Vals e.g[Y, X]
function regexCleaner(id) {
  let regex = id.replace(/[col=srw]/g, "");
  return regex.split("-").map(x => parseInt(x))
}

// Event bubbling listening to clicks within the grid
document.getElementById('grid_wrapper').addEventListener("click", event => {
  let cell = event.target.id;
  console.log(cell)
  if (cell !== "grid_wrapper") {
    if (startKeyDown) {
      colorStartEnd(cell, "starting_cell")
      let coords = regexCleaner(cell);
      grid[coords[0]][coords[1]].start = true;
      start = coords
    }
    if (endKeyDown) {
      colorStartEnd(cell, "ending_cell")
      let coords = regexCleaner(cell);
      grid[coords[0]][coords[1]].end = true;
      end = coords
    }
  }
})

// handles the key presses to add start and end points to the grid
document.getElementById('body').addEventListener("keydown", e => {
  if (e.keyCode === 83) {
    startKeyDown = true;
  }
  if (e.keyCode === 69) {
    endKeyDown = true;
  }
})

// resets the start end  variables when s or e key is no longer held down
document.getElementById('body').addEventListener("keyup", e => {
  endKeyDown = false;
  startKeyDown = false;
})



document.getElementById('grid_wrapper').addEventListener("mousedown", event => {
  isMouseDown = true;
  console.log(isMouseDown)
});

document.getElementById('grid_wrapper').addEventListener('mouseup', e => {
  isMouseDown = false;
})

document.getElementById('grid_wrapper').addEventListener("mouseover", e => {
  if (isMouseDown && !endKeyDown && !startKeyDown) {
    let cell = e.target.id; 4
    if (cell !== "grid_wrapper") {
      colorWalls(cell);
      let coords = regexCleaner(cell)
      grid[coords[0]][coords[1]].isWall = true;
    }
  }
})

document.getElementById('clear_walls').addEventListener('click', () => {
  clearWalls();
})

document.getElementById('clear_grid').addEventListener('click', () => {
  clearGrid();
  createArrayGrid();
})

document.getElementById('find_path').addEventListener('click', startAlgorithm)


// adds the neighbouring nodes to each node in the grid
function addNodeNeighboursFunc() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbourNodes(grid, rows - 1, cols - 1)
    }
  }
}

// calling the algorithm
function startAlgorithm() {
  addNodeNeighboursFunc();
  console.log(grid);
  //wallCorners(grid[1][1], grid[2][2], grid)
  //console.log(wallCorners(grid[1][1], grid[2][2], grid))
  let vals = alogrithm(grid[start[0]][start[1]], grid[end[0]][end[1]], grid)
  console.log(vals);
  visualCellsVisited(vals)
}