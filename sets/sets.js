/* 
Sets 

Can be implemented as an array
defined as not having duplicate values
and without a sort order

Operations: { 
  add, remove, has, values, size, union, intercept, difference, symmetrical difference, subset 
}

ES6 has a built-in set object however, it lacks certain methods 
common to sets (such as unions) that can be implemented as a new class
*/

function mySet() {
  const collection = [];

  // check if element is present in collection
  this.has = function(element) {
    // return false if -1 (element not present)
    return (collection.indexOf(element) !== -1);
  };

  // returns all values in the set
  this.values = function() {
    return collection;
  };

  // adds new elements to the set
  this.add = function(element) {
    if (!this.has(element)) {
      collection.push(element);
      return true;
    }
    return false;
  };

  // removes existing elements from the set (in ES6 it's called delete)
  this.remove = function(element) {
    if (this.has(element)) {
      index = collection.indexOf(element);
      collection.splice(index, 1);
      return true;
    }
    return false;
  };

  // returns the size of the set (ES6 is a property not a method)
  this.size = function() {
    return collection.length;
  };

  // returns the union of two sets (not in ES6 implementation of sets => full outer join)
  this.union = function(otherSet) {
    const unionSet = new mySet();
    const firstSet = this.values();
    const secondSet = otherSet.values();

    // the mySet() class will be able to resolve unique values and discard duplicates via add()
    firstSet.forEach(function(e) {
      unionSet.add(e);
    });

    secondSet.forEach(function(e) {
      unionSet.add(e);
    });

    return unionSet;
  };

  // returns the elements shared by two sets (inner join)
  this.intersect = function(otherSet) {
    const intersectSet = new mySet();
    const firstSet = this.values();

    // inner part of a venn diagram
    firstSet.forEach(e => {
      if (otherSet.has(e)) {
        intersectSet.add(e);
      }
    });

    return intersectSet;
  };

  // returns the difference between two sets (not symmetrical => left outer join)
  this.difference = (otherSet) => {
    const differenceSet = new mySet();
    const firstSet = this.values();

    // outer parts of a venn diagram
    firstSet.forEach(e => {
      if (!otherSet.has(e)) {
        differenceSet.add(e);
      }
    });

    return differenceSet;
  };

  // returns boolean if current set has all of the values of the otherSet
  this.subset = (otherSet) => {
    const firstSet = this.values();

    return firstSet.every(e => {
      return otherSet.has(e);
    });
  };
}

// intialize two test sets
const setA = new mySet();
const setB = new mySet();

// add elements to set
setA.add('a');
setB.add('b');
setB.add('c');
setB.add('a');
setB.add('d');

console.log('B size', setB.size());
console.log('B values', setB.values());
console.log('A subset B', setA.subset(setB));

console.log('A union B', setA.union(setB).values());
console.log('A intersect B', setA.intersect(setB).values());
console.log('A difference B', setA.difference(setB).values());
console.log('B difference A', setB.difference(setA).values());

// testing ES6 Set implementation
const setC = new Set();
const setD = new Set();

setC.add('a');
setD.add('b');
setD.add('c');
setD.add('a');
setD.add('d');

console.log('D size', setD.size); // in ES6 this is a property
console.log('D values', setD.values()); // returns an iterator
console.log('D has', setD.has('a')); // true
console.log('D delete', setD.delete('a')); // returns true since value was found
console.log('D has', setD.has('a')); // false
console.log('D add', setD.add('d')); // doesn't return false, returns the set itself
