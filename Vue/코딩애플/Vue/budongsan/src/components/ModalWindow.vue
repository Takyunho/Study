<template>
  <!-- 모달창 만들기 -->
  <div class="black-bg" v-if="ModalOnOff == true">
    <div class="white-bg">
      <h4>상품 이름 : {{ oneroomData[detailCount].title }}</h4>
      <img :src="oneroomData[detailCount].image" style="width: 80%" />
      <p>상품 설명 : {{ oneroomData[detailCount].content }}</p>
      <!-- <input @input="month =$event.target.value" /> -->
      <!-- @input대신 v-model을 이용해서 입력된 값을 data에 저장할 수 있다. -->
      <input v-model="month" />
      <p>가격 : {{ oneroomData[detailCount].price * month }}</p>
      <button class="btn close-btn" @click="$emit('ModalOnOff')">❌</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalWindow",
  data() {
    return {
      month: 1,
    }
  },
  watch: {    //! 감시자 역할
    month(changedValue) {
      //! month가 변경될 때 실행할 코드

      //@ 입력한 값이 13 이상이면?
      if (changedValue >= 13) {
        alert("12이하의 숫자를 입력해주세요.");
        this.month = 1; // 초기값을 다시 1로 지정하기
      }

      //@ 한글, 영어 입력 안되도록 막기
      // const reg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z]/   // reg = Regular expression(정규식)

      // if (reg.exec(changedValue) !== null) {
      //   //  = changedValue.slice(0, -1);
      //   // this.month = changedValue.replace(/[^0-9]/g, '');
      //   this.month = changedValue.replace(/[^-\0-9]/g, '');
      // 
      //@ 한글, 영어 입력되면 알람 띄워주기 => isNaN 이용 (isNaN() 안에 숫자를 입력하면 false, 글자를 입력하면 true가 출력)
      if (isNaN(changedValue) == true) {
        alert('문자는 입력이 안되요!');
        this.month = 1;
      }

      //@ 스페이스바 입력 못하도록 막기
      const spaceGap = /\s/; // 공백체크

      if (spaceGap.exec(changedValue)) {
        alert("공백은 사용할 수 없어요.");
        this.month = changedValue.replace(' ', '');   // 공백제거
        this.month = 1; // 초기값을 다시 1로 지정하기
      }

    }
  },
  //^ 부모 컴포넌트로부터 받은 데이터를 props에 등록
  props : {               // 형식 => props : { 데이터이름(oneroomData) : 자료형(Array), () : (), ... }
    oneroomData : Array,   
    detailCount : Number,
    ModalOnOff: Boolean,
    
  },
  updated() {
    if (this.month == 2) {
      alert('2개는 안되요');
      this.month = 1; // 초기값 1로 다시
    }
  },
  
};


</script>

<style>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 30px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: relative;
}

.btn {
  border: none;
  background: none;
  font-size: 20px;
}
.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
}
.close-btn:hover,
.btn:hover {
  cursor: pointer;
}
</style>