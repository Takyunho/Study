<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h4>뿌동산</h4>
  <div class="margin">
    <div class="font-color"> {{ products[0] }} </div>
    <div> {{ price1 }}만원 </div>
  </div>
  <div class="margin">
    <div class="font-color"> {{ products[1] }} </div>
    <div> {{ price2 }} 만원 </div>
  </div>
  <div class="margin">
    <div class="font-color"> {{ products[2] }} </div>
    <div> {{ price3 }} 만원 </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
    return{
      price1 : 50,
      price2 : 40,
      price3 : 70,
      products : ['역삼동원룸', '천호동원룸', '마포구원룸'],
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
  margin-top: 60px;
}

.margin {
  margin-top: 20px;
  letter-spacing: 1px;
  padding: 5px;
}
.font-color {
  font-size: 20px;
  color: rgb(29, 29, 173);
}

</style>
