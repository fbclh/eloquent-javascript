// Expressions and statements
1;
!false;

// Bindings
let caught = 5 * 5;

//

let ten = 10;
console.log(ten * ten); // → 100

//

let mood = "light";
console.log(mood); // → light
mood = "dark";
console.log(mood); // → dark

//

let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt); // → 105

//

let one = 1, two = 2;
console.log(one + two); // → 3

//

var name = "Ayda";
const greeting = "Hello ";
console.log(greeting + name); // → Hello Ayda

// Binding names
break case catch class const continue debugger default
delete do else enum export extends false finally for
function if implements import interface in instanceof let
new package private protected public return static super
switch this throw true try typeof var void while with yield

// Functions
prompt("Enter passcode");

// The console.log function
console.log()

// Return values
console.log(Math.max(2, 4)); // → 4
console.log(Math.min(2, 4) + 100); // → 102

// Control flow
let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " + theNumber * theNumber);

// Conditional execution
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
}

//

if (1 + 1 == 2) console.log("It's true"); // → It's true

//

let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
} else {
  console.log("Hey. Why didn't you give me a number?");
}

//

let num = Number(prompt("Pick a number"));

if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
} 

// While and do loops
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);

// 

let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
} // → 0, 2, 4, 8, 10, 12

//

let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result); // → 1024

//

let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);

// Indenting Code
if (false != true) {
  console.log("That makes sense.");
  if (1 < 2) {
    console.log("No surprise there.");
  }
}

// For loops
for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
} // → 0, 2, 4, 8, 10, 12

// 

let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
  result = result * 2;
}
console.log(result); // → 1024

// Breaking Out of a Loop
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
} // → 21

// Updating bindings succinctly
counter = counter + 1;
counter += 1;

// Dispatching on a value with switch
switch (prompt("What is the weather like?")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}

// Capitalization
fuzzylittleturtle
fuzzy_little_turtle

//

FuzzyLittleTurtle
fuzzyLittleTurtle

// Comments
let accountBalance = calculateBalance(account);
// It's a green hollow where a river sings
accountBalance.adjust();
// Madly catching white tatters in the grass.
let report = new Report();
// Where the sun on the proud mountain rings:
addToReport(accountBalance, report);
// It's a little valley, foaming like light in a glass.

//

/*
  I first found this number scrawled on the back of an old
  notebook. Since then, it has often dropped by, showing up in
  phone numbers and the serial numbers of products that I've
  bought. It obviously likes me, so I've decided to keep it.
*/
const myNumber = 11213;

















