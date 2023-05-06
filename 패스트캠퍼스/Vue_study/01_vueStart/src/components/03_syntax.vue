<template>
  <!------------------- 이중 중괄호(Mustaches) ------------------>
  <!-- 데이터 바인딩의 가장 기본적인 형태 -->
  <!-- 이중 중괄호를 사용한 부분이 컴포넌트 인스턴스의 msg 속성의 값(data에서 리턴한 부분)으로 대체된다. -->
  <h1 @click="add">
    {{ msg }}
  </h1>

  <!------------------------- 디렉티브 ------------------------->
  <!-- 디렉티브란 v- 접두사를 가진 특수 속성으로, 렌더링된 DOM에 특별한 반응적 동작을 적용한다. -->

  <!---------------------- v-once 디렉티브 --------------------->
  <!-- v-once 디렉티브는 html의 속성처럼 사용하면 된다. -->
  <!-- v-once 디렉티브를 사용하면 데이터는 단 한번만 렌더링되고 그 이후에는 데이터가 바뀌어도 렌더링 되지 않는다. 즉, v-once를 사용한 요소는 반응성을 가지지 않는다. -->
  <h1 v-once @click="add">
    {{ msg }}
  </h1>

  <!---------------------- v-html 디렉티브 --------------------->
  <!-- 이중 중괄호(Mustaches)는 데이터를 html이 아니라 text 취급한다.
    따라서 실제 HTML을 출력하려면 v-html 디렉티브를 사용해야한다. -->
  <h2 v-html="msg2"></h2>


  <!---------------------- v-bind 디렉티브 --------------------->
  <!-- v-bind는 약어를 사용할 수 있다. :만 적어주면 된다. -->
  <!-- <h3 v-bind:class="active"> -->
  <h3 :class="active">
    {{ vBindMsg }}
  </h3>

  <!-- 데이터에서 가져올 필요없이 작은 따옴표로 감싸면 선택자를 텍스트 취급 가능 -->
  <h3 :class="'active2'">
    {{ vBindMsg }}
  </h3>

  <!---------------------- 동적전달 인자 :[속성이름] --------------------->
  <!-- 실제 데이터의 이름을 가지고 속성으로 대체해서 사용할 수도 있다. -->
  <h3 :[attr]="active">
    {{ msg3 }}
  </h3>

  <!-- 속성뿐만 아니라 함수도 가능! -->
  <h3 :[attr]="active" @[event]="add">
    {{ msg4 }}
  </h3>
</template>
  
<script>
export default {
  data() {
    return {
      msg: "hi hello!",
      msg2: '<div style="color: red;">v-html로 넣기!</div>', // string 처리해야함

      vBindMsg: "v-bind의 약어는 :래요",
      active: "active",

      attr: 'class',
      msg3: ":[]로 클래스 동적으로 넣기",

      event: 'click',
      msg4: "동적 전달인자로 함수도 동적으로 넣자!"
    }
  },

  methods: {
    add() {
      this.msg += "!"
    }
  },

}
</script>
  
<style lang="scss" scoped>
.active {
  color: royalblue;
}

.active2 {
  color: red;
}
</style>