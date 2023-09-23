//! 형 변환(Type Conversion)

export default function app() {
    const a = 1;
    const b = '1';

    // 일치 연산자
    console.log(a === b)    // false
    // 동등 연산자
    console.log(a == b)     // true (==는 형 변환을 하기 때문에 true가 나옴)


    //^ Truthy(참 같은 값)
    //- true, {}, [], 1, 2, 'false', -12, '3.14' ...

    //^ Falsy(거짓 같은 값)
    //- false, '', null, undefined, 0, -0, NaN


    if (false) {
        console.log(123)
    }

    if ('false') {
        console.log(123)
    }
}