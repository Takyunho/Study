{/* <input>, <select>, <textarea> 태그는 form 안에서 사용자가 값을 입력할 수 있는
공간을 제공하는 input 역할을 합니다.
이런 태그들에 사용자가 값을 입력하거나 변경했을 때를 체크할 수 있는 이벤트가 있습니다. 
change와 input이라고 부르는 이벤트입니다. (태그명 아닙니다) */}


// $('input').on('change', function(){
//   인풋 값이 변경되었을 때 실행할 코드 
// });
// $('input').on('input', function(){
//   인풋 값이 변경되었을 때 실행할 코드  
// });

// 이런 식으로 이벤트리스너를 달아서 사용하시면
// 인풋에 입력한 값이 변경될 때를 체크할 수 있습니다.
// 하지만 change와 input은 각각 발동되는 시점이 다른데 
// input은 값이 변경될 때마다 실행됩니다. (심지어 타이핑하는 도중에도 실행됨)
// change는 <input>태그인 경우엔 값이 변경되고 입력란 바깥을 클릭했을 때 실행됩니다.
// change는 <select>태그인 경우엔 값이 변경될 때 실행됩니다. 


$('#option1').on('change', function () {   // option1의 값이 바뀔때 마다 함수 실행
  if ($('#option1').val() == '셔츠' ) {    // 만약에 사용자가 선택한 값이 셔츠인 경우 
    $('.size-select').show();  //밑에 UI를 보여줌
  } else if ($('#option1').val() == '모자') {
    $('.size-select').hide();
  }
})

