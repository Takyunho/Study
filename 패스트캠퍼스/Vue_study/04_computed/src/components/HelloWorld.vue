<template>
  <!-- <section v-if="fruits.length > 0"> -->
  <section v-if="hasFruit">
    <h1>과일</h1>
    <ul>
      <li v-for="fruit in fruits" :key="fruit"> {{ fruit }}</li>
    </ul>
  </section>

  <section>
    <h1>과일 이름 뒤집기(computed 사용)</h1>
    <ul>
      <li v-for="fruit in reverseFruit" :key="fruit">{{ fruit }}</li>
    </ul>
  </section>

</template>

<script>
export default {
  data() {
    return {
      fruits: ['사과', '바나나', '딸기', '포도', '오렌지']
    }
  },
  // computed
  // 계산된 데이터 사용하기
  // 기존의 데이터를 원하는 방향으로 수정해서 사용할 때 쓴다.
  computed: {
    hasFruit() {
      return this.fruits.length > 0
    },
    reverseFruit() {
      const reverseFruits = this.fruits.map(item => {  // map은 배열의 각 요소를 변환
        console.log(item)
        return item.split('').reverse().join('');
        // split은 문자열을 잘라서 배열로 변환, reverse는 배열을 역순으로 변환, join은 배열을 합쳐서 문자열로 변환
        // '사과' -> ['사', '과'] -> ['과', '사'] -> '과사'

      })
      console.log(reverseFruits)
      return reverseFruits;
    }
  }

}
</script>

<style lang="scss" scoped></style>