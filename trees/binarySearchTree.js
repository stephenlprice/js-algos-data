/* 
Binary Search Tree
- data points = nodes
- top of the tree = root node
- end of the tree = leaf nodes (no children)
- parent > left child & right child
- siblings = left node & right node
- left subtrees and right subtrees
- ** Binary Trees can only have 2 branches for every node **
- ** Binary Search Trees are ordered, left subtree is < to parent & right subtree is > to parent **
- searches operate on half of a tree, then half of the subtree....O(logn)
- height = distance root node to 1st leaf node without 2 children, balanced trees have distances differing at most by 1
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
          };
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
        };
      }
      // initial call to searchTree function
      return searchTree(node);
    };
  }

  // recursively traverses the left subtree until it reaches the end
  findMin() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    };
    return current.data;
  }

  // recursively traverses the right subtree until it reaches the end
  findMax() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    };
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
      };
    };
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
      };
    };
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
        };
        // node has no left child, replace with right child
        if (node.left === null) {
          return node.right;
        }; 
        // node has no right child, replace with left child
        if (node.right === null) {
          return node.left;
        };
        // node has 2 children, go to the right node and return the leftmost child (closest value to node)
        let tempNode = node.right;
        while (tempNode.left !== null) {
          // once leftmost child is found, assign it to tempNode
          tempNode = tempNode.left;
        };
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
      };
    }

    // start the function on the root node
    this.root = removeNode(this.root, data);
  }

  // return height of first leaf (node without 2 children)
  minHeight(node = this.root) {
    // handle empty binary search tree or end of a leaf
    // once a null node is found substract -1 to get actual leaf height before null node
    if (node === null) {
      return -1;
    }
    // recursion returning left/right nodes and adding +1 to variables
    let left = this.minHeight(node.left);
    let right = this.minHeight(node.right);
    if (left < right) {
      // last return value is leaf with lowest height
      return left + 1;
    } else {
      return right + 1;
    };
  }

  // return height of last leaf (node without 2 children)
  maxHeight(node = this.root) {
    // handle empty binary search tree or end of a leaf
    // once a null node is found substract -1 to get actual leaf height before null node
    if (node === null) {
      return -1;
    }
    // recursion returning left/right nodes and adding +1 to variables
    let left = this.maxHeight(node.left);
    let right = this.maxHeight(node.right);
    if (left > right) {
      // last return value is leaf with greatest height
      return left + 1;
    } else {
      return right + 1;
    };
  }

  // returns true if minHeight is different from maxHeight by at most 1
  isBalanced() {
    return (this.minHeight() >= this.maxHeight() -1)
  }

  // returns a sorted array of ascending numbers i.e., [1,2,3]
  // left, left => (leaf), push, right, left => (leaf), push, push parent, right, left...
  inOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = new Array();
      const traverseInOrder = (node) => {
        // short circuit evaluation with recursion, traverse to leftmost leaf
        node.left && traverseInOrder(node.left);
        // on leftmost leaf push data to array
        result.push(node.data);
        // check if it has a right subtree, if it does continue traversing left
        node.right && traverseInOrder(node.right);
        // once a left leaf is found, push parent and check right node for left subtree
        // continue until all left subtree has been pushed to array and return to root
        // push root to array and perform the same traversal on right subtree
      }
      traverseInOrder(this.root);
      return result;
    };
  }

  // returns an array starting with root, then leftmost subtree, then rightsubtree of left child
  // repeats operation on right subtree
  // push, left, push, left => (leaf), parent, right, push, left => (leaf), push, right... 
  preOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = new Array();
      const traversePreOrder = (node) => {
        // push first, starts with root then left node until leaf
        result.push(node.data);
        // short circuit evaluation with recursion, traverse leftmost subtree
        node.left && traversePreOrder(node.left);
        // with no left nodes, traverse right subtree
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    };
  }

  // returns an array starting with leftmost leafs on the left subtree,
  // then backs up, skips root and returns leftmost leaves on right subtree
  postOrder() {
    if (this.root === null) {
      return null;
    } else {
      const result = new Array();
      const traversePostOrder = (node) => {
        // goes to leftmost leaf on leftsubtree of any node
        node.left && traversePostOrder(node.left);
        // once leftmost leaf is found it starts traversing right
        node.right && traversePostOrder(node.right);
        // pushed leftmost leaves first, then all leaves from left to right
        // left subtree first, then right subtree
        result.push(node.data);
      }
      traversePostOrder(this.root);
      return result;
    };
  }

  // returns an array starting with root then all following nodes from left to right
  levelOrder() {
    const result = new Array();
    const Q = new Array();

    if (this.root !== null) {
      Q.push(this.root);

      // adds nodes into queue until all nodes are exhausted
      while (Q.length > 0) {
        // assigns node to the first element in queue
        let node = Q.shift();
        result.push(node.data);
        // then push left and right nodes into the queue
        if (node.left !== null) {
          Q.push(node.left);
        };
        if (node.right !== null) {
          Q.push(node.right);
        };
      };

      return result;
    } else {
      return null;
    };
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

console.log('//////////////// Tree Traversal //////////////////');

const bst2 = new BST();

bst2.add(9);
bst2.add(4);
bst2.add(17);
bst2.add(3);
bst2.add(6);
bst2.add(22);
bst2.add(5);
bst2.add(7);
bst2.add(20);

console.log('bst2.findMin(): ', bst2.findMin()); // 2
console.log('bst2.findMax(): ', bst2.findMax()); // 22

console.log('bst2.minHeight(): ', bst2.minHeight()); // 1
console.log('bst2.maxHeight(): ', bst2.maxHeight()); // 3
console.log('bst2.isBalanced(): ', bst2.isBalanced()); // false

bst2.add(10);
console.log('bst2.minHeight(): ', bst2.minHeight()); // 2
console.log('bst2.maxHeight(): ', bst2.maxHeight()); // 3
console.log('bst2.isBalanced(): ', bst2.isBalanced()); // true

console.log('bst2.InOrder(): ', bst2.inOrder());

console.log('bst2.preOrder(): ', bst2.preOrder());

console.log('bst2.postOrder(): ', bst2.postOrder());

console.log('bst2.levelOrder(): ', bst2.levelOrder());
