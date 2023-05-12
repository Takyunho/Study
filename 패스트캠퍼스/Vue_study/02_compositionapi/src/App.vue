<template>
  <!-- 일반 옵션api 사용 -->
  <!-- <OptionApi></OptionApi> -->
  <!-- 컴포넌트 api 사용 -->
  <!-- <CompositionApi></CompositionApi> -->

  <!-- 2. 반응형 데이터 -->
  <!-- <Responsive></Responsive> -->

  <!-- 3. props and context -->
  <!-- 참고) color="#ff0" 에서 color는 props로 보낼 데이터임 -->
  <!-- hello는 자식 컴포넌트에서 $emit으로 전달받은 것 -->
  <PropsAndContext class="yun" style="color: red;" color="#ff0" @hello="log">
    Apple
  </PropsAndContext>
</template>

<script>
// import OptionApi from './components/01_optionAPI.vue'
// import CompositionApi from './components/01_compositionAPI.vue'
// import Responsive from './components/02_반응형데이터.vue'
// import OptionApi from './components/03_optionAPI.vue'
// import CompositionApi from './components/03_compositionAPI.vue'
import PropsAndContext from './components/04_props_context.vue'

export default {
  name: 'App',
  components: {
    // OptionApi,
    // CompositionApi,
    // Responsive,
    PropsAndContext
  },
  methods: {
    log(step) {
      console.log(step)
      // console.log(event)
      console.log('hello vue!')
    }
  },
}
</script>

<style lang="scss" scoped></style>
