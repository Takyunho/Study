<template>
  <h1>{{ count }}</h1>
  <button @click="increase">버튼</button>

  <p v-if="count > 4">4보다 큽니다!</p>

  <ul>
    <Fruit v-for="fruit in fruits" :key="fruit" :name="fruit">
      {{ fruit }}
    </Fruit>
  </ul>
</template>

<script>

import Fruit from './components/Fruit.vue';

export default {
  // 데이터를 바꾸면 화면도 바뀐다 => 반응성(Reactivity)
  data() {
    return {
      count: 0,
      fruits: ["Apple", "Banana", "Cherry"],
    }
  },
  methods: {
    increase() {
      this.count += 1;
    }
  },
  components: {
    Fruit   
  }
}
</script>

<style lang="scss">
  h1 {
    font-size: 50px;
    color: rosybrown;
  }

ul {
  li {
    font-size: 30px;
  }
}

</style>
