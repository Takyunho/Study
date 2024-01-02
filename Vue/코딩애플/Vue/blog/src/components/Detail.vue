<template>
  <!-- Detail Page -->
  <div>
    <h3>detail page</h3>
    <!-- 접속한 url의 파라미터를 박아 넣으면 된다. -->
    <h4>{{ blogList[$route.params.parameter].title }}</h4>
    <p>{{ blogList[$route.params.parameter].date }}</p>
    <p>{{ blogList[$route.params.parameter].content }}</p>
    <!--! $route는 현재경로 / $router는 페이지 이동관련 기능 -->
    <router-view></router-view>

  </div>

</template>

<script>
export default {
  name: 'Detail',
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

</style>