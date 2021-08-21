/* 
Binary Search Tree
data points = nodes
top of the tree = root node
end of the tree = leaf nodes (no children)
parent > left child & right child
siblings = left node & right node
left subtrees and right subtrees
** Binary Trees can only have 2 branches for every node **
** Binary Search Trees are ordered, left subtree is < to parent & right subtree is > to parent **
searches can operate on half of a tree, then half of the subtree....O(logn)
*/

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // adds data to tree and determines where to place it
  add(data) {
    const node = this.root;
    // if this is the first node added to the tree
    if (node === null) {
      this.root = new Node(data);
      return;
    } else {
      // determines where to place subsequent nodes
      const searchTree = (node) => {
        // left subtrees
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          } else if (node.left !== null) {
            // recursive search on the left subtree
            return searchTree(node.left);
          }
        // right subtrees
        } else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          } else if (node.right !== null) {
            // recursive search on the right subtree
            return searchTree(node.right);
          }
        } else {
          return null; // if value already exists don't add it
        }
      };
      // initial call to searchTree function
      return searchTree(node);
    }
  }

  // recursively traverses the left subtree until it reaches the end
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  // recursively traverses the right subtree until it reaches the end
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  // traverses the tree until a match is found or returns null
  find(data) {
    let current = this.root;
    while (current.data !== data) {
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  // traverses the tree until it matches true or returns false
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  // remove a node, update tree with new node structure
  remove(data) {
    const removeNode = (node, data) => {
      // check for empty tree
      if (node === null) {
        return null;
      }
      // if a match is found, replace as follows
      if (data === node.data) {
        // node has no children, nothing replaces it
        if (node.left === null && node.right === null) {
          return null
        }
        // node has no left child, replace with right child
        if (node.left === null) {
          return node.right;
        } 
        // node has no right child, replace with left child
        if (node.right === null) {
          return node.left;
        }
        // node has 2 children, go to the right node and return the leftmost child (closest value to node)
        let tempNode = node.right;
        while (tempNode.left !== null) {
          // once leftmost child is found, assign it to tempNode
          tempNode = tempNode.left;
        }
        // new node replaced with tempNode
        node.data = tempNode.data;
        // recursive call to remove the original occurrence and balance the tree
        node.right = removeNode(node.right, tempNode.data);
        return node;

      // if data is smaller than node.data, traverse left
      } else if ( data < node.data) {
        // recursive call on left subtree
        node.left = removeNode(node.left, data);
        return node;
        // if data is larger than node.data, traverse right
      } else {
        // recursive call on right subtree
        node.right = removeNode(node.right, data);
        return node;
      }
    }

    // start the function on the root node
    this.root = removeNode(this.root, data);
  }
}

// instantiate a new binary search tree
const bst = new BST();

// test operations
bst.add(4);
bst.add(4); // wont accept duplicates
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);

console.log('bst.findMin(): ', bst.findMin()); // 1
console.log('bst.findMax(): ', bst.findMax()); // 7

bst.remove(7);
console.log('bst.findMax(): ', bst.findMax()); // 6

console.log('bst.isPresent(4): ', bst.isPresent(4)); // false
console.log('bst.isPresent(3): ', bst.isPresent(3)); // true

console.log('bst.find(5): ', bst.find(5)); // logs the node
