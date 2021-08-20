// implement a stack class
const Stack = function() {
  this.count = 0;
  this.storage = {};

  // adds a value to the top of the stack (last in)
  this.push = function(value) {
    this.storage[this.count] = value;
    this.count++;
  }

  // remove the value from the top of stack (first out)
  this.pop = function(value) {
    // will not run on an empty stack
    if (this.count === 0) {
      return undefined;
    }

    // decrement count, remove element from top of stack and return it
    this.count--;
    let result = this.storage[this.count];
    delete this.storage[this.count];
    return result;
  }

  this.size = function() {
    return this.count;
  }

  // returns the element at the top of the stack without removing it
  this.peek = function() {
    return this.storage[this.count-1];
  }
}

// create a new stack object
const myStack = new Stack();

// populate the stack with numbers and log output
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);

console.log('size: ', myStack.size());
console.log('peek: ', myStack.peek());
console.log('pop: ', myStack.pop());

console.log('size: ', myStack.size());
console.log('peek: ', myStack.peek());

myStack.push('foo');
myStack.push('bar');
console.log('size: ', myStack.size());

console.log('pop: ', myStack.pop());
console.log('peek: ', myStack.peek());
console.log('size: ', myStack.size());
