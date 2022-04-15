//* The Secret Life of Objects

//* Encapsulation
//* Methods

let rabbit = {};
rabbit.speak = function (line) {
  console.log(`The rabbit says '${line}'`);
};
rabbit.speak("I'm alive."); // → The rabbit says 'I'm alive.'

//

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = { type: 'white', speak };
let hungryRabbit = { type: 'hungry', speak };
whiteRabbit.speak('Oh my ears and whiskers, ' + "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
// late it's getting!'
hungryRabbit.speak('I could use a carrot right now.');
// → The hungry rabbit says 'I could use a carrot right now.'

//

speak.call(hungryRabbit, 'Burp!');
// → The hungry rabbit says 'Burp!'

//

function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}
normalize.call({ coords: [0, 2, 3], length: 5 }); // → [0, 0.4, 0.6]

//

//* Prototypes
let empty = {};
console.log(empty.toString); // → function toString()...{}
console.log(empty.toString()); // → [object Object]

//

console.log(Object.getPrototypeOf({}) == Object.prototype); // → true
console.log(Object.getPrototypeOf(Object.prototype)); // → null

//

console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // → true
console.log(Object.getPrototypeOf([]) == Array.prototype); // → true

//

let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEEE!'); // → The killer rabbit says 'SKREEEE!'

//* Classes
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

//

function Rabbit(type) {
  this.type = type;
}
Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let weirdRabbit = new Rabbit('weird');

//

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype); // → true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype); // → true

//* Class notation
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
let killerRabbit = new Rabbit('killer');
let blackRabbit = new Rabbit('black');

//

let object = new (class {
  getWord() {
    return 'hello';
  }
})();
console.log(object.getWord()); // → hello

//* Overriding derived properties
Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth); // → small
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth); // → long, sharp, and bloody
console.log(blackRabbit.teeth); // → small
console.log(Rabbit.prototype.teeth); // → small

//

console.log(Array.prototype.toString == Object.prototype.toString); // → false
console.log([1, 2].toString()); // → 1,2

//

console.log(Object.prototype.toString.call([1, 2])); // → [object Array]

//* Maps
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62,
};
console.log(`Júlia is ${ages['Júlia']}`); // → Júlia is 62
console.log("Is Jack's age known?", 'Jack' in ages); // → Is Jack's age known? false
console.log("Is toString's age known?", 'toString' in ages); // → Is toString's age known? true

//

console.log('toString' in Object.create(null)); // → false

//

let ages = new Map();
ages.set('Boris', 39);
ages.set('Liang', 22);
ages.set('Júlia', 62);
console.log(`Júlia is ${ages.get('Júlia')}`); // → Júlia is 62
console.log("Is Jack's age known?", ages.has('Jack')); // → Is Jack's age known? false
console.log(ages.has('toString')); // → false

//

console.log({ x: 1 }.hasOwnProperty('x')); // → true
console.log({ x: 1 }.hasOwnProperty('toString')); // → false

//* Polymorphism
Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit)); // → a black rabbit

//* Symbols
let sym = Symbol('name');
console.log(sym == Symbol('name')); // → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]); // → 55

//

const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function () {
  return `${this.length} cm of blue yarn`;
};
console.log([1, 2].toString()); // → 1,2
console.log([1, 2][toStringSymbol]()); // → 2 cm of blue yarn

//

let stringObject = {
  [toStringSymbol]() {
    return 'a jute rope';
  },
};
console.log(stringObject[toStringSymbol]()); // → a jute rope

//* The iterator interface
let okIterator = 'OK'[Symbol.iterator]();
console.log(okIterator.next()); // → {value: "O", done: false}
console.log(okIterator.next()); // → {value: "K", done: false}
console.log(okIterator.next()); // → {value: undefined, done: true}

//

class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

//

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y == this.matrix.height) return { done: true };
    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

Matrix.prototype[Symbol.iterator] = function () {
  return new MatrixIterator(this);
};

//

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let { x, y, value } of matrix) {
  console.log(x, y, value);
}
// → 0 0 value 0,0 // → 1 0 value 1,0 // → 0 1 value 0,1 // → 1 1 value 1,1

//* Getters, setters, and statics
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};
console.log(varyingSize.size); // → 73
console.log(varyingSize.size); // → 49

//

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit); // → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius); // → 30

//* Inheritance
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}
let matrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(matrix.get(2, 3)); // → 3,2

//* The instanceof operator
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix); // → true
console.log(new SymmetricMatrix(2) instanceof Matrix); // → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix); // → false
console.log([1] instanceof Array); // → true

//* Summary
/*
  So objects do more than just hold their own properties. They have prototypes, which are other objects. They’ll act as if they have properties they don’t have as long as their prototype has that property. Simple objects have Object. prototype as their prototype.

  Constructors, which are functions whose names usually start with a capital letter, can be used with the new operator to create new objects. The new object’s prototype will be the object found in the prototype property of the constructor. You can make good use of this by putting the properties that all values of a given type share into their prototype. There’s a class notation that provides a clear way to define a constructor and its prototype.

  You can define getters and setters to secretly call methods every time an object’s property is accessed. Static methods are methods stored in a class’s constructor, rather than its prototype.

  The instanceof operator can, given an object and a constructor, tell you whether that object is an instance of that constructor.
  One useful thing to do with objects is to specify an interface for them and tell everybody that they are supposed to talk to your object only through that interface. The rest of the details that make up your object are now encapsulated, hidden behind the interface.
  
  More than one type may implement the same interface. Code written to use an interface automatically knows how to work with any number of different objects that provide the interface. This is called polymorphism.
  When implementing multiple classes that differ in only some details, it can be helpful to write the new classes as subclasses of an existing class, inheriting part of its behavior.
*/