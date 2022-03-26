//* The sum of a range

/*
  The introduction of this book alluded to the following as a nice way to compute the sum of a range of numbers:

  console.log(sum(range(1, 10)));

  Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.

  Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the example program and see whether it does indeed return 55.

  As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. If no step is given, the elements go up by increments of one, corresponding to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9]. Make sure it also works with negative step values so that range(5, 2, -1) produces [5, 4, 3, 2]
*/

// function range(start, end) {
//   const arr = [];
//   for (let i = start; i <= end; i++) arr.push(i);
//   return arr;
// }

// console.log(range(1, 10));

//

function range(start, end, step) {
  const arr = [];
  if (step == null) step = 1;
  if (step > 0) {
    for (let i = start; i <= end; i += step) arr.push(i);
  } else {
    for (let i = start; i >= end; i += step) arr.push(i);
  }
  return arr;
}

console.log(range(1, 5));
console.log(range(1, 10, 2));
console.log(range(5, 2, -1));

//

function sum(arr) {
  let sum = 0;
  for (let i = 0; i <= arr.length; i++) sum += i;
  return sum;
}

console.log(sum(range(1, 10)));

//* Reversing an array

/*
  Arrays have a reverse method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. 
  
  The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.

  Thinking back to the notes about side effects and pure functions in the previous chapter, which variant do you expect to be useful in more situations? Which one runs faster?
*/

function reverseArray(arr) {
  if (arr.every((i) => typeof i === 'string')) {
    return arr.reduce((a, b) => b + a, '').split('');
  } else {
    return [...arr].sort((a, b) => a - b);
  }
}

console.log(reverseArray(['A', 'B', 'C'])); // ["C", "B", "A"]
console.log(reverseArray([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]

//

function reverseArrayInPlace(arr) {
  let newArr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i]);
  }
  return newArr;
}

console.log(reverseArrayInPlace([5, 4, 3, 2, 1])); // [1, 2, 3, 4, 5]
console.log(reverseArrayInPlace(['A', 'B', 'C'])); // ["C", "B", "A"]

//* A list

/*
  Objects, as generic blobs of values, can be used to build all sorts of data struc- tures. A common data structure is the list (not to be confused with array). A list is a nested set of objects, with the first object holding a reference to the second, the second to the third, and so on.

  let list = {
    value: 1,
    rest: {
      value: 2,
      rest: {
  value: 3,
  rest: null }
  } };


  A nice thing about lists is that they can share parts of their structure. For example, if I create two new values {value: 0, rest: list} and {value: -1, rest: list} (with list referring to the binding defined earlier), they are both independent lists, but they share the structure that makes up their last three elements. The original list is also still a valid three-element list.

  Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. 

  Also write a listToArray function that produces an array from a list. 

  Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

  If you haven’t already, also write a recursive version of nth.
*/

function arrayToList(arr) {
  let list = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    list = { value: arr[i], rest: list };
  }
  return list;
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}

//

const listToArray = (node) => {
  let arr = [];
  for (let list = node; node; node = node.rest) {
    arr.push(node.value);
  }
  return arr;
};

console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]

//

const prepend = (element, list) => {
  return { value: element, rest: list };
};

console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}

//

const nth = (list, n) => {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
};

console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

//* Deep comparison

/*
  The == operator compares objects by identity. But sometimes you’d prefer to compare the values of their actual properties.
  80
      
  Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.

  To find out whether values should be compared directly (use the === operator for that) or have their properties compared, you can use the typeof operator. 
  
  If it produces "object" for both values, you should do a deep comparison. But you have to take one silly exception into account: because of a historical accident, typeof null also produces "object".
  The Object.keys function will be useful when you need to go over the prop- erties of objects to compare them.
*/

const deepEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || typeof a != 'object' || b == null || typeof b != 'object')
    return false;
  let keysA = Object.keys(a);
  let keysB = Object.keys(b);
  if (keysA.length != keysB.length) return false;
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
};

let obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
