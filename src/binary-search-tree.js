const { NotImplementedError } = require('../extensions/index.js');

 const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {
  constructor () {
    this.head = null;
  }
  root() {
   return this.head;
  }

  add( data ) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let currentNode = this.head;

    while(currentNode) {
      if (newNode.data < currentNode.data) {
        if(!currentNode.left) {
          currentNode.left = newNode;
          return;
        }

        currentNode = currentNode.left;
      } else {
        if(!currentNode.right) {
          currentNode.right = newNode;
          return;
        }

        currentNode = currentNode.right;
      }
    }
  }

  preOrder(node, callback) {
    if(!node) {
      return;
    }
    if(callback) {
      callback(node);
    }
    this.preOrder(node.left, callback);
    this.preOrder(node.right, callback);
  }

  traverseDFS(callback) {
    
     return this.preOrder(this.head, callback);
    
  }  

  has(data) {
    let b = false;
    let g = this.traverseDFS((node) => {
      if (node.data === data) {
       return b = true;
      } 
    });
    return b;
  }

  find(data) {
    let b = null;
    let g = this.traverseDFS((node) => {
      if (node.data === data) {
       return b = data;
      } 
    });
    return b;
  }

  minNode(node) {
    if (node.left === null)
        return node;
    else
        return this.min();
}
  remove(data) {
    this.head = this.removeNode(this.head, data);
  }
removeNode(node, data) {
    if (node === null) {
        return null;
    } else if (data < node.data) {
        node.left = this.removeNode(node.left, data);
        return node;
    } else if (data > node.data) {
        node.right = this.removeNode(node.right, data);
        return node;
    } else {
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        if (node.left === null) {
            node = node.right;
            return node;
        } else if(node.right === null) {
            node = node.left;
            return node;
        }
        let newNode = this.minNode(node.right);
        node.data = newNode.data;
        node.right = this.removeNode(node.right, newNode.data);
        return node;
    }
  }

  min() {
    let b = this.head.data;
    let g = this.traverseDFS((node) => {
      if (node.data < b) {
        b = node.data;
      } 
    });
    return b;
  }

  max() {
    let b = this.head.data;
    let g = this.traverseDFS((node) => {
      if (node.data > b) {
        b = node.data;
      } 
    });
    return b;

  }

}