function filter(){

  var value, name, item, i;

  value = document.getElementById("value").value.toUpperCase();
  item = document.getElementsByClassName("item");

  for(i=0;i<item.length;i++){
    name = item[i].getElementsByClassName("name");
    if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
      item[i].style.display = "flex";
    }else{
      item[i].style.display = "none";
    }
  }
}
// 상품 검색 기능(키를 입력할 때마다 검색 결과가 동적으로 변하도록)
// 1. input 태그에 onkeyup을 사용해 키를 누를때마다 filter()함수 실행
// - input 태그에 onkeyup을 사용해 키를 누를때마다 filter()라는 함수를 실행시키기 

// - 목록에 있는 모든 아이템을 getElementsByClassName으로 가져오기
// - 목록을 for문으로 돌려 i번째 아이템의 자식 요소인 name의 값을 가져온다.
// - 비교를 위해 name의 값도 대문자로 바꿔준 후 .indexOf()로 검색한 값이 있는지 없는지
// 확인하기. 값이 없을 경우 - 1로 반환
// - 값이 -1이 아닐경우 item[i].style.display를 flex로 바꿔 시각화 아닐 경우
// none로 설정해 검색 목록에 띄우지 않기