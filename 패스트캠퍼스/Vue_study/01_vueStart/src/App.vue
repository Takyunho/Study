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
  <!-- <StyleBinding></StyleBinding> -->

  <!-- 10 조건부 렌더링 (Conditional Rendering) -->
  <!-- <Conditional></Conditional> -->

  <!-- 11 리스트 렌더링 (ListRendering) -->
  <!-- <List></List> -->

  <!-- 12 이벤트 핸들링 (event handling) -->
  <!-- <EventHandling></EventHandling> -->

  <!-- 13 이벤트 수식어 (event modifier) -->
  <EventModifier></EventModifier>
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
// import StyleBinding from './components/09_styleBinding.vue';
// import Conditional from './components/10_conditionalRendering';
// import List from './components/11_listRendering';
// import EventHandling from './components/12_eventHandling'
import EventModifier from './components/13_eventModifier'

export default {
  components: {
    // Base,
    // LifeCycle,
    // Syntax,
    // Computed,
    // ComputedCaching,
    // GetterAndSetter,
    // WatchComponent,
    // ClassBinding,
    // StyleBinding,
    // Conditional,
    // List,
    // EventHandling,
    EventModifier,
  },

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
  
}
</script>

<style lang="scss" scoped>
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
