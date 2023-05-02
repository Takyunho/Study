//! 조건문(Conditional Statement)

import random from './getRandom'

export default function app() {
    // console.log(random())
    
    const randomValue = random();
    
    //=> if 문 활용하기
    if (randomValue === 0) {
        console.log('randomValue is 0');
    } else if (randomValue === 2) {
        console.log('randomValue is 2');
    } else if (randomValue === 4) {
        console.log('randomValue is 4');
    } else {
        console.log('rest...')
    }

    //=> switch 문 활용하기
    // 어떠한 값이 딱 떨어지는 경우에 적합하다.
    switch (randomValue) {
        case 0:
            console.log('randomValue is 0');
            break;  // break를 쓰지 않으면 다음 case 문을 실행한다.
        case 2:
            console.log('randomValue is 2');
            break;
        case 4:
            console.log('randomValue is 4');
            break;
        default:   // else와 같은 역할 => case 문에 해당되는 값이 없을 때 실행된다.
            console.log('rest...')
            // break 필요없음
    }
   
}