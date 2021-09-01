/*
Trie
original implementation at: https://codepen.io/beaucarnes/pen/mmBNBd?editors=0011

- a trie (try) sometimes called a prefix tree
- type of tree used to store associative data structures
- stores data in steps, each step is a node in the trie
- often used to store words since there are finite number of letters that can combine to make a word
- possible use case is validate that a word is in a dictionary, where each step/node would represent a letter of a word
- key/value pairs are like a folder + the contents of that folder
*/

// building block of a trie
const Node = function() {
  this.keys = new Map();
  // determines when a full word stops
  this.end = false;

  this.setEnd = () => {
    this.end = true;
  };

  this.isEnd = () => {
    return this.end;
  };
};

const Trie = function() {
  this.root = new Node();

  // adds entire words as input, new words are evaluated starting by the root node
  this.add = (input, node = this.root) => {
    // on empty inputs, past the end of a word, set the node end value to true
    if (input.length === 0) {
      node.setEnd();
      return;
    // evaluate whether the first letter exists, if it doesn't create a new node
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      // once the first letter has been added, recursively evaluate each additional letter
      return this.add(input.substr(1), node.keys.get(input[0]));
    } else {
      // if the first letter exists, skip it and recursively evaluate each additional letter 
      return this.add(input.substr(1), node.keys.get(input[0]));
    };
  };

  // returns true if a word has been added to the trie
  this.isWord = (word) => {
    // start evaluating from the root node
    let node = this.root;
    while (word.length > 1) {
      // if the node does not have the first letter in the word return false
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        // if the letter matches a key, continue evaluating down that subtree
        node = node.keys.get(word[0]);
        // continue evaluating the next letter in the provided word
        word = word.substr(1);
      };
    };
    // once each letter has been evaluated and has not returned false,
    // return true if last letter exists and has end value set to true 
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
  };

  // prints all words added to the trie
  this.print = () => {
    let words = new Array();
    let search = (node, string) => {
      // if the node has a non-empty map
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          // recursively evaluate each letter and concatenates it to the string parameter
          search(node.keys.get(letter), string.concat(letter));
        };
        // once a node with an end value of true is found, push the concatenated string into the words array
        if (node.isEnd()) {
          words.push(string);
        };
      } else {
        // if the string parameter is not empty & the node's map value is empty, 
        // push it into the words array - assumes concatenation took place but end value is set to false
        string.length > 0 ? words.push(string) : undefined;
        return;
      };
    };
    // start evaluating on the root node with a new String object
    search(this.root, new String());
    // last step: return the words array or undefined
    return words.length > 0 ? words: undefined;
  };

  // prints each node (letter) in the trie
  this.iterate = () => {
    const node = this.root;
    const recurse = (node) => {
      if (node.keys.size > 0) {
        for (const letter of node.keys.keys()) {
          console.log(`Letter: ${letter}`);
          recurse(node.keys.get(letter));
        };
      };
    };
    recurse(node);
  };
};

const myTrie = new Trie();
myTrie.add('ball');
myTrie.add('bat');
myTrie.add('doll');
myTrie.add('dork');
myTrie.add('do');
myTrie.add('dorm');
myTrie.add('send');
myTrie.add('sense');
myTrie.add('zebra');

console.log("myTrie.isWord('doll'): ", myTrie.isWord('doll')); // true
console.log("myTrie.isWord('dor'): ", myTrie.isWord('dor')); // false
console.log("myTrie.isWord('dorf'): ", myTrie.isWord('dorf')); // false
console.log("myTrie.print(): ", myTrie.print()); // returns array of words
myTrie.iterate();
