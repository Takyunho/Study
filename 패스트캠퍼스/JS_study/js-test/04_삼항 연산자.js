//! 삼항 연산자(ternary operator)

export default function app() {
    const a = 1 < 2;    // true

    if (a) {
        console.log('참');
    } else {
        console.log('거짓');
    }

    // 단순한 코드는 if 조건문 대신에 삼항연산자를 이용해서 조건을 만들 수 있다.
    console.log(a ? '참' : '거짓')
   
}