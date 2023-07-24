//! this
//^ 일반(normal) 함수는 호출 위치에 따라 this 정의
//^ 화살표(arrow) 함수는 자신이 선언된 함수 범위에서 this 정의

const this_test = {
  name: 'yun',
  normal: function () {
    console.log(this.name);   // yun
  },
  arrow: () => {
    console.log(this.name);   // undefined
  }
}

const this_test2 = {
  name: 'yunho',
  timeout: function () {
    setTimeout(function () {
      console.log(this.name);   // undefined
    }, 1000);

    setTimeout(() => {
      console.log(this.name);   // yunho
    }, 2000);

    // setTimeout은 화살표 함수로 정의 해주는게 좋다!
  }
}