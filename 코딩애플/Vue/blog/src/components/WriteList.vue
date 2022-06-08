<template>
  <!-- 글목록(WriteList) 페이지 -->
  <div class="list-container">
    <div v-for="(list, i) in blogList.length" :key="i">
      <h4>{{ blogList[i].title }}</h4>
      <p>{{ blogList[i].date }}</p>
    </div>
    <!-- <div>
      <h4>{{ blogList[1].title }}</h4>
      <p>{{ blogList[1].date }}</p>
    </div>
    <div>
      <h4>{{ blogList[2].title }}</h4>
      <p>{{ blogList[2].date }}</p>
    </div> -->
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
</style>