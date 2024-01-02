<template>
  <div>
    <!-- <Post :data="data[0]"/>
    <Post :data="data[1]"/>
    <Post :data="data[2]"/> -->
    <!-- 위의 코드 반복문으로 축약 -->
    <div v-if="step === 0">
    <!-- v-for과 v-if는 Vue3 버전부턴 한 곳에 못씀 -->
      <Post :data="data[i]" v-for="(a, i) in data" :key="i"/>
    </div>

    <!-- 필터선택페이지 -->
    <div v-if="step === 1">
      <div class="upload-image" :style="{ backgroundImage : `url(${url})`}"></div>
      <div class="filters">
        <div class="filter-1"></div>
        <div class="filter-1"></div>
        <div class="filter-1"></div>
        <div class="filter-1"></div>
        <div class="filter-1"></div>
      </div>
    </div>

    <!-- 글작성페이지 -->
    <div v-if="step === 2">
      <div class="upload-image" :style="{ backgroundImage : `url(${url})`}"></div>
      <div class="write">
        <textarea class="write-box">write!</textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "./Post.vue"; // Post.vue와 Comtainer.vue는 같은 경로에 있기 때문에 ./만 사용

export default {
  name: "Container",
  data() {
    return {};
  },
  components: {
    Post: Post,
  },
  props: {
    data: Array,
    step: Number,
    url: String,

  },
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: cornflowerblue;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
