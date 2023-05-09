<template>
    <h1>{{ msg }}</h1>
    <!-- 1. change 이벤트 -->
    <!-- change 이벤트는 입력하는 동안에는 값이 변경되지 않고, 엔터를 누르거나 탭키를 누르거나 input에서 포커스를 해제되면 즉, 입력이 완료되면 그 때 값이 반영됨 -->
    <input type="text" :value="msg" @change="msg = $event.target.value">
    
    <!-- 2. v-model.lazy -->
    <!-- v-model에서 change이벤트처럼 사용하려면 v-model뒤에 .lazy를 붙여준다. -->
    <input type="text" v-model.lazy="msg">

    <!-- 3. v-model.number -->
    <!-- v-model을 통해 data의 값이 변경되는 경우 데이터 타입이 string이 되어버린다. -->
    <!-- 데이터 타입을 숫자로 유지하고 싶으면 v-model의 뒤에 .number를 붙여야 한다. -->
    <input type="text" v-model.number="msg">

    <!-- 4. v-model.trim -->
    <!-- trim()이라는 메소드는 문자의 제일 앞과 뒤의 공백을 제거시켜주는 메소드인데,
    v-model.trim으로 간단하게 구현 가능하다. -->
    <input type="text" v-model.trim="msg2">
    
    <!-- 메소드 체이닝으로 연결도 가능! -->
    <input type="text" v-model.lazy.trim="msg2">
</template>

<script>
export default {
    data() {
        return {
            msg: 123,
            msg2: "hello world!",
        }
    },
    watch: {    // watch는 data의 값이 변경될 때마다 실행된다.
        msg() {
            console.log(this.msg);
            console.log(typeof this.msg);   // string
        },
        msg2() {
            // console.log(this.msg2.trim())   // trim()이라는 메소드는 문자의 제일 앞과 뒤의 공백을 제거시켜주는 메소드

            console.log(this.msg2)      // v-model.trim을 사용하는 경우 msg2의 값중에서 앞과 뒤의 공백만 제거하고 값은 변경되지 않았다고 판단하기 떄문에 콘솔이 출력되지 않는다.
        }
    },
}
</script>

<style lang="scss" scoped></style>