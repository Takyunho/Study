<template>
  <!-- 모달창 -->
  <ModalWindow
    :oneroomData="oneroomData"
    :ModalOnOff="ModalOnOff"
    :detailCount="detailCount"
  />
  <!-- <ModalWindow :작명="하단의데이터이름" /> 이런 식으로 작성해서 props를 하위 컴포넌트(또는 자식 컴포넌트)로 전송 -->
  <!-- 콜론(:)의 역할 1. 데이터 바인딩 2. props 전송 -->

  <!-- nav bar -->
  <nav class="menu">
    <a v-for="a in navMenu" :key="a"> {{ a }} </a>
  </nav>

  <!-- 컴포넌트 사용 -->
  <DiscountBanner />

  <!-- content -->
  <h4>부동산 사이트 만들기</h4>
  <CardBox :oneroomData="oneroomData" :goodCount="goodCount" @increase="increase"></CardBox>
</template>

<script>
// import 작명 from 경로
// 경로로부터 작명을 가져온다.
import data from "./assets/oneroom.js";
import DiscountBanner from "./components/DiscountBanner.vue";
import ModalWindow from "./components/ModalWindow.vue";
import CardBox from './components/CardBox.vue';
console.log(data);


export default {
  name: "App",
  data() {
    return {
      price: [50, 40, 70],
      // products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      oneroomData: data,
      navMenu: ["Home", "Shop", "MyPage"],
      goodCount: [0, 0, 0, 0, 0, 0],
      ModalOnOff: false,
      detailCount: 0,
    };
  },
  // 함수는 여기에다가
  methods: {
    increase(i) {
      // this.데이터이름
      // 메소드 안에서 this는 메소드를 가지고 있는 오브젝트를 뜻한다.
      this.goodCount[i]++;
    },
  }, // 쉼표 잊지말자
  components: {
    // 컴포넌트 사용을 위해 등록하기
    DiscountBanner: DiscountBanner,
    ModalWindow: ModalWindow,
    CardBox
},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.room-img {
  width: 100%;
  margin-top: 30px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
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

.content {
  width: 80%;
  display: block;
  margin: 20px auto 20px auto;
  letter-spacing: 1px;
  padding: 5px;
}
.content-title {
  font-size: 20px;
  color: rgb(29, 29, 173);
}

.recommend {
  display: block;
  float: left;
}
.price {
  float: right;
}

.menu {
  background: linear-gradient(#4a82b9, lightskyblue);
  padding: 16px;
}
.menu a {
  color: white;
  padding: 10px;
}
</style>
