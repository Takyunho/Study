// 참고 사이트
// https://ui.toast.com/fe-guide/ko_CODING-CONVENTION#%EB%93%A4%EC%97%AC%EC%93%B0%EA%B8%B0

//! 들여쓰기
/* 
스페이스와 탭을 섞어서 사용하지 않는다. 
탭은 보통 2칸으로 사용함(FE개발랩)
*/
//! 문장의 종료
// 한 줄에 하나의 문장만 허용하며, 문장 종료 시에는 반드시 세미콜론을 사용한다.

// ! 명명 규칙
//@ 카멜 케이스를 사용한다.
/*
카멜 케이스, 파스칼 표기법, 헝가리안 표기법, 스네이크 표기법이 있는데, 각각 장단점이 있으며 사용하는 언어에 따라 권장사항이 다름
FE개발랩에서는 카멜 케이스를 사용한다.
*/

//@ 예약어
// 예약어(class, enum, extends, super 등)를 사용하지 않는다.

//@ 상수(const)
// 상수는 영문 대문자 스네이크 표기법(Snake case)를 사용
// ex. SYBOLIC_CONSTANTS;

//@ 생성자
// 생성자는 대문자 카멜 케이스를 사용한다.
class ConstructorName {
  // ...
};

//@ 변수, 함수에는 카멜 케이스를 사용한다.
// 숫자, 문자, 불린 - 카멜케이스
let dog;
let variableName;

// 배열 - 배열은 복수형 이름을 사용
const dogs = [];

// 정규표현식 - 정규표현식은 'r'로 시작
const rDesc = /.*/;

// 함수 - 카멜케이스
function getPropertyName() {
  // ...
}

// 이벤트 핸들러 - 이벤트 핸들러는 'on'으로 시작
const onClick = () => {};
const onKeyDown = () => {};

// 불린 반환 함수 - 반환 값이 불린인 함수는 'is'로 시작
let isAvailable = false;


//@ 지역변수 or private 변수 명은 '_'로 시작한다.
let _privateVariableName;
let _privateFunctionName;

// 객체일 경우
const customObjectName = {};
customObjectName.propertyName;
customObjectName._privatePropertyName;
let _privateCustomObjectName = {};
_privateCustomObjectName._privatePropertyName;

//@ URL, HTML 같은 범용적인 대문자 약어는 그대로 사용
// parseHTML
// parseXML

//! 전역변수
//@ 전역변수를 사용하지 않는다.
/*
자바스크립트는 전역 변수에 기반을 둔다. 즉, 모든 컴파일 단위는 하나의 공용 전역 객체(window)에 로딩된다.
전역 변수는 언제든지 프로그램의 모든 부분에서 접근할 수 있기 때문에 편하지만, 바꿔 말하면 프로그램의 모든 부분에서 변경될 수 있고, 그로 인해 프로그램에 치명적인 오류를 발생시킬 수 있다.
*/
let myglobal = "hello";  // Bad

//@ 암묵적 전역 변수를 사용하지 않는다.
// Bad
function sum(x, y) {
  result = x + y;
  return result;
}
// Good
function sum(x, y) {
  let result = x + y;
  return result;
}

// Bad
function foo() {
  let a = b = 0;    // let a = (b = 0);와 같다. b가 암묵적 전역이 된다.
}
// Good
function foo() {
  let a, b
  a = b = 0;
}

//! 선언과 할당
//@ 변수
/*
- 값이 변하지 않는 변수는 const
- 값이 변하는 변수는 let
- var는 절대로 사용하지 않도록 한다.
const를 우선하여 선언하면 "이 변수는 결코 재 할당되지 않습니다."라고 알려줌으로써 코드를 읽기 쉽게 하여 유지보수에 도움이 된다.
let은 블록 범위로 할당되기 때문에 다른 많은 프로그래밍 언어에서와 같은 규칙으로 적용되어 실수를 피하는데 도움이 된다.
*/

//@ const를 let 보다 위에 선언한다.
// 코드가 정리되어 가독성이 좋아진다.
// Bad
// let foo;
// let i = 0;
// const len = this._array.length;
// let bar;

// Good
const len = this._array.length;
const len2 = this._array2.length;
let i = 0;
let j = 0;
let foo2, bar2;

//@ const와 let은 사용 시점에 선언 및 할당한다.
// const와 let으로 선언한 변수는 블록 스코프이므로 호이스팅(hoisting) 되지 않는다.

// Bad - 블록 스코프 밖에서 변수 선언
function foo() {
  const len = this._array.length;
  let i = 0;
  let j = 0;
  let len2, item;

  for(; i < len; i+= 1) {
    // ...
  }

  len2 = this._array2.length;
  for (j = 0, len2 = this._array2.length; j < len2; j += 1) {
    item = this._array2[j];
  }
}

// Good
function foo() {
  const len = this._array.length;
  for (let i = 0; i < len; i+= 1) {
    // ...
  }

  // 사용 시점에 선언 및 할당 (미리 선언해놓지 말고 사용할 때 선언 및 할당하기)
  const len2 = this._array2.length;
  for(let j = 0; j < len2; j += 1) {
    const item = this._array2[j];
  }
}

//@ 외부 모듈과 내부 모듈을 구분하여 사용한다.
// 외부 모듈과 내부 모듈을 변수 참조할 때, 선언 사이에 공백을 두면 가독성이 좋아진다.
// ex. 
// const lodash = require('lodash');
// const $ = require(jquery);
// const handlebars = require('handlebars');
// const d3 = require('d3');

// const pluginFactory from '../../asfas/pluginFactory';
// const predicate from '../../helpers/predicate';
// const raphaelRenderUtil from '../../plugins/raphaelRenderUtil';