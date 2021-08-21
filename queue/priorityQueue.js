/* 
Queue: First In First Out 

Elements are added to queue with a declared priority

Functions: push, shift, print, size, front, isEmpty
*/

function priorityQueue() {
  const collection = [];
  
  this.print = () => {
    console.log(collection);
  };

  this.enqueue = (element) => {
    if (this.isEmpty()) {
      collection.push(element);
    } else {
      let added = false; // flag
      for (let i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) { // priority of element is less than collection[i]
          collection.splice(i, 0, element); // add the element at [i] without removing anything
          added = true;
          break;
        }
      }
      // will add the element to the end of the queue if priority is not higher than anything else
      if (!added) { 
        collection.push(element);
      }
    }
  };

  // removes element at beginning of queue and returns it
  this.dequeue = () => {
    const element = collection.shift();
    return element;
  };

  this.front = () => {
    return collection[0];
  };

  this.size = () => {
    return collection.length;
  };

  this.isEmpty = () => {
    return (collection.length === 0);
  }
}

const pq = new priorityQueue();
pq.enqueue(['foo', 2]);
pq.enqueue(['bar', 3]);
pq.enqueue(['foobar', 1]);
pq.print();

pq.dequeue();
console.log('pq.front()', pq.front());
pq.print();
