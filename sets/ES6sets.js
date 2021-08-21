/*
ES6 Sets implementation as described on MDN web docs:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
*/

const setA = new Set();
const setB = new Set();
const setC = new Set();

const obj = {a: 1, b: 2, c: 3};

// set A members
setA.add(1);
setA.add(2);
setA.add(3);
setA.add('a');
setA.add('b');
setA.add('c');
setA.add([1, 2, 3]);
setA.add({a: 1, b: 2, c: 3});

// set B members
setB.add(4);
setB.add(5);
setB.add(6);
setB.add('x');
setB.add('y');
setB.add('z');
setB.add([4, 5, 6]);
setB.add(obj);

// set C members
setC.add(1); // matches A
setC.add(2); // matches A
setC.add(3); // matches A
setC.add('x'); // matches B
setC.add('y'); // matches B
setC.add('z'); // matches B
setC.add([1, 2, 3]); // does not match A
setC.add(obj); // matches B (reference to obj)

// size
console.log('setA.size', setA.size);
console.log('setB.size', setB.size);
console.log('setC.size', setC.size);

// has()
console.log('setA.has(1)', setA.has(1)); // true
console.log('setB.has(1)', setB.has(1)); // false
console.log('setC.has(Math.sqrt(9))', setC.has(Math.sqrt(9))); // true
console.log('setA.has("A")', setA.has("A")); // false
console.log('setA.has("A".toLowerCase())', setA.has("A".toLowerCase())); // true
console.log('setB.has(obj)', setB.has(obj)); // true
console.log('setA.has(obj)', setA.has(obj)); // false

// delete()
setB.delete(obj);
console.log('setB.has(obj)', setB.has(obj)); // false
setB.add(obj);

// log the sets
console.log('setA: ', setA);
console.log('setB: ', setB);
console.log('setC: ', setC);

// iterate over items in set
for (let member of setA) console.log('setA member: ', member);

for (let member of setB.keys()) console.log(member);

// (key and value are the same here)
for (let [key, value] of setC.entries()) console.log(key);

// convert Set object to an Array object, with Array.from
const arrA = Array.from(setA);
console.log('arrA: ', arrA);

// converting between Set and Array
const setD = new Set([1, 2, 3, 4]);
console.log('setD.size: ', setD.size); // 4
console.log('[...setD]: ', [...setD]); // [1, 2, 3, 4]

// intersect can be simulated via
let intersectionSim = new Set([...setA].filter(member => setC.has(member)));
console.log('intersect A to C: ', intersectionSim);

intersectionSim = new Set([...setB].filter(member => setC.has(member)));
console.log('intersect B to C: ', intersectionSim);

// difference can be simulated via
let differenceSim = new Set([...setA].filter(x => !setC.has(x)));
console.log('difference A to C: ', differenceSim);

differenceSim = new Set([...setB].filter(x => !setC.has(x)));
console.log('difference B to C: ', differenceSim);

// Iterate set entries with forEach()
setA.forEach(function(member) {
  console.log('setA.forEach(): ', member);
});

// Implementing basic set of operations

// does the set have all members of subset?
const isSuperSet = (set, subset) => {
  for (let member of subset) {
    if (!set.has(member)) {
      return false;
    }
  }
  return true;
};

// full outer join 
const union = (setA, setB) => {
  let _union = new Set(setA);
  for (let member of setB) {
    _union.add(member);
  }
  return _union;
};

// inner join
const intersection = (setA, setB) => {
  let _intersection = new Set();
  for (let member of setB) {
    if (setA.has(member)) {
      _intersection.add(member);
    }
  }
  return _intersection;
};

// left join
const difference = (setA, setB) => {
  let _difference = new Set(setA);
  for (let member of setB) {
    if (_difference.has(member)) {
      _difference.delete(member);
    }
  }
  return _difference;
}

const symmetricalDifference = (setA, setB) => {
  let _difference = new Set(setA);
  for (let member of setB) {
    if(_difference.has(member)) {
      _difference.delete(member);
    } else {
      _difference.add(member);
    }
  }
  return _difference;
}

// test the operations
const setE = new Set(setA);
setE.delete(1);

console.log('isSuperSet(setA, setB)', isSuperSet(setA, setB)); // false
console.log('isSuperSet(setA, setE)', isSuperSet(setA, setE)); // true

console.log('union(setA, setB)', union(setA, setB)); // Set(16)
console.log('union(setA, setE)', union(setA, setE)); // Set(8)

console.log('intersection(setA, setB)', intersection(setA, setB)); // Set(0)
console.log('intersection(setA, setE)', intersection(setA, setE)); // Set(7)

console.log('difference(setA, setB)', difference(setA, setB)); // Set(8)
console.log('difference(setA, setE)', difference(setA, setE)); // Set(0)

console.log('symmetricalDifference(setA, setB)', symmetricalDifference(setA, setB)); // Set(16)
console.log('symmetricalDifference(setA, setE)', symmetricalDifference(setA, setE)); // Set(1)
