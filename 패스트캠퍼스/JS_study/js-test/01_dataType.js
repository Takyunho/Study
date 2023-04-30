//! 01. 데이터 타입 확인하기

import getType from './getType'

export default function app() {
    //=> typeof라는 키워드로 데이터들의 타입을 알 수 있다.
    console.log(typeof 123)              // number
    console.log(typeof "123")            // string
    console.log(typeof true)             // boolean
    console.log(typeof undefined)        // undefined
    console.log(typeof null)             //* object
    console.log(typeof {})               //* object
    console.log(typeof [])               //* object
    console.log(typeof function () { })  // function

    //=> Object.prototype.toString.call()을 이용해서 데이터들의 타입을 더 정확하게 알 수 있다.
    console.log(getType(123))              // Number
    console.log(getType(false))            // Boolean
    console.log(getType(undefined))        // Undefined
    console.log(getType(null))             //* Null
    console.log(getType({}))               //* Object
    console.log(getType([]))               //* Array
    console.log(getType(function () { }))  // Function
}