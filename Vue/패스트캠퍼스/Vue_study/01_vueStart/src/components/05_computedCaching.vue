<template lang="">
    <section> 
        <h1>{{ reverseMsg() }}</h1> 
        <h1>{{ reverseMsg() }}</h1> 
        <h1>{{ reverseMsg() }}</h1> 
        <h1>{{ reverseMsg() }}</h1> 
    </section> 
    
    <section style="margin-top: 50px;">
        <h1>{{ reversedMsg }}</h1> 
        <h1>{{ reversedMsg }}</h1> 
        <h1>{{ reversedMsg }}</h1> 
        <h1>{{ reversedMsg }}</h1> 
    </section> 
    <!-- 메소드를 4번 실행하는 경우에는 로직이 4번 실행되어 부담을 줄 수 있지만, 
    computed는 캐싱기능이 있기 때문에 계산하는데 들어간 로직에 부담을 주지 않는다. -->
</template>

<script>
export default {
  data() {
    return {
      msg: "Computed!",
    };
  },
  computed: {
    reversedMsg() {
      return this.msg.split("").reverse().join("");
    },
  },
  methods: {
    reverseMsg() {
      return this.msg.split("").reverse().join("");
    },
  },
};


</script>

<style lang=""></style>
