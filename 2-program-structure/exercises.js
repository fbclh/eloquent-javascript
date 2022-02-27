//* Looping a triangle

/*
  Write a loop that makes seven calls to console.log to output the following triangle:

  #
  ##
  ###
  ####
  #####
  ######
  #######

  It may be useful to know that you can find the length of a string by writing .length after it.

  let abc = "abc";
  console.log(abc.length); // → 3
*/

for (let hash = '#'; hash.length <= 7; hash += '#') {
  console.log(hash);
}

//

//* FizzBuzz

/* 
  Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

  When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).

  (This is actually an interview question that has been claimed to weed out a significant percentage of programmer candidates. So if you solved it, your labor market value just went up.)
*/

function FizzBuzz() {
  let arr = [];

  for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) arr.push('FizzBuzz');
    else if (i % 3 === 0) arr.push('Fizz');
    else if (i % 5 === 0) arr.push('Buzz');
    else arr.push(i);
  }

  return arr;
}

console.log(FizzBuzz(100));

//

//* Chessboard

/* 
  Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

  Passing this string to console.log should show something like this:

   # # # #
  # # # # 
   # # # #
  # # # # 
   # # # #
  # # # # 
   # # # #
  # # # #
*/

let size = 8;
for (let i = 0; i < size; i++) {
  let line = ' ';

  for (let j = 0; j < size; j++) {
    line += (i + j + 1) % 2 ? ' ' : '#';
  }

  console.log(line);
}

// let size = 8;

// let board = '';

// for (let y = 0; y < size; y++) {
//   for (let x = 0; x < size; x++) {
//     if ((x + y) % 2 == 0) {
//       board += ' ';
//     } else {
//       board += '#';
//     }
//   }
//   board += '\n';
// }

// console.log(board);