<template>
  <nav class="navbar" style="background-color: #e3f2fd;">
    <div class="container-fluid">
      <a class="navbar-brand">Navbar</a>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </nav>

  <!-- ListPost 컴포넌트 -->
  <WriteList :blogList="blogList"></WriteList>

</template>

<script>
import WriteList from './components/WriteList.vue'
import writeData from './assets/writeData.js'


export default {
  name: 'App',
  data() {
    return {
      blogList: writeData,  // writeData = import해온거
    }
  },
  components: {
    WriteList: WriteList,
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
</style>
