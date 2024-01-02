<template>
  <div v-for="(a, i) in oneroomData" :key="i" class="content">
    <img :src="a.image" class="room-img" />
    <h4 class="content-title">
      {{ oneroomData[i].title }}
    </h4>
    <button @click="$emit( 'ModalOnOff', i )" >자세히 보기</button>
    <div class="price">{{ oneroomData[i].price }}만원</div>
  
    <div class="recommend">
      <button @click="increase(i)" class="btn">
        추천❤️ <span> {{ goodCount[i] }} </span>
      </button>
      <div style="float: none; clear: both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardBox",
  props: {
    oneroomData: Array,
    ModalOnOff: Boolean,
  },
  data() {
    return {
      goodCount: [0, 0, 0, 0, 0, 0],
    }
  },
  methods: {
    increase(i) {
      // this.데이터이름
      // 메소드 안에서 this는 메소드를 가지고 있는 오브젝트를 뜻한다.
      this.goodCount[i]++;
    },
  },

}

</script>

<style>
  .room-img {
  width: 100%;
  margin-top: 30px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.btn {
  border: none;
  background: none;
  font-size: 20px;
}
.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
}
.close-btn:hover,
.btn:hover {
  cursor: pointer;
}

.content {
  width: 80%;
  display: block;
  margin: 20px auto 20px auto;
  letter-spacing: 1px;
  padding: 5px;
}
.content-title {
  font-size: 20px;
  color: rgb(29, 29, 173);
}

.recommend {
  display: block;
  float: left;
}
.price {
  float: right;
}

.menu {
  background: linear-gradient(#4a82b9, lightskyblue);
  padding: 16px;
}
.menu a {
  color: white;
  padding: 10px;
}
</style>