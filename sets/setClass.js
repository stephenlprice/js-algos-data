class mySet extends Set {
  // does the set have all members of subset?
  isSuperSet = (subset) => {
    for (let member of subset) {
      if (!this.has(member)) {
        return false;
      }
    }
    return true;
  };

  // full outer join 
  union = (joinSet) => {
    let _union = new Set(this);
    for (let member of joinSet) {
      _union.add(member);
    }
    return _union;
  };

  // inner join
  intersection = (joinSet) => {
    let _intersection = new Set();
    for (let member of joinSet) {
      if (this.has(member)) {
        _intersection.add(member);
      }
    }
    return _intersection;
  };

  // left join
  difference = (joinSet) => {
    let _difference = new Set(this);
    for (let member of joinSet) {
      if (_difference.has(member)) {
        _difference.delete(member);
      }
    }
    return _difference;
  }

  symmetricalDifference = (joinSet) => {
    let _difference = new Set(this);
    for (let member of joinSet) {
      if(_difference.has(member)) {
        _difference.delete(member);
      } else {
        _difference.add(member);
      }
    }
    return _difference;
  }
}

// initiating test sets
const obj = {a: 1, b: 2, c: 3};
const setA = new mySet(['a', 'b', 'c', 1, 2, 3, [1,2,3], obj]);
const setB = new mySet(['x', 'y', 'z', 4, 5, 6, [4,5,6], {a: 1, b: 2, c: 3}]);
const setC = new mySet(['a', 'b', 'c', 4, 5, 6, [1,2,3], obj]);
const setE = new mySet(setA);

// isSuperSet()
console.log('setA.isSuperSet(setB)', setA.isSuperSet(setB)); // false
setE.delete(1);
console.log('setA.isSuperSet(setE)', setA.isSuperSet(setE)); // true

// union()
console.log('setA.union(setB)', setA.union(setB)); // Set(16)
console.log('setA.union(setE)', setA.union(setE)); // Set(8)

// intersection()
console.log('setA.intersection(setB)', setA.intersection(setB)); // Set(0)
console.log('setA.intersection(setC)', setA.intersection(setC)); // Set(4)

// difference()
console.log('setA.difference(setB)', setA.difference(setB)); // Set(8)
console.log('setA.difference(setC)', setA.difference(setC)); // Set(4)

// symmetricalDifference()
console.log('setA.symmetricalDifference(setB)', setA.symmetricalDifference(setB)); // Set(16)
console.log('setA.symmetricalDifference(setC)', setA.symmetricalDifference(setC)); // Set(8)
