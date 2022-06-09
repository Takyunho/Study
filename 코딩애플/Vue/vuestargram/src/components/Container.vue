<template>
  <div>
    <!-- <Post :data="data[0]"/>
    <Post :data="data[1]"/>
    <Post :data="data[2]"/> -->
    <!-- 위의 코드 반복문으로 축약 -->
    <Post :data="data[i]" v-for="(a, i) in data" :key="i"/>
  </div>
</template>

<script>
import Post from './Post.vue' // Post.vue와 Comtainer.vue는 같은 경로에 있기 때문에 ./만 사용

export default {
  name: 'Container',
  data(){
    return {
    }
  },
  components: {
    Post: Post,
  },
  props: {
    data: Array,
  }

}
  


</script>

<style>

</style>