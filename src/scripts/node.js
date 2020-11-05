export class Node {
  constructor(i, j) {
    this.row = i;
    this.col = j;
    this.start = false;
    this.end = false;
    this.h = 0;
    this.f = 0;
    this.g = 0;
    this.isWall = false;
    this.previous = undefined;
    this.neighbourNodes = [];
    this.addNeighbourNodes = ((grid, Trow, Tcol) => {
      let row = this.row;
      let col = this.col;
      if (row > 0 && col > 0) this.neighbourNodes.push(grid[row - 1][col - 1])
      if (row > 0) this.neighbourNodes.push(grid[row - 1][col])
      if (row > 0 && col < Tcol) this.neighbourNodes.push(grid[row - 1][col + 1])
      if (col < Tcol) this.neighbourNodes.push(grid[row][col + 1])
      if (row < Trow && col < Tcol) this.neighbourNodes.push(grid[row + 1][col + 1])
      if (row < Trow) this.neighbourNodes.push(grid[row + 1][col])
      if (row < Trow && col > 0) this.neighbourNodes.push(grid[row + 1][col - 1])
      if (col > 0) this.neighbourNodes.push(grid[row][col - 1])
    })
  }
}
