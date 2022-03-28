//* Higher-Order Functions

let total = 0,
  count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);

//

console.log(sum(range(1, 10)));

//* Abstraction

/* 
  “Put 1 cup of dried peas per person into a container. Add water until the peas are well covered. Leave the peas in water for at least 12 hours. Take the peas out of the water and put them in a cooking pan. Add 4 cups of water per person. Cover the pan and keep the peas simmering for two hours. Take half an onion per person. Cut it into pieces with a knife. Add it to the peas. Take a stalk of celery per person. Cut it into pieces with a knife. Add it to the peas. Take a carrot per person. Cut it into pieces. With a knife! Add it to the peas. Cook for 10 more minutes.”. 
*/

/* 
  “Per person: 1 cup dried split peas, half a chopped onion, a stalk of celery, and a carrot. Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water (per person). Chop and add vegetables. Cook for 10 more minutes.”
*/

//* Abstracting repetition
for (let i = 0; i < 10; i++) {
  console.log(i);
}

//

function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}

//

function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2

//

let labels = [];
repeat(5, (i) => labels.push(`Unit ${i + 1}`));
console.log(labels); // → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]

//* Higher-order functions (build-in)
function greaterThan(n) {
  return (m) => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true

//

function noisy(f) {
  return (...args) => {
    console.log('calling with', args);
    let result = f(...args);
    console.log('called with', args, ', returned', result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1], returned 1

//

function unless(test, then) {
  if (!test) then();
}

repeat(3, (n) => {
  unless(n % 2 == 1, () => {
    console.log(n, 'is even');
  });
});
// → 0 is even
// → 2 is even

//

['A', 'B'].forEach((l) => console.log(l));
// → A
// → B

//* Script data set
// {
//   name: "Coptic",
//   ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
//   direction: "ltr",
//   year: -200,
//   living: false,
//   link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
// }

//* Filtering arrays
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, (script) => script.living));
// → [{name: "Adlam", …}, …]

console.log(SCRIPTS.filter((s) => s.direction == 'ttb'));
// → [{name: "Mongolian", …}, …]

//* Transforming with map
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter((s) => s.direction == 'rtl');
console.log(map(rtlScripts, (s) => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", ...]

//* Summarizing with reduce
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10

//

console.log([1, 2, 3, 4].reduce((a, b) => a + b)); // → 10

//

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(
  SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
  })
); // → {name: "Han", ...}

//* Composability
let biggest = null;
for (let script of SCRIPTS) {
  if (biggest == null || characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}

console.log(biggest); // → {name: "Han", ...}

//

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}
console.log(
  Math.round(average(SCRIPTS.filter((s) => s.living).map((s) => s.year)))
); // → 1188
console.log(
  Math.round(average(SCRIPTS.filter((s) => !s.living).map((s) => s.year)))
); // → 188

//

let total = 0; // ?
let count = 0; // ?
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}

console.log(Math.round(total / count)); // → 1188

//* Strings and character codes
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}
console.log(characterScript(121)); // → {name: "Latin", ...}

//

// Two emoji characters, horse and shoe
let horseShoe = '🐴👟';
console.log(horseShoe.length); // → 4
console.log(horseShoe[0]);
// → (Invalid half-character) console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character) console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)

//

let roseDragon = '🌹🐉';
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉

//* Recognizing text
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], (n) => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

//

function textScripts(text) {
  let scripts = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : 'none';
  }).filter(({ name }) => name != 'none');
  let total = scripts.reduce((n, { count }) => n + count, 0);
  if (total == 0) return 'No scripts found';
  return scripts
    .map(({ name, count }) => {
      return `${Math.round((count * 100) / total)}% ${name}`;
    })
    .join(', ');
}
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic

//* Summary
/*
  Being able to pass function values to other functions is a deeply useful aspect of JavaScript. It allows us to write functions that model computations with “gaps” in them. The code that calls these functions can fill in the gaps by providing function values.
  Arrays provide a number of useful higher-order methods. You can use forEach to loop over the elements in an array. The filter method returns a new array containing only the elements that pass the predicate function. Transforming an array by putting each element through a function is done with map. You can use reduce to combine all the elements in an array into a single value. The some method tests whether any element matches a given predicate function. And findIndex finds the position of the first element that matches a predicate.
*/
