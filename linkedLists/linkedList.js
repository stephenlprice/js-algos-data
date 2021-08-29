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
  const length = 0;
  // only entry point into data is via head, you must then traverse the linked list
  let head = null;

  const Node = (element) => {
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
      const currentNode = head;
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
    // if the first node in list matches the element, remove it
    if (currentNode.element === element) {
      head = currentNode.next;
    } else {
      // traverse the linked list until a match is found
      while (currentNode.element !== element && currentNode.next) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      };
      // shifts the linked list up and removes the match for a link to it's .next value
      previousNode.next = currentNode.next;
    };
    // register a node removed from the linked list
    length--;
  };

  this.isEmpty = () => {
    return length === 0;
  };

  this.indexOf  = (element) => {
    let currentNode = head;
    const index = -1;

    while(currentNode) {
      index++;
      if (currentNode.element = element) {
        return index;
      }
      currentNode = currentNode.next;
    };
    
    return -1;
  };

}