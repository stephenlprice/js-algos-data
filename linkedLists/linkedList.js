/*
Linked Lists

- elements stored in nodes
- node stores to pieces of information: element itself and reference (link) to the next node
- like arrays, linked lists can be use to implement different data structures:
_______________________________________________________________________________
|                Arrays                  |            Linked Lists            |
|              Fixed size                |           Dynamic size             |
|  Inefficient insertions and deletions  | Efficient insertions and deletions |
| Random access, i.e. efficient indexing |          No random access          |
|      May result in memory waste        |           No memory waste          |
|     Fast sequential access - elements  |  Slow sequential access - elements |
|     in contiguous memory locations     | not in contiguous memory locations |
-------------------------------------------------------------------------------
*/

function LinkedList() {
  let length = 0;
  // only entry point into data is via head, you must then traverse the linked list
  let head = null;

  const Node = function(element) {
    this.element = element;
    this.next = null;
  };

  // returns a length once nodes have been added via this.add()
  this.size = () => {
    return length;
  };

  // returns the first node added via this.add()
  this.head = () => {
    return head;
  };

  this.add = (element) => {
    const node = new Node(element);
    // creates a head with the first node added to the list
    if (head === null) {
      head = node;
    } else {
      // if the list has nodes, traverse them until the last node is found
      let currentNode = head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      };
      // once the last node has been found, add the new node as it's next value
      currentNode.next = node;
    };
    // register a new node added to the linked list
    length++;
  };

  this.remove = (element) => {
    let currentNode = head;
    let previousNode;
    // handles exception on empty linked lists
    if (head === null) {
      return console.error('linked list is empty, cannot remove a node');
    }
    // if the first node in list matches the element, remove it
    if (currentNode.element === element) {
      head = currentNode.next;
    } else {
      // traverse the linked list until a match is found
      while (currentNode.element !== element) {
        // if the last node does not match, then log an error
        if (currentNode.next === null) {
          return console.error('node not found, cannot remove node');
        };
        previousNode = currentNode;
        currentNode = currentNode.next;
      };
      // shifts the linked list up and removes the match for a link to it's .next value
      previousNode.next = currentNode.next;
    };
    // register a node removed from the linked list
    length--;
  };

  // returns false if any node has been registered to length
  this.isEmpty = () => {
    return length === 0;
  };

  // returns a number indicating index in linked list
  this.indexOf  = (element) => {
    let currentNode = head;
    let index = 0;

    while(currentNode) {
      index++;
      if (currentNode.element = element) {
        return index;
      };
      currentNode = currentNode.next;
    };
    // returning -1 means that no match was found
    return -1;
  };

  // returns the element at 
  this.elementAt = (index) => {
    let currentNode = head;
    let count = 0;
    // handle negative index
    if (index < 0) {
      return console.error(`invalid index ${index}`);
    };
    // if the index is greater than the length of the linked list, return an error
    if (index > length - 1) {
      return console.error(`element not found, index ${index} is greater than length ${length}`);
    };
    // traverse the linked list until count equals index
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    };
    return currentNode.element;
  };

  // add a new node at the specified index, replacing existing node references
  this.addAt = (index, element) => {
    const node = new Node(element);
    let currentNode = head;
    let previousNode;
    let currentIndex = 0;
    // handle negative index
    if (index < 0) {
      return console.error(`invalid index ${index}`);
    };
    // if the index is greater than the length of the linked list, return an error
    if (index > length - 1) {
      return console.error(`element not found, index ${index} is greater than length ${length}`);
    };
    // handle placing a new node at head
    if (index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      // traverse the linked list until currentIndex equals index
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      };
      // when currentIndex equals index, replace node links
      node.next = currentNode;
      previousNode.next = node;
    };
    length++;
    console.log(`${element} added at index ${currentIndex}`);
  };

  this.removeAt = (index) => {
    let currentNode = head;
    let previousNode;
    let currentIndex = 0;
    // handles exception on empty linked lists
    if (head === null) {
      return console.error('linked list is empty, cannot remove a node');
    }
    // handle negative index
    if (index < 0) {
      return console.error(`invalid index ${index}`);
    };
    // if the index is greater than the length of the linked list, return an error
    if (index > length - 1) {
      return console.error(`element not found, index ${index} is greater than length ${length}`);
    };
    // removes head node and replaces it with its .next reference
    if (index === 0) {
      head = currentNode.next;
    } else {
      // traverse the linked list until currentIndex equals index
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      };
      previousNode.next = currentNode.next;
    };
    length--;
    return currentNode.element;
  }
};

// testing the new LinkedList class
const conga = new LinkedList();
console.log('conga.isEmpty(): ', conga.isEmpty()); // true
conga.remove('Snake'); // linked list is empty, cannot remove a node
conga.add('Kitten');
conga.add('Puppy');
conga.add('Dog');
conga.add('Cat');
conga.add('Fish');

console.log('conga.isEmpty(): ', conga.isEmpty()); // false
console.log('conga.head(): ', conga.head()); // Kitten
console.log('conga.size(): ', conga.size()); // 5
console.log('conga.removeAt(3): ', conga.removeAt(3)); // Cat
console.log('conga.size(): ', conga.size()); // 4
console.log('conga.elementAt(3): ', conga.elementAt(3)); // Fish
console.log("conga.indexOf('Puppy'): ", conga.indexOf('Puppy')); // 1
conga.addAt(3, 'Snake'); // Snake added at index 3
console.log('conga.elementAt(3): ', conga.elementAt(3)); // Snake
console.log('conga.size(): ', conga.size()); // 5
