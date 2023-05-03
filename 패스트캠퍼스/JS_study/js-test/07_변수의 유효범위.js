//! 변수의 유효범위(Variable Scope)
//=> var, let, const

export default function app() {
    
    function scope() {
        if (true) {
            var functionScopeValue = 'global';
            let blockScopeValue = 'local';
            const blockScopeValue2 = 'local';
            console.log('Block Scope', blockScopeValue, blockScopeValue2);  // let, const는 블록 스코프를 가지므로 출력됨
        }
        console.log('Function Scope', functionScopeValue); // var는 함수 스코프를 가지므로 출력됨
        // var는 의도하지 않은 범위에서 사용될 수 있고, 메모리 누수로 이어질 수 있으므로 let과 const를 주로 사용한다.
    }



}