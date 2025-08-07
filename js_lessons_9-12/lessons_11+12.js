//JS LESSON 11 ARTEM FROM 24.09.2024 + LESSON 12 EVGENII FROM 30.09.24 + LESSON 11 EVGENII FROM 21.10.24
//CLASSES(11) + proto, prototype, extends(12)

//LESSON 11

/*
//FACTORY FUNCTION
//to create typical(odnotipnij) objects
function createCar(brand, color) {
    const car = {
        brand: brand,
        color: color,
        startEngine: function () {
            console.log(`${this.brand} started`)
        }
    };
    return car;
}

const bmw = createCar("bmw", "white");
const kia = createCar("kia", "black");

console.log(bmw);
console.log(kia);
//the problem with these functions is that function "startEngine"
//is going be created everytime we create a new obj ->
//stored in memory, not good
*/

/*//CONSTRUCTOR FUNCTION
// -> all functions except arrow functions can be constructor functions
// -> keyword 'new' makes a functions a constructor function
/!*!// ->
function foo1() {}
console.log(new foo1()); // -> returns and empty obj 'foo {}'
function foo2() {return 10;}
console.log(new foo2()); // -> returns and empty obj 'foo {}' b/c '10' is a primitive
function foo3() {return {name: 'John'}}
console.log(new foo3()); // -> returns an obj 'foo {name: 'John'}'*!/


function CarCreator(brand, color) {
    //when 'new' is called => {} -> 'this'
    this.brand = brand; //{}.brand
    this.color = color; //{brand: 'bmw'}.color
    //implicit return of 'this' = {brand: 'bmw', color: 'red'}

    /!*!//moved to prototype below to define this function in prototype ->
    //now this function isn't created in every instance
    this.startEngine = function () {
        console.log(`${this.brand} started`)
    }*!/
}

CarCreator.prototype.startEngine = function () {
    console.log(`${this.brand} started`)
}

const bmw = new CarCreator("bmw", "white");
const kia = new CarCreator("kia", "black");
bmw.startEngine();
kia.startEngine();
console.log(bmw);
console.log(kia);*/

/*//CLASS
//in classes "this" refers to class instance

class Car {
    #brand //it's a PRIVATE FIELD b/c of # -> can only be accessed inside the class
    #speed
    //basically, this 'constructor' is the same as constructor func above
    constructor(brand, color, speed) {
        //private field
        this.#brand = brand;
        this.color = color;
        if(this.#validateSpeed(speed)) {
            this.#speed = speed;
        }
        this.state = {};
    }

    //the proper syntax of method: it's a method,it is defined in this class's prototype -> all instances share the same function reference
    startEngine() {
        console.log(`${this.#brand} started`)
    }

    /!*!//will work as well, BUT as "this" refers to class instance,
    //every instance will have this functions => not good, eats up storage
    startEngine = function() {
        console.log(`${this.#brand} started`)
    }*!/

    /!*!//also will work as "this" in arrow functions is inherited
    //from the outer scope and in this example
    //the outer scope of this function is class instance
    //but again, created in each instance, not good
    stopEngine = () => {
        console.log(`${this.#brand} stopped`)
    } //it's a class's instance property, stopEngine is an arrow func
      // assigned as a class field, not on the prototype,
      // so each time you create a new Car, it creates a new copy of
      // stopEngine and binds this lexically;
      // check WHY WE DO NOT USE ARROW FUNCTIONS IN CLASSES below*!/

    //methods to access private filed outside of this class
    getBrand() {
        return this.#brand;
    }
    //getter: the proper way tof method above
    get brand() {
        return this.#brand;
    }

    setBrand(newBrand) {
        this.#brand = newBrand;
    }
    //setter: the proper way tof method above
    set brand(newBrand) {
        this.#brand = newBrand;
    }

    //private method
    #validateSpeed(newCarSpeed) {
        if (newCarSpeed < 50) {
            throw new Error('Invalid speed! Too slow!');
        }
        return true;
    }

    //getter
    get speed() {
        return this.#speed;
    }

    //setter: to change speed(a private field)
    set speed(newSpeed) {
        if(this.#validateSpeed(newSpeed)) {
            this.#speed = newSpeed;
        }
    }

    //static method: only accessible by class not by instance
    static compareCars(car1, car2) {
        if (car1.speed > car2.speed) {
            console.log(`${car1.brand} is faster than ${car2.brand}`);
        } else {
            console.log(`${car2.brand} is faster than ${car1.brand}`)
        }
    }
}

//const bmw = new Car("bmw", "white", 100);
//console.log(bmw);
//const kia = new Car("kia", "black", 110);
//console.log(kia);
/!*!//Another way to create an instance of class Car is to call constructor of another instance of this class:
const toyota = new bmw.constructor('toyota', 'yellow');*!/

/!*!//WHY WE DO NOT USE ARROW FUNCTIONS IN CLASSES
//cannot bind arrow function b/c "this" is already assigned to instance 'bmw' of class 'Car'
bmw.stopEngine.bind(kia)(); //logs 'bmw stopped'
//this is a reg func, so bind works
bmw.startEngine.bind(kia)(); // logs 'kia started'*!/

//bmw.startEngine();
//kia.startEngine();
//bmw.stopEngine();
//console.log(kia.#brand); //is inaccessible b/c brand is a private field
//console.log(kia.getBrand()); //this is how we access private fields outside the class
//console.log(kia.brand); //getter (proper syntax of the line above)
//kia.setBrand('audi'); //this is how we reassign the private field
//kia.brand = 'audi'; //setter (proper syntax of the line above)
//console.log(kia.brand); //check if setter worked
//Car.compareCars(kia, bmw);

/!*const kia1 = new Car("kia", "red", 300);
const kia2 = new Car("kia", "red", 300);
console.log(kia1 === kia2); //false b/c these are 2 objs with 2 different references in storage
console.log(kia1.brand === kia2.brand); //true b/c these are 3 strings/primitives
console.log(kia1.startEngine === kia2.startEngine); //true
console.log(kia1.stopEngine === kia2.stopEngine); //false
console.log(kia1.state === kia2.state); //false b/c these are 2 objs with 2 different references in memory*!/

//CLASS INHERITANCE
class Automobile {
    constructor(brand, color, speed) {
        this.brand = brand;
        this.color = color;
        this.speed = speed;
    }

    startEngine() {
        console.log(`${this.brand} started`)
    }

    static compareCars(car1, car2) {
        if (car1.speed > car2.speed) {
            console.log(`${car1.brand} is faster than ${car2.brand}`);
        } else {
            console.log(`${car2.brand} is faster than ${car1.brand}`)
        }
    }
}

class SuperAutomobile extends Automobile {
    constructor(brand, color, speed, canFly) {
        super(brand, color, speed);
        this.canFly = canFly;
    }

    fly() {
        console.log(`${this.brand} is flying`);
    }

    startEngine() {
        super.startEngine(); //we copy all logic in parent class
        console.log('additional logic') //here, we add additional logic to the child class
    }
}

const superAutomobile1 = new SuperAutomobile('tesla1', 'brown', 400, true);
const superAutomobile2 = new SuperAutomobile('tesla2', 'marron', 410, true);
//superAutomobile1.startEngine();
//superAutomobile2.fly();
//SuperAutomobile.compareCars(superAutomobile1,superAutomobile2); //child class has access to parent's class's static methods*/

//-------------------------------------------------------------------------------------------------------------------------------------------------------

//LESSON 12

/*//PROTOTYPE is an object:
// it is a property of an object(constructor functions and classes ONLY)

//__PROTO__ is a property of ANY object, that refers to prototype of a
// class or a constructor function which was used to create the instance
//of the said object above

/!*!//Example:
console.log(Object.getPrototypeOf(bmw) === Car.prototype); //true
//Object.getPrototypeOf(bmw) is a modern way of bmw.__proto__;*!/

/!*const arr = new Array();
console.log(arr.__proto__ === Array.prototype); //true

const arr2 = [];
console.log(arr2.__proto__ === Array.prototype); //true

const obj = {};
console.log(obj.__proto__ === Object.prototype); //true

const str = "string";
const str2 = "string";
const str3 = new String('string');
//console.log(str === str2); //true
//console.log(str === str3); //false b/c str3 is and obj
//BUT: console.log(str == str3); true b/c non-strict equation will look at primitive value of String obj
console.log(str.__proto__ === String.prototype); //true*!/

/!*!//Explaining the relation b/w __proto__ and prototype
//look in your notebook for a diagram
console.log(Object.getPrototypeOf(Array) === Function.prototype);
console.log(Object.getPrototypeOf(Object) === Function.prototype);
console.log(Object.getPrototypeOf(Number) === Function.prototype);
console.log(Object.getPrototypeOf(Function) === Function.prototype);
//All of them return 'true', b/c all these classes(Array, Number etc) are made with constructor
//function which is class Function*!/

//HOW CLASS INHERITANCE WORKED BEFORE extends WAS CREATED:
//Classes:
//called Carr b/c Car already exists in this doc
class Carr {
    constructor(brand, maxSpeed) {
        this.brand = brand;
        this.maxSpeed = color;
    }

    startEngine() {
        console.log(`${this.brand} started`)
    }

    stopEngine = function () {
        console.log(`${this.brand} stopped`)
    }

    static compareCars(car1, car2) {
        if (car1.maxSpeed > car2.maxSpeed) {
            console.log(`${car1.brand} is faster than ${car2.brand}`);
        } else {
            console.log(`${car2.brand} is faster than ${car1.brand}`);
        }
    }
}
class SuperCar extends Carr {
    constructor(brand, maxSpeed, canFly) {
        super(brand, maxSpeed);
        this.canFly = canFly;
    }
    fly() {
        console.log(`${this.brand} can fly`)
    }
}

function CarCreator(brand, maxSpeed) {
    this.brand = brand;
    this.maxSpeed = maxSpeed;
    this.stopEngine = function() {
        console.log(`Stop ${this.brand}`);
    }
}

//This is how we create an instance/prototype method of CarCreator:
CarCreator.prototype.startEngine = function() {
    console.log(`Start ${this.brand}`);
}

//This is how we create a static method of CarCreator:
CarCreator.compareCars = function (car1, car2) {
    if (car1.maxSpeed > car2.maxSpeed) {
        console.log(`${car1.brand} is faster than ${car2.brand}`);
    } else {
        console.log(`${car2.brand} is faster than ${car1.brand}`);
    }
}

const car1 = new CarCreator('bmw', 200);
console.log(car1); //CarCreator obj created
car1.startEngine(); //Start bmw
const car2 = new CarCreator('kia', 220); //another CarCreator obj created
CarCreator.compareCars(car1, car2); //kia is faster than bmw

//Now, we create class inheritance:
function SuperCarCreator(brand, maxSpeed, canFly) {
    CarCreator.call(this, brand, maxSpeed);
    this.canFly = canFly;
}
const superCar1 = new SuperCarCreator('superBmw', 400, true);
console.log(superCar1);

//We create instance method of SuperCar in prototype:
SuperCarCreator.prototype.fly = function () {
    console.log(`${this.brand} can fly`)
}

Object.setPrototypeOf(SuperCarCreator.prototype, CarCreator.prototype); //modern version
//SuperCarCreator.prototype.__proto__ = CarCreator.prototype; //deprecated version
superCar1.startEngine(); //'Start superBmw': to get this printed we had to write the line above (look at diagram in notebook)


Object.setPrototypeOf(SuperCarCreator, CarCreator); //modern version
//SuperCarCreator.__proto__ = CarCreator; //deprecated version
SuperCarCreator.compareCars(car1, superCar1); //'superBmw is faster than bmw': to get this printed we had to write the line above (look at diagram in notebook)*/



