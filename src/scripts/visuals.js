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

export function colorGrid(cell, cellType) {
  const isStart = [...document.querySelectorAll('.starting_cell')];
  console.log(isStart)
  document.getElementById(cell).className += cellType
  isStart.map((cells) => {
    cells.className = "cell"
  })
}





