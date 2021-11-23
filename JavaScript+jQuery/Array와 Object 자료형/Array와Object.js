//자료형정리
// ⭐ 문자
var name = '20'; // 작은따옴표 큰따옴표 상관없음
// ⭐ 숫자
var age = 20;



// ⭐ Array & Object
// 여러가지 자료를 한 곳에 저장하고 싶을 때 사용하는 자료형

// 1️⃣ Array
// - 대괄호를 열고 자료를 집어넣으면 된다. (변수에 저장해서 쓰는게 일반적임)
// - 자료들을 콤마로 구분
// - 문자, 숫자, 다른 배열, 오브젝트도 넣을 수 있음
var 어레이 = ['BMW', '520'];      // 자료 저장하는법
console.log(어레이);              // 자료 출력하는법
console.log(어레이[0]);           // 대괄호를 뒤에 붙여서 원하는 내부 자료를 뽑을 수 있음


// 2️⃣ Object
// - 중괄호를 열고 자료를 집어넣으면 됨. (변수에 저장해서 쓰는게 일반적임)
// - 자료들을 콤마로 구분하며 문자, 숫자, 다른 배열도 넣을 수 있음
// - 오브젝트 안에 오브젝트 넣는것도 가능
// - 배열과 달리 자료 앞에다가 이름(key)을 달아줘야함
// - 즉, 자료를 한 쌍으로 저장함 🔻 왼쪽(brand): key / 오른쪽(model): value 
var 오브젝트 = { brand: 'BMW', model: 520 };       // 자료 저장하는법
console.log(오브젝트);                             // 자료 출력하는법
console.log(오브젝트.brand);        // 마침표를 찍고 자료의 이름(key)를 불러서 자료를 뽑음
console.log(오브젝트.model);        // 참고로 오브젝트['brand'] 이런 식으로도 뽑을 수 있음                



// ⭐ array 내의 상품 데이터를 꺼내 HTML에 넣기 ( 데이터 바인딩 )
// 자바스크립트로 명령을 줘서 원하는 내용으로 HTML을 변경할 수 있다!! (데이터바인딩)
document.querySelector('.title').innerHTML = 어레이[0];           // 배열
document.querySelectorAll('.content')[0].innerHTML = 오브젝트.model;    // 오브젝트



// ⭐ 복잡한 데이터는?
var 자료 = [{ brand: 'BMW' }, { model: 520 }];
console.log(자료);
// '자료'라는 변수에 저장된 520이라는 데이터를 뽑아서 데이터 바인딩하려면?
// 즉 상품 내용을 '자료' 변수의 첫번째 배열안에 있는 오브젝트로 바꾸려면?
document.querySelector('.content').innerHTML = 자료[1].model;   // 37번째 줄과 같음