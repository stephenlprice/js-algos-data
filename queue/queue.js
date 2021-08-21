/* 
Queue: First In First Out 

Functions: push, shift, print, size, front, isEmpty

Exercise: find palindromes
*/

function Queue() {
  collection = [];

  this.print = () => {
    console.log(collection);
  };

  // adds an element to the queue
  this.enqueue = (element) => {
    collection.push(element);
  };

  // removes the first element in the queue
  this.dequeue = () => {
    collection.shift();
  };

  // returns the first element in the queue
  this.front = () => {
    return collection[0];
  };

  this.size = () => {
    return collection.length;
  };

  this.isEmpty = () => {
    return (collection.length === 0);
  };
};

const q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

console.log('q.size()', q.size());
q.print();

q.dequeue();
console.log('q.front()', q.front());
q.print();

q.dequeue();
q.dequeue();
console.log('q.isEmpty()', q.isEmpty());
