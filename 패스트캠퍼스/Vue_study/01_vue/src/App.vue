<template>
  <h1>{{ count }}</h1>
  <button @click="increase">버튼</button>

  <p v-if="count > 4">4보다 큽니다!</p>

  <ul>
    <Fruit v-for="fruit in fruits" :key="fruit" :name="fruit"></Fruit>
  </ul>
</template>

<script>
//! 선언적 렌더링과 입력 핸들링 + 조건문,반복문

//^ component는
// 1. 가져오고 (import)
// 2. 등록하고 (components: { })
// 3. 쓴다. (<Fruit></Fruit> 처럼)

//^ props는
// 1. 부모컴포넌트에서 보내고 (:데이터이름="data안의 데이터")
// 2. 자식컴포넌트에서 받고 (props: { 데이터이름: String })
// 3. 쓴다. ({{ 데이터이름 }})

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
