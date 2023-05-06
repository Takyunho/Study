<template>
  <!-- 01 base -->
  <!-- <section>
    <h1>{{ count }}</h1>
    <button @click="increase">버튼</button>
    <p v-if="count > 4">4보다 큽니다!</p>
    <ul>
      <Base v-for="fruit in fruits" :key="fruit" :name="fruit"></Base>
    </ul>
  </section> -->
  
  <!-- 02 lifecycle -->
  <!-- <LifeCycle></LifeCycle> -->
  
  <!-- 03 template syntax -->
  <!-- <Syntax></Syntax> -->

  <!-- 04 computed -->
  <!-- <Computed></Computed> -->

  <!-- 05 ComputedCaching -->
  <!-- <ComputedCaching></ComputedCaching> -->

  <!-- 06 Getter And Setter-->
  <!-- <GetterAndSetter></GetterAndSetter> -->

  <!-- 07 Watch -->
  <!-- <WatchComponent></WatchComponent> -->

  <!-- 08 Class And StyleBinding -->
  <!-- <ClassBinding></ClassBinding> -->

  <!-- 09 StyleBinding -->
  <StyleBinding></StyleBinding>
</template>

<script>
//^ component는
// 1. 가져오고 (import)
// 2. 등록하고 (components: { })
// 3. 쓴다. (<Fruit></Fruit> 처럼)

//^ props는
// 1. 부모컴포넌트에서 보내고 (:데이터이름="data안의 데이터")
// 2. 자식컴포넌트에서 받고 (props: { 데이터이름: String })
// 3. 쓴다. ({{ 데이터이름 }})

// import Base from './components/01_base.vue';
// import LifeCycle from './components/02_lifecycle.vue';
// import Syntax from './components/03_syntax.vue';
// import Computed from './components/04_computed.vue';
// import ComputedCaching from './components/05_computedCaching.vue';
// import GetterAndSetter from './components/06_getter_setter.vue';
// import WatchComponent from './components/07_watch.vue';
// import ClassBinding from './components/08_classBinding.vue';
import StyleBinding from './components/09_styleBinding.vue';

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
    // Base,
    // LifeCycle,
    // Syntax,
    // Computed,
    // ComputedCaching,
    // GetterAndSetter,
    // WatchComponent,
    // ClassBinding,
    StyleBinding,
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
