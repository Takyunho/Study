<template>
  <!-- 일반 옵션api 사용 -->
  <OptionApi></OptionApi>
  <!-- 컴포넌트 api 사용 -->
  <CompositionApi></CompositionApi>
</template>

<script>
import OptionApi from './components/01_optionAPI.vue'
import CompositionApi from './components/01_compositionAPI.vue'

export default {
  name: 'App',
  components: {
    OptionApi,
    CompositionApi
  }
}
</script>

<style lang="scss" scoped></style>
