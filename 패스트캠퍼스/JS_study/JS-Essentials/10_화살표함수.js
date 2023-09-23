//! 화살표 함수(Arrow function)
// () => {} vs function() {}

export default function app() {
    const double = function (x) {
        return x * 2;
    }

    console.log('double: ', double(7));

    // 화살표 함수
    const doubleArrow = (x) => {
        return x * 2;
    }
    // 아래처럼 축약 가능
    const doubleArrow2 = x => x * 2;
    
    // 객체 데이터를 반환하는 경우에는 소괄호로 감싸야한다. (나머지는 생략 가능)
    const doubleArrow3 = x => ({ name: 'Yunho' });

    console.log('doubleArrow: ', doubleArrow(7));
    
}