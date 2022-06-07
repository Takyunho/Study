<template>
  <!-- 모달창 -->
  <!-- <div class="modal-visible-start" :class="{modalVisibleEnd : ModalOnOff}"> -->
    <!-- css로 애니메이션 주기 -->
    <!--
      :class="{ 작명 : true or false}" 
      조건부로 class명을 부착할 수 있다. 작명이 true이면 class가 부착된다.
    -->
    <!-- Vue에서 제공하는 <transition name="작명"> 태그 이용하기 -->
    <transition name="modalVisible">
      <ModalWindow
        :oneroomData="oneroomData"
        :ModalOnOff="ModalOnOff"
        :detailCount="detailCount"
        @ModalOnOff="ModalOnOff = false"
      />  
    </transition>
  <!-- </div> -->
  <!-- <ModalWindow :작명="하단의데이터이름" /> 이런 식으로 작성해서 props를 하위 컴포넌트(또는 자식 컴포넌트)로 전송 -->
  <!-- 콜론(:)의 역할 1. 데이터 바인딩 2. props 전송 -->

  <!-- nav bar -->
  <nav class="menu">
    <a v-for="a in navMenu" :key="a"> {{ a }} </a>
  </nav>

  <!-- 컴포넌트 사용 -->
  <DiscountBanner />

  <!-- 정렬 버튼 -->
  <button @click="priceSort()">가격순 정렬하기</button>
  <button @click="priceSortReverse()">가격 역순 정렬하기</button>
  <button @click="sortABC()">가나다순 정렬하기</button>
  <button @click="priceFilter()">50만원 이하만 보기</button>
  <button @click="sortBack()">되돌리기</button>
  <!-- content -->
  <h4>부동산 사이트 만들기</h4>
  <CardBox
    :oneroomData="oneroomData"
    :ModalOnOff="ModalOnOff"
    @ModalOnOff="ModalOnOff = true; detailCount = $event"
    >
  </CardBox>
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
      oneroomDataOrigin: [...data], // 원본 데이터를 보존하기 위해 새로 만든것(spread operator 사용) 
      navMenu: ["Home", "Shop", "MyPage"],
      ModalOnOff: false,
      detailCount: 0,
    };
  },
  // 함수는 여기에다가
  methods: {
    // 오름차순으로 정렬하기
    priceSort() {
      this.oneroomData.sort(function (a, b) {
        return a.price - b.price 
      })
      // sort함수를 사용하면 원본이 변형되므로, 원본을 따로 보존하는 식으로 개발하는 것이 바람직하다.
    },
    // 내림차순으로 정렬하기
    priceSortReverse() {
      this.oneroomData.sort(function (a, b) {
        return b.price - a.price
      })
    },
    // 가나다순으로 정렬하기
    sortABC() {
      this.oneroomData.sort(function (a, b) {
        // return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        return a.title.localeCompare(b.title)
      })
    },
    // 50만원 이하만 보여주기
    priceFilter() {
      this.oneroomData = this.oneroomData.filter(function (a) {
        return a.price < 500000;
      })
    },
    // 되돌리기
    sortBack() {
      this.oneroomData = [...this.oneroomDataOrigin];   // data원본을 sort때문에 변한 oneroomData에 재할당해서 원본으로 되돌리는 것
    }

  }, // 쉼표 잊지말자
  components: {
    // 컴포넌트 사용을 위해 등록하기
    DiscountBanner: DiscountBanner,
    ModalWindow: ModalWindow,
    CardBox: CardBox,
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

/* class를 이용하여 모달창에 애니메이션 주기 */
/* .modal-visible-start {
  opacity: 0;
  transition: all 1s;
}

.modalVisibleEnd {
  opacity: 1;
} */

/* transition 태그를 이용하여 모달창에 애니메이션 주기(모달창 열때)*/
.modalVisible-enter-from {
  /* 작명-enter-from { 애니메이션 동작 전 상태 } */
  opacity: 0;
}
.modalVisible-enter-active {
  /* 작명-enter-active { 애니메이션 동작 중 상태, 대부분 transition } */
  transition: all 1s;
}
.modalVisible-enter-to {
  /* 작명-enter-to { 애니메이션 동작 후 상태 } */
  opacity: 1;
}

/* 퇴장시 애니메이션 주기(모달창 닫을때) */
.modalVisible-leave-from {
  opacity: 1;
}
.modalVisible-leave-active {
  transition: all 1s;
}
.modalVisible-leave-to {
  opacity: 0;
}
</style>
