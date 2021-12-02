///Running the algorithm
class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    addEdge(source, destination) {
      if (!this.adjacencyList[source]) {
        this.addVertex(source);
      }
      if (!this.adjacencyList[destination]) {
        this.addVertex(destination);
      }
      this.adjacencyList[source].push(destination);
      //this.adjacencyList[destination].push(source);
    }
    removeEdge(source, destination) {
      this.adjacencyList[source] = this.adjacencyList[source].filter(vertex => vertex !== destination);
      this.adjacencyList[destination] = this.adjacencyList[destination].filter(vertex => vertex !== source);
    }
    removeVertex(vertex) {
      let adjacentVertex = this.adjacencyList[vertex].pop();
      while (adjacentVertex != null) {
        this.removeEdge(vertex, adjacentVertex);
        adjacentVertex = this.adjacencyList[vertex].pop();
      }
      delete this.adjacencyList[vertex];
    }  
  }

  class Queue {
    constructor() {
      this.data = [];
    }

    enqueue(item) {
      this.data.push(item);
    }

    dequeue() {
      return this.data.shift();
    }

    isEmpty() {
      return this.data.length == 0;
    }

    length() {
      return this.data.length;
    }
  }

function neighbourColor(neighbours) {
  let gridItems = document.querySelectorAll(".gridBox");
  let gridArray = Array.from(gridItems);

  neighbours.forEach(function(elem) {
    gridArray[elem].style.backgroundColor = "#FF9900";
  });
}

function nodeColor(currentNode) {
  let gridItems = document.querySelectorAll(".gridBox");
  let gridArray = Array.from(gridItems);
  gridArray[currentNode].style.backgroundColor = "#FF3300";
}

function makeAdjacency(gridSize) {
    const adjGraph = new Graph();
    
    //add nodes to adjacency graph
    for (let i=0; i<gridSize*gridSize; i++) {
        adjGraph.addVertex(i);
    }
    //add edges to adjacency graph
    for (let j=0; j<gridSize; j++) {
        for (let k=0; k<gridSize; k++) {
            let vertexNum = (j*gridSize) + k;
            let leftVertex = vertexNum - 1;
            let rightVertex = vertexNum + 1;
            let topVertex = vertexNum - gridSize;
            let bottomVertex = vertexNum + gridSize;
            
            if ((j==0) || (k==0) || (j==gridSize-1) || (k==gridSize-1)) {
                if ((j==0) && (k==0)) {
                  adjGraph.addEdge(vertexNum, rightVertex);
                  adjGraph.addEdge(vertexNum, bottomVertex);
                } else if ((j==0) && (k==gridSize-1)) {
                  adjGraph.addEdge(vertexNum, leftVertex);
                  adjGraph.addEdge(vertexNum, bottomVertex);
                } else if (j==0) {
                  adjGraph.addEdge(vertexNum, rightVertex);
                  adjGraph.addEdge(vertexNum, bottomVertex);
                  adjGraph.addEdge(vertexNum, leftVertex);
                } else if ((k==0) && (j==gridSize-1)) {
                  adjGraph.addEdge(vertexNum, rightVertex);
                  adjGraph.addEdge(vertexNum, topVertex);
                } else if (k==0) {
                  adjGraph.addEdge(vertexNum, rightVertex);
                  adjGraph.addEdge(vertexNum, topVertex);
                  adjGraph.addEdge(vertexNum, bottomVertex);
                } else if ((j==gridSize-1) && (k==gridSize-1)) {
                  adjGraph.addEdge(vertexNum, leftVertex);
                  adjGraph.addEdge(vertexNum, topVertex);
                } else if (j==gridSize-1) {
                  adjGraph.addEdge(vertexNum, rightVertex);
                  adjGraph.addEdge(vertexNum, leftVertex);
                  adjGraph.addEdge(vertexNum, topVertex);
                } else if (k==gridSize-1) {
                  adjGraph.addEdge(vertexNum, leftVertex);
                  adjGraph.addEdge(vertexNum, topVertex);
                  adjGraph.addEdge(vertexNum, bottomVertex);
                }
            } else {
                //add edges up, down, left and right
                adjGraph.addEdge(vertexNum, leftVertex);
                adjGraph.addEdge(vertexNum, rightVertex);
                adjGraph.addEdge(vertexNum, topVertex);
                adjGraph.addEdge(vertexNum, bottomVertex);
            }
        }
    }
    return adjGraph;
}

function removeNodeWalls(adjGraph) {
  const gridItems = document.querySelectorAll(".gridBox");
  let gridArray = Array.from(gridItems);
  let endNode;
  let startNode;

  for (let i=0; i<gridArray.length; i++) {
    if (gridArray[i].style.backgroundColor == "black") {
      adjGraph.removeVertex(i);
    } else if (gridArray[i].style.backgroundColor == "red") {
      endNode = i;
    } else if (gridArray[i].style.backgroundColor == "green") {
      startNode = i;
    }
  }
  return [adjGraph, startNode, endNode];
}

function updateVisitQueue(queue, adjGraph, visited, prev) {
  let node = queue.dequeue();
  let neighbours = adjGraph.adjacencyList[node];
  
  nodeColor(node);
  neighbourColor(neighbours);

  neighbours.forEach(function(element) {
    if (!visited[element]) {
      queue.enqueue(element);
      visited[element] = true;
      prev[element] = node;
    }
  });

  return [queue, visited, prev];
}

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function updateVisitQueue(queue, adjGraph, visited, prev) {
  let node = queue.dequeue();
  let neighbours = adjGraph.adjacencyList[node];

  //const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  await resolveAfter2Seconds();
  nodeColor(node);
  neighbourColor(neighbours);

  neighbours.forEach(function(element) {
    if (!visited[element]) {
      queue.enqueue(element);
      visited[element] = true;
      prev[element] = node;
    }
  });

  return [queue, visited, prev];
}

function solveBFS(adjGraph, startNode) {
  let queue = new Queue();
  queue.enqueue(startNode);
  
  const listSize = Object.keys(adjGraph.adjacencyList).length;
  let visited = Array.apply(false, {length: listSize});
  visited[startNode] = true;

  let prev = Array.apply(null, {length: listSize});

  while (!queue.isEmpty()) {
    let node = queue.dequeue();
    let neighbours = adjGraph.adjacencyList[node];

    neighbours.forEach(function(element) {
      if (!visited[element]) {
        queue.enqueue(element);
        visited[element] = true;
        prev[element] = node;
      }
    });

  }  
  return prev;
}

function reconstructPath(startNode, endNode, prev) {
  let path = [];
  for (let at = endNode; at != null; at = prev[at]) {
    path.push(at);
  }

  path.reverse();

  if (path[0] == startNode) {
    return path;
  }
  return [];
}

function runBFS(adjGraph, startNode, endNode) {
  //Do a BFS starting at the startNode
  let prev = solveBFS(adjGraph, startNode);

  //Return reconstructed path from startNode to endNode
  return reconstructPath(startNode, endNode, prev);
}

function highlightPath(path) {
  let gridItems = document.querySelectorAll(".gridBox");
  let gridArray = Array.from(gridItems);

  path.pop();
  path.shift();

  for (let i=0; i<path.length; i++) {
    (function(i){
      setTimeout(function(){
        gridArray[path[i]].style.backgroundColor = "yellow";
      }, 10 * i);
    })(i);
  }
}

function startAlgorithm() {
  let baseAdjacency = makeAdjacency(gridSize);
  let [modifiedAdjacency, startNode, endNode] = removeNodeWalls(baseAdjacency);
  let shortestPath = runBFS(modifiedAdjacency, startNode, endNode);
  
  highlightPath(shortestPath);
}