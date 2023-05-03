//! 함수(function)

export default function app() {
   
    function sum(x, y) {    // 매개채가 되는 매개변수
        //  console.log(x + y);
        return x + y;   //- 함수가 종료된다.
    }

    console.log(sum(1, 2) + sum(1, 3));     //^ 함수의 결과가 반복적으로 사용되는 경우에는 아래처럼 함수를 변수에 할당해서 사용하는 것이 좋다. (왜냐하면 반복적으로 사용될 때마다 함수의 로직이 호출되므로 자원의 낭비가 발생하기 때문이다.)
    
    const a = sum(1, 2)   // 인수
    const b = sum(1, 3)
    console.log(a + b);

    //=> 그러나 한번만 호출되는 함수는 변수에 할당하지 않고 사용해도 효과적이다.
    console.log(sum(1, 2));
    console.log(sum(1, 3));     

    
    function sum2() {
        console.log(arguments)  //^ arguments는 함수 내부에서 사용할 수 있는 지역변수이다. (arguments는 유사배열이다.)
        //=> arguments는 함수의 매개변수가 너무 많은 경우에 사용할 수 있지만, 그렇지 않은 경우에는 매개변수를 지정해서 사용하는 것이 바람직하다.
        return arguments[0] + arguments[1]
    }

    console.log(sum2(1, 7));
    
    
}