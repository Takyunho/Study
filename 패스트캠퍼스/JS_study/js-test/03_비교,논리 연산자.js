//! 03. 비교, 논리 연산자

export default function app() {

    //=> 비교 연산자 (Comparison Operator)
    const a = 1
    const b = 1

    console.log(a === b)  // 일치 => true
    console.log(a !== b)  // 불일치 => false
    console.log(a < b)    // a가 b보다 작다? => false
    console.log(a >= b)   // a가 b보다 크거나 같다? => true
    console.log(a <= b)   // a가 b보다 작거나 같다? => true


    function isEqual(x, y) {
        return x === y
    }

    console.log(isEqual(1, 1))   // true
    console.log(isEqual(2, '2')) // false



    //=> 논리 연산자 (Logical Operator)
    const c = 1 === 1
    const d = 'AB' === 'AB'
    const e = true

    console.log(c)  // true
    console.log(d)  // true
    console.log(e)  // true

    // AND 연산자
    console.log('&&: ', c && d && e)  // true

    const f = false
    console.log('&&: ', d && f)     // false

    // OR 연산자
    console.log('||: ', c || d || e)  // true
    console.log('||: ', d || f)       // true

    // NOT 연산자
    console.log('!: ', !d)  // false
    console.log('!: ', !f)  // true

    // AND 연산자와 OR 연산자를 함께 사용하기
    console.log('&& ||: ', c && d || e)  // true
    console.log('&& ||: ', d && f || e)  // true
    console.log('&& ||: ', d && (f || e))  // true
    console.log('&& ||: ', (c && d) || e)  // true
    console.log('&& ||: ', c && (d || e))  // true
    console.log('&& ||: ', (c && d) || (e && f))  // true
    console.log('&& ||: ', (c && d) || (e || f))  // true
}