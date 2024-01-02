<template>
  <!-- 글목록(WriteList) 페이지 -->
  <div class="list-container">
    
    <div v-for="(list, i) in blogList.length" :key="i">
      <h4 class="list-title" @click="$router.push('/detail/' + i)">{{ blogList[i].title }}</h4>
      <!--! $route는 현재경로 / $router는 페이지 이동관련 기능 -->
      <!-- $router.go(1) = 앞으로가기 -->
      <!-- $router.go(-1) = 뒤로가기 -->
      <p>{{ blogList[i].date }}</p>
    </div>

  </div>
  
</template>

<script>


export default {
  name: 'WriteList',
  data() {
    return {

    }
  },
  props: {
    blogList: Array,

  },
}
</script>

<style>
  .list-container {
    margin-top: 30px;
  }
  .list-title {
    cursor: pointer;
  }


</style>