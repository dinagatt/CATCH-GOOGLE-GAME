/*const person = {
    name: "Oliver",
    outerGreet() {
        console.log(`Outer hello, my name is ${this.name}`);

        function innerGreet() {
            console.log(`Inner greet, my name is ${this.name}`);
        }

        innerGreet();
    }
};*/

/*person.outerGreet(); //

const counter = {
    count: 0,
    delayedIncrement () {
        setTimeout( function () {
            console.log(this.count);
        }, 1000);
    },
    delayedIncrementWithArrow() {
        setTimeout(() => {
            this.count++;
            console.log(this.count);
        }, 1000);
    }
}

counter.delayedIncrementWithArrow(); //*/

/*//CLOSURE
//version1
function makeCounter() {
    let count=0;
    return function() {
        count++;
        return count;
    };
}

const counter = makeCounter();
console.log(counter()); //1

//version2
const counterCreator =() => {
    let count=0;
    return () => {
        console.log(++count);
    };
};

const counter = counterCreator();
counter(); //1
counter(); //2
counter(); //3*/