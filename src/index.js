import { alogrithm } from './scripts/algorithm';
import { Node } from './scripts/node';
import { createvisualGrid, colorStartEnd, colorWalls, clearWalls, clearGrid, visualCellsVisited } from './scripts/visuals';
const updateGridBtn = document.getElementById('update_grid');
updateGridBtn.addEventListener('click', updateGrid)

let cols = 15;
let rows = 15;
let grid = [];
let isMouseDown = false;
let startKeyDown = false;
let endKeyDown = false;
let start;
let end;

(() => {
  createvisualGrid(rows, cols)
  createArrayGrid()
})()



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
  console.log(grid);
}



function updateGrid() {
  const rowsInputVal = document.getElementById('rows').value;
  const colsInputVal = document.getElementById('cols').value;
  rows = rowsInputVal;
  cols = colsInputVal;
  createvisualGrid(rows, cols);
  createArrayGrid();
}

function regexCleaner(id) {
  let regex = id.replace(/[col=srw]/g, "");
  return regex.split("-").map(x => parseInt(x))
}


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

document.getElementById('body').addEventListener("keydown", e => {
  if (e.keyCode === 83) {
    startKeyDown = true;
  }
  if (e.keyCode === 69) {
    endKeyDown = true;
  }
})

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

function addNodeNeighboursFunc() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j].addNeighbourNodes(grid, rows - 1, cols - 1)
    }
  }
}

function startAlgorithm() {
  addNodeNeighboursFunc();
  console.log(grid);
  let vals = alogrithm(grid[start[0]][start[1]], grid[end[0]][end[1]])
  console.log(vals);
  visualCellsVisited(vals)
}