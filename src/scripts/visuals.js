const colSlider = document.getElementById('cols');
const rowSlider = document.getElementById('rows');
const rowOutput = document.getElementById('rows_output');
const colOutput = document.getElementById('cols_output')
colOutput.innerHTML = colSlider.value
rowOutput.innerHTML = rowSlider.value

colSlider.oninput = function () {
  colOutput.innerHTML = colSlider.value;
}
rowSlider.oninput = function () {
  rowOutput.innerHTML = rowSlider.value;
}


// Create the grid seen on screen giving dynamic id's to each div on the grid
export function createvisualGrid(rows, cols) {
  console.log("running visual ")
  const gridParent = document.getElementById('grid_wrapper'); // container for grid
  gridParent.innerHTML = '';
  const rowWrapper = document.createElement('div'); // rows
  rowWrapper.className = "row_wrapper";

  let rowNum = rows;
  let colNum = cols;

  while (rowNum > 0) {
    gridParent.appendChild(rowWrapper.cloneNode(true));
    rowNum--;
  };

  const gridsRows = [...document.querySelectorAll(".row_wrapper")];

  for (let i = 0; i < gridsRows.length; i++) {
    for (let j = 0; j < colNum; j++) {
      const gridCell = document.createElement('div');
      gridCell.className = "cell"
      gridCell.setAttribute("id", `row=${i}-col=${j}`)
      gridsRows[i].appendChild(gridCell);
    }
  }
}

// This fucntion colors the start and end cells
export function colorStartEnd(cell, cellType) {
  const isStart = [...document.querySelectorAll('.starting_cell')];
  const isEnd = [...document.querySelectorAll('.ending_cell')];
  console.log(isStart)
  document.getElementById(`${cell}`).className = `cell ${cellType}`;
  if (cellType === "starting_cell") {
    isStart.map((cells) => {
      cells.className = "cell"
    })
  } else {
    isEnd.map((cells) => {
      cells.className = "cell"
    })
  }
}

// This fucntion colors the wall on a click and drag 
export function colorWalls(cell) {
  let toColor = document.getElementById(`${cell}`)
  toColor.className += " wall_path_cell";
}

// Clear the visual grid of all walls
export function clearWalls() {
  let cellsArr = [...document.querySelectorAll('.wall_path_cell')];
  cellsArr.map(cell => cell.className = "cell");
}

// clear the grid of everything (setting every cells class back to original)
export function clearGrid() {
  let cellsArr = [...document.querySelectorAll('.cell')];
  cellsArr.map(cell => cell.className = "cell")
}


// Visualise the path found
export function visualCellsVisited(vals) {
  for (let i = 0; i < vals.visited.length; i++) {
    if (i === vals.visited.length - 1) {
      setTimeout(() => {
        visualPath(vals.finalPath)
      }, 10 * i);
    } else {
      setTimeout(() => {
        const node = vals.visited[i];
        if (i !== 0) {
          document.getElementById(`row=${node.row}-col=${node.col}`).className = "cell visited"
        }
      }, 10 * i);
    }
  }
  //visualShortestPath(vals.finalPath)
}

function visualPath(path) {
  console.log(path)
  console.log("short path func running")
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      const node = path[i];
      document.getElementById(`row=${node.row}-col=${node.col}`).className = "cell path"
    }, 30 * i);
  }
}