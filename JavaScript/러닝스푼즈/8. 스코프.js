// 스코프
/*
1. 컴퓨터 과학에서 scope란 name-binding과 연관이 있다.
2. name-binding이란 말 그대로 이름을 연결하는 것이라고 생각하면 된다.
3. 변수/코드(식별자)가 어느 개체(실제 메모리 주소)에 연결되는 것을 말한다.
4. scope란 name-binding이 유효한 범위를 나타낸다.
이러한 범위를 scope block이라고 한다.
5. 변수는 유효 범위 내에서 어떤 개체를 참조할지 알 수 있다.
*/


// 스코프의 종류
/*
1. 렉시컬 스코프(Lexical Scope)
- 변수, 함수 등이 선언되는 시점의 scope를 기준으로 삼는다.
- 즉, 변수, 함수가 선언될때 스코프가 정해짐
ex. C, C#, JAVA, Javascript
*/
// javascript
var a = 'global';
function foo() {
console.log(a);
}
function bar() {
var a = 'local';
foo();
}
foo(); // global
bar(); // global

/*
2. 다이나믹 스코프(Dynamic Scope)
- 변수, 함수 등이 호출되는 시점의 scope를 기준으로 삼는다.
- 즉, 변수, 함수가 호출될때 스코프가 정해짐
ex. Perl, Lips, Clousure, Perl
*/
/* 예제
# perl
$a = "global";
sub foo {
print "$a\n";
}
sub bar {
local $a = 'local';
foo();
}
foo(); # ?
bar(); # ?
*/

/*
소스 코드 작성
어휘 분석기(Lexical􀀁Analyzer) -> 이때 렉시컬 스코프 확정
내부 코드 생성기(code􀀁generator)가 자바스크립트가 최적화 되도록 실행
구문 분석 및 실행(Syntax􀀁Analyzer)

즉, 분석단계(어휘 분석기)와 실행단계(소스코드작성, 내부코드생성기, 구문 분석및 실행)로 나뉜다.
*/

// 호이스팅
// 자바스크립트에서는 함수를 선언하기 전에 호출이 가능한데 이러한 현상을 호이스팅이라고 한다.

hello(); // 안녕하세요
function hello() {
console.log('안녕하세요');
}

hello(); // Uncaught TypeError: hello is not a function
var hello = function () {
  console.log('안녕하세요');
}
