export function alogrithm(startNode, endNode, grid) {
  console.log(startNode);
  console.log(endNode);
  let openSet = [];
  let closedSet = [];
  let visited = [];
  let finalPath = [];

  // push the starting node to the open set beginning the loop
  openSet.push(startNode);

  while (openSet.length > 0) {
    // Store the index of the lowest f score node in the open set 
    let lowestFScoreIndex = 0;
    // find the lowest f score node
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestFScoreIndex].f) {
        lowestFScoreIndex = i;
      }
    }

    //pick the lowest f score node to work with
    let currentNode = openSet[lowestFScoreIndex];
    // now this node it being worked on it can enter the visited array
    visited.push(currentNode);
    // if we have found the end node backtrack adding the previous nodes to the path array
    if (currentNode === endNode) {
      let copy = currentNode;
      while (copy.previous) {
        finalPath.push(copy.previous)
        copy = copy.previous;
      }
      return { finalPath, visited };
    }

    // remove current node from the open set 
    openSet = openSet.filter((ele) => ele !== currentNode)
    // add currnet node to the closed list 
    closedSet.push(currentNode)

    // array of all the neighbouring nodes 
    let nextToCurrent = currentNode.neighbourNodes;
    // loop through the array of niehgbours
    for (let i = 0; i < nextToCurrent.length; i++) {
      // individual node of the neighbours array
      let neighbour = nextToCurrent[i];
      // if this neighbour is part of the closed list or is a wall or if the neighbour is a diagonal and is passing through the corner of 2 walls reject the node and move on 
      if (!closedSet.includes(neighbour) && !neighbour.isWall && wallCorners(currentNode, neighbour, grid)) {
        // tempory g value calcualtion
        let tempGVal = currentNode.g + herusticDiag(neighbour, currentNode)
        let newPath = false;
        // does the open set include this node
        if (openSet.includes(neighbour)) {
          // and is the tempGVal less than the neighbours g score
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
          neighbour.h = herusticDiag(neighbour, endNode);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = currentNode;
        }
      }
    }
  }

  return { finalPath, visited }

}

// Calculate the herustic val
function herusticDiag(a, b) {
  let x = Math.pow((a.col - b.col), 2)
  let y = Math.pow((a.row - b.row), 2)
  return Math.sqrt(x + y)
}


// Fucntion checking if we move diagonally will we be passing through a corner of 2 walls
export function wallCorners(current, neighbour, grid) {
  let coordsC = [current.row, current.col];
  let coordsN = [neighbour.row, neighbour.col];
  console.log(coordsC);
  console.log(coordsN);

  //move down right 
  if (coordsC[0] + 1 === coordsN[0] && coordsC[1] + 1 === coordsN[1]) {
    if (grid[coordsC[0] + 1][coordsC[1]].isWall && grid[coordsC[0]][coordsC[1] + 1].isWall) {
      return false;
    } else {
      return true
    }
  }
  // move down left  
  else if (coordsC[0] + 1 === coordsN[0] && coordsC[1] - 1 === coordsN[1]) {
    if (grid[coordsC[0]][coordsC[1] - 1].isWall && grid[coordsC[0]][coordsC[1] - 1].isWall) {
      return false;
    } else {
      return true
    }
  }
  // move up left
  else if (coordsC[0] - 1 === coordsN[0] && coordsC[1] - 1 === coordsN[1]) {
    console.log("top left")
    if (grid[coordsC[0]][coordsC[1] - 1].isWall && grid[coordsC[0] - 1][coordsC[1]].isWall) {
      return false;
    } else {
      return true
    }
  }
  //move up right
  else if (coordsC[0] - 1 === coordsN[0] && coordsC[1] + 1 === coordsN[1]) {
    console.log("top right")
    if (grid[coordsC[0]][coordsC[1] + 1].isWall && grid[coordsC[0] - 1][coordsC[1]].isWall) {
      return false;
    } else {
      return true
    }
  } else {
    return true;
  }
}
