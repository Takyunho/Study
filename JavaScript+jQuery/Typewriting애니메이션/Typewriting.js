
var h1태그 = document.querySelector('h1');
var 원래글씨 = document.querySelector('h1').innerHTML;

// 버튼을 누르면 // 0.5초에 한번씩 h1태그 안의 내용이 바뀌어야함 < - 너무 추상적
$('.button').click(function () {

  h1태그.innerHTML = '';  // h1을 빈칸으로 만들고 // == $('h1').html('');

  // 🔻 setTimeout(function () {
  //   // h1태그.innerHTML = h1태그.innerHTML + 'a'; // 0.5초후에 기존 h1태그 안에 있던 글씨에다가 a를 더함
  //   h1태그.innerHTML = h1태그.innerHTML + 원래글씨[0] 
  // 확장성을 위해 'a'글씨 대신에 h1태그의 첫번째 글자를 더함
  // 문자자료형에 [0] 이렇게 array에서 자료뽑듯이 써주면 첫 글자를 출력가능
  // }, 500)

  // setTimeout(function () { 
  //   h1태그.innerHTML = h1태그.innerHTML + 원래글씨[1]; // 0.5초후에 기존 h1태그 안에 있던 글씨에다가 b를 더함
  // }, 1000)

  // setTimeout(function () { 
  //   h1태그.innerHTML = h1태그.innerHTML + 원래글씨[2]; // 0.5초후에 기존 h1태그 안에 있던 글씨에다가 c를 더함
  // }, 1500)

  // 🔻 반복문 사용
  var time = 0; // 변수 선언 및 할당대신에 i * 500 으로 가능
  for (let i = 0; i < 원래글씨.length; i++) {
    setTimeout(function () {
      h1태그.innerHTML = h1태그.innerHTML + 원래글씨[i];
    }, time = time + 500 )
  }
  // 🔺 var가 아닌 let을 써야해 
  // 왜냐하면 위의 반복문 코드는 빠르게 5번 다 도는데, 다 돌고나서 i 값은 6이돼
  // 근데 반복문이 빠르게 다 돌고 난 후 0.5초후에 setTimeout 내부 코드를 실행하게 되니까
  // 원래글씨[6] 이걸 실행해서 언디파인이라는 에러가 나는거임
  // let으로 바꿔주면 for 반복문 안에서 참조해서 쓸 수 있는 i 변수가 생성되기 때문에
  // setTimeout같이 i값을 조금 늦게 참조해서 쓰는 코드들도 제대로 i값을 의도한대로 갖다 쓸 수 있게 되는거
  // 그러니까 for 내에선 let을 쓰자!

});









