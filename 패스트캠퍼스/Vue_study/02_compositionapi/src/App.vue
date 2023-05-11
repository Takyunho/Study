<template>
  <!-- 일반 옵션api 사용 -->
  <OptionApi></OptionApi>
  <!-- 컴포넌트 api 사용 -->
  <CompositionApi></CompositionApi>

  <!-- 2. 반응형 데이터 -->
  <Responsive></Responsive>
</template>

<script>
// import OptionApi from './components/01_optionAPI.vue'
// import CompositionApi from './components/01_compositionAPI.vue'
import Responsive from './components/02_반응형데이터.vue'
import OptionApi from './components/03_optionAPI.vue'
import CompositionApi from './components/03_compositionAPI.vue'

export default {
  name: 'App',
  components: {
    OptionApi,
    CompositionApi,
    Responsive,
  }
}
</script>

<style lang="scss" scoped></style>
