<template>
  
  <nav class="menu">
    <a v-for="a in navMenu" :key="a"> {{ a }} </a>
  </nav>

  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <h4>부동산 사이트 만들기</h4>
  <!-- <div class="content">
    <div class="content-title"> {{ products[0] }} </div>
    <div> {{ price0 }}만원 </div>
  </div>
  <div class="content">
    <div class="content-title"> {{ products[1] }} </div>
    <div> {{ price1 }} 만원 </div>
  </div>
  <div class="content">
    <div class="content-title"> {{ products[2] }} </div>
    <div> {{ price2 }} 만원 </div>
  </div> -->
  <div class="content" v-for="(a,i) in products" :key="i">
    <div class="content-title"> {{ products[i] }} </div>
    <div> {{ price[i] }}만원 </div>
  </div>
  
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      price : [50, 40, 70], 
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
      navMenu : ['Home', 'Shop', 'MyPage'],

    }
  },
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
