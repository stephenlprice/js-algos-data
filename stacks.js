// js stack implementation from freecodecamp.org
// https://www.youtube.com/watch?v=t2CEgPsws3U
// https://codepen.io/beaucarnes/pen/yMBGbR?editors=0012

/* 
Stacks: Last In First Out 

Functions: push, pop, peek, length (or size)

Exercise: find palindromes
*/


const isPalindrome = (word) => {
  let letters = []; // this is the stack
  let rword = ''; // reverse word

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

  if (rword === word) {
    console.log(word + ' is a palindrome!');
  } else {
    console.log(word + ' is not a palindrome...');
  }

}

isPalindrome('racecar');
isPalindrome('hello');
isPalindrome('world');
isPalindrome('bob');
isPalindrome(true);


