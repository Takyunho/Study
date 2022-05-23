<template>
  <!-- 모달창 만들기 -->
  <div class="black-bg" v-if="ModalOnOff == true">
    <div class="white-bg">
      <h4>상품 이름 : {{ 원룸데이터[detailCount].title }}</h4>
      <img :src="원룸데이터[detailCount].image" style="width: 80%" />
      <p>상품 설명 : {{ 원룸데이터[detailCount].content }}</p>
      <p>가격 : {{ 원룸데이터[detailCount].price }}</p>
      <!-- <button class="btn close-btn" @click="ModalOnOff = false">❌</button> -->
      <!-- props로 받아온 데이터는 read-only 상태 이므로 수정하면 안됨 -->
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalWindow",
  props : {
    원룸데이터 : Array,   // props : { 데이터이름 : 자료형, }
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