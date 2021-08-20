/* 
Stacks: Last In First Out 

Functions: push, pop, peek, length (or size)

Exercise: find palindromes
*/

// stack implemented using an array
const isPalindrome = (word) => {
  let letters = []; // this is the stack
  let rword = ''; // reverse word

  // handle inputs
  if (typeof word !== 'string') {
    return console.error('Error: ' + word + ' is not a string!');
  }

  // add letters of word into stack
  for (let i = 0; i < word.length; i++) {
    letters.push(word[i]);
  }
  
  // pop off the stack in reverse order
  for (let i = 0; i < word.length; i++) {
    rword += letters.pop();
  }

  // checks if the word is a palindrome
  if (rword === word) {
    console.log(word + ' is a palindrome!');
  } else {
    console.log(word + ' is not a palindrome...');
  }

}

isPalindrome('racecar'); // returns 'is a palindrome!'
isPalindrome('hello'); // returns 'is not a palindrome...'
isPalindrome('world'); // returns 'is not a palindrome...'
isPalindrome('bob'); // returns 'is a palindrome!'
isPalindrome(true); // returns 'is not a string!'
