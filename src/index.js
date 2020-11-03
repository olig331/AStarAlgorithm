import { message, Node } from './scripts/node';
import { createvisualGrid, colorGrid } from './scripts/visuals';
const updateGridBtn = document.getElementById('update_grid');
updateGridBtn.addEventListener('click', updateGrid)

let cols = 15;
let rows = 15;
let grid = [];

(() => {
  createArrayGrid();
  createvisualGrid(rows, cols)
  console.log(grid);
})()

function createArrayGrid() {
  grid = new Array(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols)
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = new Node(i, j);
    }
  }
}

function updateGrid() {
  const rowsInputVal = document.getElementById('rows').value;
  const colsInputVal = document.getElementById('cols').value;
  rows = rowsInputVal;
  cols = colsInputVal;
  createvisualGrid(rows, cols);
}

document.getElementById('grid_wrapper').addEventListener('click', (e) => {
  let cell = e.target.id;
  console.log(cell)
})


console.log(Node)
console.log(message);
console.log("im here");
console.log("show me update")

