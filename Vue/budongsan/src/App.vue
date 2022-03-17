<template>
<!-- 모달창 만들기 -->
  <div class="black-bg" v-if="모달창온오프 == true">
    <div class="white-bg">
      <h4>상품 이름 : {{ 원룸데이터[detailCount].title }}</h4>
      <img :src="원룸데이터[detailCount].image" style="width : 80%">
      <p>상품 설명 : {{ 원룸데이터[detailCount].content }}</p>
      <p>가격 : {{원룸데이터[detailCount].price}} </p>
      <button class="btn close-btn" @click="모달창온오프 = false">❌</button>
    </div>
  </div>
  <!-- nav bar -->
  <nav class="menu">
    <a v-for="a in navMenu" :key="a"> {{ a }} </a>
  </nav>

  <!-- content -->
  <h4>부동산 사이트 만들기</h4>
  <div v-for="(a,i) in 원룸데이터" :key="i" class="content">
    <img :src="a.image" class="room-img" />
    <div class="content-title" @click="모달창온오프 = true; detailCount = i">
        {{ 원룸데이터[i].title }}
    </div>

    <div class="recommend">
      <button @click="increase(i)" class="btn">
        추천❤️ <span> {{ 추천수[i] }} </span>
      </button>
    </div>
    <div class="price">{{ 원룸데이터[i].price }}만원</div>
    <div style="float : none; clear : both" ></div>
  </div>

</template>

<script>
// import 작명 from 경로
// 경로로부터 작명을 가져온다.
import data from "./assets/oneroom.js";

export default {
  name: "App",
  data() {
    return {
      price: [50, 40, 70],
      // products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      원룸데이터: data,
      navMenu: ["Home", "Shop", "MyPage"],
      추천수: [0, 0, 0, 0, 0, 0],
      모달창온오프: false,
      detailCount : 0,

    };
  },
  // 함수는 여기에다가
  methods: {
    increase(i) {
      // this.데이터이름
      // 메소드 안에서 this는 메소드를 가지고 있는 오브젝트를 뜻한다.
      this.추천수[i]++;
    },
  }, // , 잊지말자
  components: {},
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
.close-btn:hover, .btn:hover{
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
  background: lightskyblue;
  padding: 16px;
}
.menu a {
  color: white;
  padding: 10px;
}
</style>
