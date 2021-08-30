/*
Trie
original implementation at: https://codepen.io/beaucarnes/pen/mmBNBd?editors=0011

- a trie (try) sometimes called a prefix tree
- type of tree used to store associative data structures
- stores data in steps, each step is a node in the trie
- often used to store words since there are finite number of letters that can combine to make a word
- possible use case is validate that a word is in a dictionary, where each step/node would represent a letter of a word
*/

const Node = function() {
  this.keys = new Map();
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

  this.add = (input, node = this.root) => {
    if (input.length === 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      return this.add(input.substr(1), node.keys.get(input[0]));
    } else {
      return this.add(input.substr(1), node.keys.get(input[0]));
    };
  };

  this.isWord = (word) => {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      };
    };
    return (node.keys.has(word) && node.keys.get(word).isEnd()) ? true : false;
  };

  this.print = () => {
    let words = new Array();
    let search = (node, string) => {
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        };
        if (node.isEnd()) {
          words.push(string);
        };
      } else {
        string.length > 0 ? words.push(string) : undefined;
        return;
      };
    };
    search(this.root, new String());
    return words.length > 0 ? words: undefined;
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

console.log("myTrie.isWord('doll'): ", myTrie.isWord('doll')); // true
console.log("myTrie.isWord('dor'): ", myTrie.isWord('dor')); // false
console.log("myTrie.isWord('dorf'): ", myTrie.isWord('dorf')); // false
console.log("myTrie.print(): ", myTrie.print());
