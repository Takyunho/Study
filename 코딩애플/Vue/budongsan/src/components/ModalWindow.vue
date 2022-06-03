<template>
  <!-- 모달창 만들기 -->
  <div class="black-bg" v-if="ModalOnOff == true">
    <div class="white-bg">
      <h4>상품 이름 : {{ oneroomData[detailCount].title }}</h4>
      <img :src="oneroomData[detailCount].image" style="width: 80%" />
      <p>상품 설명 : {{ oneroomData[detailCount].content }}</p>
      <p>가격 : {{ oneroomData[detailCount].price }}</p>
      <!-- <button class="btn close-btn" @click="ModalOnOff = false">❌</button> -->
      <!-- props로 받아온 데이터는 read-only 상태 이므로 수정하면 안됨 -->
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalWindow",
  //^ 부모 컴포넌트로부터 받은 데이터를 props에 등록
  props : {               // 형식 => props : { 데이터이름(oneroomData) : 자료형(Array), () : (), ... }
    oneroomData : Array,   
    detailCount : Number,
    ModalOnOff : Boolean,
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