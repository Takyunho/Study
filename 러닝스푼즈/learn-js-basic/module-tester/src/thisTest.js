console.log("THIS TEST");
function func() {
    console.log("in function");
    console.log(this);
    console.log(window);
}

function Person(firstName, lastName) {
    // "use strict";
    this.firstName = firstName;
    this.lastName = lastName;
    setTimeout((function () {
        console.log("inner timeout", this);
    }).bind(this), 1000)
}

// const p1 = new Person('jay', 'ko');

// window.firstName = 'jay';
// function sayHi(lastName) {
//     console.log(`hi ${this.firstName} ${lastName}!`)
// }

// sayHi.bind({
//     firstName: 'jay'
// })('ko');

// const p1 = {
//     firstName: 'jay',
//     sayHi: function () {
//         console.log(`hi ${this.firstName}!`)
//     }
// }
// p1.sayHi();
// const hi = p1.sayHi;
// hi();

const util = {
    threshold: 5,
    filter: function (...numbers) {
        console.log(this);
        return numbers.filter((n) => {
            if (n < this.threshold) return true;
            else false;
        })
    }
}

const filteredValues = util.filter(2, 4, 6, 8);
const filter2 = util.filter;
console.log(filter2(2, 4, 6, 8));
// console.log(filteredValues);