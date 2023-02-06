let cart = [
    { name: '옷', price: 2000 },
    { name: '가방', price: 1000 }
];

let message = `카트에 ${cart.length}개의 아이템이 있습니다.
 - ${cart[0].name}
 - ${cart[1].name}
`;
console.log(message);

const symbol1 = Symbol('s1');
const symbol2 = Symbol('s1');
console.log(symbol1);
console.log(symbol2);
console.log(symbol1 == symbol2);

console.log(typeof 1);
console.log(typeof '1');
console.log(typeof `${0 + 1}`);
console.log(typeof true);
console.log(typeof Symbol(1));
console.log(typeof {});

const user1 = {
    name: 'john',
    [Symbol('nationaility')]: 'Korean'
}
user1[Symbol('nationaility')];
console.log(user1[Object.getOwnPropertySymbols(user1)[0]]);
console.log(Object.keys(user1));
console.log(JSON.stringify(user1));
const user2 = { "name": "john" };
console.log(user2);

function sum(...args) {
    return args.reduce(function (a, b) {
        return a + b;
    });
};

const sum = (...args) => args.reduce((a, b) => a + b);

[1, 2, 3].map((v) => v + 1); // [2, 3, 4]
[1, 2, 3].filter((v) => v > 2);
[1, 2, 3].reduce((prev, curr) => prev + curr, 0)  // curr: 1, (0, 1), curr: 2, (1, 2), curr: 3, (3, 3) => 6
