//! 조건문(Conditional Statement)

import random from './getRandom'

export default function app() {
    // console.log(random())
    
    const randomValue = random();
    
    if (randomValue === 0) {
        console.log('randomValue is 0');
    } else if (randomValue === 2) {
        console.log('randomValue is 2');
    } else if (randomValue === 4) {
        console.log('randomValue is 4');
    } else {
        console.log('rest...')
    }
   
}