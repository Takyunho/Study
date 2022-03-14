<template>
  
  <nav class="menu">
    <a v-for="a in navMenu" :key="a"> {{ a }} </a>
  </nav>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h4>부동산 사이트 만들기</h4>
  <div class="content">
    <div class="content-title"> {{ products[0] }} </div>
    <div> {{ price[0] }}만원 </div>
    <button @click="increase">허위매물신고</button>
    <span>신고수 : {{신고수[0]}} </span>
  </div>
  <div class="content">
    <div class="content-title"> {{ products[1] }} </div>
    <div> {{ price[1] }} 만원 </div>
    <button @click="신고수[1]++">허위매물신고</button>
    <span>신고수 : {{ 신고수[1] }}</span>
  </div>
  <div class="content">
    <div class="content-title"> {{ products[2] }} </div>
    <div> {{ price[2] }} 만원 </div>
    <button @click="신고수[2]++">허위매물신고</button>
    <span>신고수 : {{ 신고수[2] }}</span>
  </div>
  <!-- <div class="content" v-for="(a,i) in products" :key="i">
    <div class="content-title"> {{ a }} </div>
    <div> {{ price[i] }}만원 </div>
  </div> -->
  
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      price : [50, 40, 70], 
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      navMenu : ['Home', 'Shop', 'MyPage'],
      신고수 : [0,0,0],
    }
  },
  // 함수는 여기에다가
  methods: {
    increase(){
      // this.데이터이름
      // 메소드 안에서 this는 메소드를 가지고 있는 오브젝트를 뜻한다.
      this.신고수[0]++;
    }
  },  // , 잊지말자
  components: {
    
  }
}
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

.content {
  margin-top: 20px;
  letter-spacing: 1px;
  padding: 5px;
}
.content-title {
  font-size: 20px;
  color: rgb(29, 29, 173);
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
