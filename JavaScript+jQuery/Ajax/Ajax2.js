

$('#getBtn').click(function () {
  
  $.ajax({
    url: 'https://codingapple1.github.io/data.json',
    type: 'GET'

    // 중괄호 내에 여러가지 프로퍼티들을 설정해주면 조금 더 상세한 ajax 요청이 가능
    // data : '어쩌구',
    // dataType : '저쩌구'
    // 어떤 것들이 있는지는 구글 찾으면 다 나오기 때문에 필요할 때 찾아쓰도록 하자

  }).done(function (데이터) {
    console.log(데이터);
    $('.card-title').html(데이터.model);
    $('.card-text').html(데이터.price);
    $('.card-img-top').attr('src', 데이터.img);
    // .attr()은 요소(element)의 속성(attribute)의 값을 가져오거나 속성을 추가
    // .attr( attributeName, value )
    // 선택한 요소에 속성을 추가합니다. 예를 들어
    // $( 'h1' ).attr( 'title', 'Hello' );
    // 는 h1 요소에 title 속성을 추가하고 속성의 값은 Hello로 합니다.
  }).fail(function () {
    //요청이 실패했을 때 실행할 코드 
  }).always(function () {
    //실패하든 성공하든 항상 실행할 코드
  })
    // .done 함수 말고도 뒤에 붙일 수 있는 함수는 fail, always가 있습니다. 
    // 용도는 위에 써있는 그대로입니다. 
    // fail 함수는 파라미터를 3개 추가해서 쓸 수 있는데
    // .fail(function (jqXHR, textStatus, errorThrown) {
    //   console.log(errorThrown)
    // });
  // textStatus, errorThrown을 출력해보면 Ajax 요청이 왜 실패했는지 이유를 알려줍니다. 
})


// object 자료형에 왜 따옴표가 쳐져있을까?
// {"brand" : "Hyundai", "model" : "Kona",
// "price" : 30000, "img" : "https://codingapple1.github.io/kona.jpg"}

// Ajax 요청을 하면 위의 자료가 온다고 했는데, 
// 잘 보시면 key 값에 전부 따옴표가 쳐있습니다. 
// 이건 object가 아니라, JSON이라는 자료형입니다.
// (object의 키값에 전부 따옴표를 쳐서 만들어내는 자료형입니다.)

//  JSON은 보통 서버에서 데이터를 보내줄 때 object, array 대신자주 활용하는 자료형입니다. 
// "object를 그냥 보내면 되는거지 왜 굳이 JSON처럼 따옴표를 쳐서 보내는지?" 물어보신다면.. 
// 원래 데이터를 주고받을 때 텍스트형식이 아니면 데이터가 중간에 깨질 수 있습니다. 
// 그래서 object 자료를 저렇게 따옴표 쳐서 텍스트 비스무리하게 만들어서 보내는 것입니다. 

// 그런데 JSON은 object처럼 쩜을 찍어서 원하는 자료를 꺼낼 수가 없음
// 그래서 JSON 자료를 받아오면 object로 변환하는 과정이 필요함
// (그래야 원하는 데이터를 쉽게 뽑아쓰니까)

// var 오브젝트 = JSON.parse(여러분의 제이슨데이터)
// JSON.parse()라는 함수에 담으면 따옴표가 제거된 object가 생성됩니다.

// 그 반대도 있습니다. 

// var 제이슨 = JSON.stringify(여러분의 오브젝트데이터)
// JSON.stringify()라는 함수에 담으면 object 자료형에 따옴표를 예쁘게 쳐서 JSON을 만들어줍니다. 

// 하지만 아까처럼 jQuery ajax 함수를 쓰면 JSON을 가져와도
// 지가 알아서 쓰기좋게 object로 변환해주기 때문에 따로 신경쓸 필요는 없습니다.