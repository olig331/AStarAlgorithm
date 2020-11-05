export function alogrithm(startNode, endNode) {
  console.log(startNode);
  console.log(endNode);
  let openSet = [];
  let closedSet = [];
  let visited = [];
  let finalPath = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let lowestFScoreIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFScoreIndex].f) {
        lowestFScoreIndex = i; // sort through find the lowest f score
      }
    }

    let currentNode = openSet[lowestFScoreIndex];
    visited.push(currentNode);
    if (currentNode == endNode) {
      let copy = currentNode;
      while (copy.previous) {
        finalPath.push(copy)
        copy = copy.previous;
      }
      return { finalPath, visited };
    }

    openSet = openSet.filter((ele) => ele !== currentNode)
    closedSet.push(currentNode)
    let nextToCurrent = currentNode.neighbourNodes;
    for (let i = 0; i < nextToCurrent.length; i++) {
      let neighbour = nextToCurrent[i];
      if (!closedSet.includes(neighbour) && !neighbour.isWall) {
        let tempGVal = neighbour.g + heruistic(neighbour, currentNode);
        let newPath = false;
        if (openSet.includes(neighbour)) {
          if (tempGVal < neighbour.g) {
            neighbour.g = tempGVal;
            newPath = true;
          }
        } else {
          neighbour.g = tempGVal;
          newPath = true;
          openSet.push(neighbour);
        }

        if (newPath) {
          neighbour.h = heruistic(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = currentNode;
        }
      }
    }
  }

  return { finalPath, visited }

}

function heruistic(a, b) {
  // let x = Math.pow((a.col - b.col), 2)
  // let y = Math.pow((a.row - b.row), 2)
  // return Math.abs(Math.sqrt(x + y))

  var D = 1;
  var D2 = Math.sqrt(2);
  var x = Math.abs(b.col - a.col);
  var y = Math.abs(b.row - a.row);
  return (D * (x + y)) + ((D2 - (2 * D)) * Math.min(x, y));
}