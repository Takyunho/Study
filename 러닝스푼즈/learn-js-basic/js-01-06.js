var score = 110;
if (score > 100) {
    console.log('A');
} else if (score > 90) {
    console.log('B');
} else if (score > 80)
    console.log('C');
else if (score > 70)
    console.log('E');
else
    console.log('F');

var level = 'A';
switch (level) {
    case 'A':
        console.log('Great!');
        console.log('Great!');
        console.log('Great!');
        break;
    case 'B':
        console.log('Awesome!');
        break;
    default:
        console.log('Too bad!');
        break;
}

var store = [
    { name: 'snack', price: 1000 },
    { name: 'flower', price: 3000 },
    { name: 'beverage', price: 500 }
];

for (var index = 0; index < store.length; index++) {
    const element = store[index];
    console.log('item[' + index + '] => ' + element.name);
}

var sum = 0;
for (var i = 1; i <= 10; i++) {
    sum = sum + i;
}
console.log('sum => ' + sum);

var i2 = 0;
var sum2 = 0;
// while (i2 <= 10) {
//     sum2 = sum2 + i2;
//     i2++;
// }
do {
    sum2 = sum2 + i2;
    i2++;
} while (i2 <= 10);
console.log('sum2 => ' + sum2);