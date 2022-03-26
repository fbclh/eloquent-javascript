//* Data sets
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]); // → 5
console.log(listOfNumbers[0]); // → 2
console.log(listOfNumbers[2 - 1]); // → 3

//* Properties
null.length; // → TypeError: null has no properties

//* Methods
let doh = 'Doh';
console.log(typeof doh.toUpperCase); // → function
console.log(doh.toUpperCase()); // → DOH

//

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence); // → [1, 2, 3, 4, 5]
console.log(sequence.pop()); // → 5
console.log(sequence); // → [1, 2, 3, 4]

//* Objects
let day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza', 'running'],
};
console.log(day1.squirrel); // → false
console.log(day1.wolf); // → undefined
day1.wolf = false;
console.log(day1.wolf); // → false

//

let descriptions = {
  work: 'Went to work',
  'touched tree': 'Touched a tree',
};

//

let anObject = { left: 1, right: 2 };
console.log(anObject.left); // → 1
delete anObject.left;
console.log(anObject.left); // → undefined
console.log('left' in anObject); // → false
console.log('right' in anObject); // → true

//

console.log(Object.keys({ x: 0, y: 0, z: 2 })); // → ["x", "y", "z"]

//

let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA); // → {a: 1, b: 3, c: 4}

//

let journal = [
  {
    events: ['work', 'touched tree', 'pizza', 'running', 'television'],
    squirrel: false,
  },
  {
    events: [
      'work',
      'ice cream',
      'cauliflower',
      'lasagna',
      'touched tree',
      'brushed teeth',
    ],
    squirrel: false,
  },
  {
    events: ['weekend', 'cycling', 'break', 'peanuts', 'beer'],
    squirrel: true,
  },
  // And so on...
];

//* Mutability
let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };
console.log(object1 == object2); // → true
console.log(object1 == object3); // → false
object1.value = 15;
console.log(object2.value); // → 15
console.log(object3.value); // → 10

//

const score = { visitors: 0, home: 0 }; // This is okay
score.visitors = 1; // This isn't allowed
score = { visitors: 1, home: 1 };

//* The lycanthrope's log
let journal = [];
function addEntry(events, squirrel) {
  journal.push({ events, squirrel });
}

//

addEntry(['work', 'touched tree', 'pizza', 'running', 'television'], false);
addEntry(
  [
    'work',
    'ice cream',
    'cauliflower',
    'lasagna',
    'touched tree',
    'brushed teeth',
  ],
  false
);
addEntry(['weekend', 'cycling', 'break', 'peanuts', 'beer'], true);

//* Computing correlation
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}
console.log(phi([76, 9, 4, 1])); // → 0.068599434

//

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i],
      index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}
console.log(tableFor('pizza', JOURNAL)); // → [76, 9, 4, 1]

//* Array loops
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}

//

for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}

//* The final analysis
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}
console.log(journalEvents(JOURNAL)); // → ["carrot", "exercise", "weekend", "bread", ...]

//

for (let event of journalEvents(JOURNAL)) {
  console.log(event + ':', phi(tableFor(event, JOURNAL)));
}
// → carrot: 0.0140970969
// → exercise: 0.0685994341
// → weekend: 0.1371988681
// → bread: -0.0757554019
// → pudding: -0.0648203724
// and so on...

//

for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ':', correlation);
  }
}
// → weekend: 0.1371988681
// → brushed teeth: -0.3805211953
// → candy: 0.1296407447
// → work: -0.1371988681
// → spaghetti: 0.2425356250
// → reading: 0.1106828054
// → peanuts: 0.5902679812

//

for (let entry of JOURNAL) {
  if (
    entry.events.includes('peanuts') &&
    !entry.events.includes('brushed teeth')
  ) {
    entry.events.push('peanut teeth');
  }
}
console.log(phi(tableFor('peanut teeth', JOURNAL))); // → 1

//* Further arrayology
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}

//

console.log([1, 2, 3, 2, 1].indexOf(2)); // → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); // → 3

//

console.log([0, 1, 2, 3, 4].slice(2, 4)); // → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2)); // → [2, 3, 4]

//

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(['a', 'b', 'c', 'd', 'e'], 2)); // → ["a", "b", "d", "e"]

//* Strings and their properties

let kim = 'Kim';
kim.age = 88;
console.log(kim.age); // → undefined

//

console.log('coconuts'.slice(4, 7)); // → nut
console.log('coconut'.indexOf('u')); // → 5
console.log('one two three'.indexOf('ee')); // → 11

//

console.log(' okay \n '.trim()); // → okay

//

console.log(String(6).padStart(3, '0')); // → 006

//

let sentence = 'Secretarybirds specialize in stomping';
let words = sentence.split(' ');
console.log(words); // → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join('. ')); // → Secretarybirds. specialize. in. stomping

//

console.log('LA'.repeat(3)); // → LALALA

//

let string = 'abc';
console.log(string.length); // → 3
console.log(string[1]); // → b

//* Rest parameters
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2)); // → 9

//

let numbers = [5, 1, 7];
console.log(max(...numbers)); // → 7

//

let words = ['never', 'fully'];
console.log(['will', ...words, 'understand']); // → ["will", "never", "fully", "understand"]

//* The Math object
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}
console.log(randomPointOnCircle(2)); // → {x: 0.3667, y: 1.966}

//

console.log(Math.random()); // → 0.36993729369714856
console.log(Math.random()); // → 0.727367032552138
console.log(Math.random()); // → 0.40180766698904335

//

console.log(Math.floor(Math.random() * 10)); // → 2

//* Destructuring
function phi(table) {
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
        (table[0] + table[1]) *
        (table[1] + table[3]) *
        (table[0] + table[2])
    )
  );
}

//

function phi([n00, n01, n10, n11]) {
  return (
    (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
  );
}

//

let { name } = { name: 'Faraji', age: 23 };
console.log(name); // → Faraji

//* JSON
{
"squirrel": false,
"events": ["work", "touched tree", "pizza", "running"]
}

//

let string = JSON.stringify({squirrel: false, events: ["weekend"]});
console.log(string); // → {"squirrel":false,"events":["weekend"]} 
console.log(JSON.parse(string).events); // → ["weekend"]
