/* 
Hash Table

- type: unordered associative array
- associative arrays or mappings of key/value pairs
- common way to implement the Map data structure or objects
- takes a key input, runs it through a hash function
- hash function maps strings to numbers
- usually numbers correspond to indexes in an array
- hash functions must be consisten, always return the same number for a key
- unique keys must be mapped to unique numbers
- if two keys get hashed to the same number get hash collisions
- one way to handle collisions is to store both key/value pairs on the same index,
  then iterate through the "bucket" of values to find a match

| Algorithm | Average | Worst Case |
|   Space   |  O(n)   |    O(n)    |
|  Search   |  O(1)   |    O(n)    |
|  Insert   |  O(1)   |    O(n)    |
|  Delete   |  O(1)   |    O(n)    |
*/

const hash = (string, max) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
}

const HashTable = function(max) {
  const storage = new Array();
  // limits the hash size
  let storageLimit = max;

  this.print = () => {
    console.log(storage);
    console.table(storage);
  }

  // adds key/value pairs into "buckets" (hash table is an array of arrays containing an array of key/value pairs)
  this.add = (key, value) => {
    const index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [
        [key, value]
      ];
    } else {
      let inserted = false;
      // look inside the hash bucket for key/value pairs
      for (let i = 0; i < storage[index].length; i++) {
        // if a hash bucket key matches the provided value, update key/value pair with a new value
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      // if no match found inside hash bucket, push a new key/value pair into the bucket
      if (inserted === false) {
        storage[index].push([key, value]);
      }
    };
  }

  // removes key/values pairs from buckets, can handle collisions
  this.remove = (key) => {
    const index = hash(key, storageLimit);
    // case with no collision
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index];
    } else {
      // case with collisions
      for (let i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          // returns a new array to avoid having 'undefined' values in the array
          storage[index] = storage[index].filter((pair) => {
            return pair[0] !== key;
          });
        };
      }
    };
  }

  // returns a value provided a key, can handle collisions and non-existent key/value pairs
  this.lookup = (key) => {
    const index = hash(key, storageLimit);
    // case where key has no match
    if (storage[index] === undefined) {
      return undefined;
    } else {
      // handles case when index exists but
      for (let i = 0; i < storage[index].length; i++) {
        // cycle through bucket at [index][i] and return the matching key's value
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    };
  }

}

let ht = new HashTable(4); // results in two collisions at [7][0], [7][1], [7][2]
// ┌─────────┬───────────────────────┬──────────────────────┬──────────────────┐
// │ (index) │           0           │          1           │        2         │
// ├─────────┼───────────────────────┼──────────────────────┼──────────────────┤
// │    1    │ [ 'beau', 'person' ]  │ [ 'tux', 'penguin' ] │ [ 'quincy', 10 ] │
// │    2    │   [ 'fido', 'dog' ]   │                      │                  │
// │    3    │ [ 'rex', 'dinosour' ] │                      │                  │
// └─────────┴───────────────────────┴──────────────────────┴──────────────────┘

/* uncomment the next line and comment the first "ht" to test a storage of 14 */

// let ht = new HashTable(14); // results in only one collision at [7][0] & [7][1]
// ┌─────────┬───────────────────────┬──────────────────┐
// │ (index) │           0           │        1         │
// ├─────────┼───────────────────────┼──────────────────┤
// │    3    │ [ 'tux', 'penguin' ]  │                  │
// │    7    │ [ 'beau', 'person' ]  │ [ 'quincy', 10 ] │
// │   12    │   [ 'fido', 'dog' ]   │                  │
// │   13    │ [ 'rex', 'dinosour' ] │                  │
// └─────────┴───────────────────────┴──────────────────┘

ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin');
ht.add('quincy', 10);

console.log("ht.lookup('tux'): ", ht.lookup('tux'));
ht.print();

console.log('///// REMOVING: beau ///////');
ht.remove('beau');

console.log("ht.lookup('beau'): ", ht.lookup('beau'));
ht.print();
