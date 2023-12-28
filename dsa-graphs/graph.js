class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addNode(node) {
    this.nodes.add(node)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addNodes(nodeArray) {
    for(let node of nodeArray){
      this.addNode(node);
    }
  }

  // this function accepts two nodes and updates their adjacent values to include the other node
  addEdge(node1, node2) {
    node1.adjacent.add(node2);
    node2.adjacent.add(node1);
  }

  // this function accepts two nodes and updates their adjacent values to remove the other node
  removeEdge(node1, node2) {
    node1.adjacent.delete(node2);
    node2.adjacent.delete(node1);
  }

  // this function accepts a node and removes it from the nodes property, it also updates any adjacency lists that include that node
  removeNode(node) {
    for(let node of this.nodes) {
      if (node.adjacent.has(node)) {
        node.adjacent.delete(node);
      }
    }
    this.nodes.delete(node);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const visited = [];
    const result = [];

    function traverse(node){
      // Add a method of base to class
      if (!node){
        return null;
      }
      // Add a method to visit nodes
      visited.add(node);
      result.push(node.value)

      // Visit the neighbors
      node.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          return traverse(neighbor);
        }
      });
    }
    traverse(start);

    return result;
  }

  // this function returns an array of Node values using BFS
  
  breadthFirstSearch(start) {
    // Create an empty queue
    const queue = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    // visit node
    visited.add(start);

    // While there is still remaining vertices in queue
    while (queue.length) {
      currentNode = queue.shift();
      result.push(currentNode.value);

      // visit neighbors
      currentNode.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

module.exports = {Graph, Node}