<template>
  <nav class="navbar" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        Logo
      </router-link>
      <router-link to="/writelist" class="navbar-brand">
        글목록
      </router-link>
      <!-- <router-link to="/mypage" class="navbar-brand">
        MyPage
      </router-link> -->
      <h3 @click="$router.push('/mypage')">MyPage</h3>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>

  <!-- WriteList 컴포넌트 -->
  <!-- <WriteList :blogList="blogList"></WriteList> -->

  <!-- WriteList 라우팅해서 보여주기 -->
  <!-- 라우팅해서 보여주는 경우, 컴포넌트관련된 파일은 주석처리나 지워야함(import해온거, component에 등록해놓은거 등) -->
  <router-view :blogList="blogList"></router-view>
  <!-- MainHome이랑 WriteList 컴포넌트 둘다 라우팅됨 -->
</template>

<script>
// import WriteList from './components/WriteList.vue'
import writeData from './assets/writeData.js'


export default {
  name: 'App',
  data() {
    return {
      blogList: writeData,  // writeData = import해온거
    }
  },
  components: {
    // WriteList: WriteList,
  },
  mounted() {

  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.navbar {
  margin-bottom: 30px;
}
</style>
