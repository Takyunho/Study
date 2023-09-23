//! 01. 산술, 할당 연산자

export default function app() {

    //=> 산술 연산자 (Arithmetic Operator)
    console.log(1 + 2);     // 3
    console.log(5 - 7);     // -2
    console.log(3 * 4);     // 12
    console.log(10 / 2);    // 5
    console.log(7 % 5);     // 2    // 나머지 연산자


    //=> 할당 연산자 (Assignment Operator)
    let a = 2;
    a += 1;    // a = a + 1

    console.log(a);         // 3

}