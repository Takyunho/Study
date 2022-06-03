<template>
  <div v-for="(a, i) in oneroomData" :key="i" class="content">
    <img :src="a.image" class="room-img" />
    <div
      class="content-title"
      @click="
        ModalOnOff = true;
        detailCount = i;
      "
    >
      {{ oneroomData[i].title }}
    </div>

    <div class="recommend">
      <button @click="increase(i)" class="btn">
        추천❤️ <span> {{ goodCount[i] }} </span>
      </button>
    </div>
    <div class="price">{{ oneroomData[i].price }}만원</div>
    <div style="float: none; clear: both"></div>
  </div>
</template>

<script>
export default {
  name: "CardBox",
  data() {
    return {

    }
  },
  props: {
    oneroomData: Array,
    goodCount: Array,
    increase: Function,
  },
  

}
</script>

<style>

</style>