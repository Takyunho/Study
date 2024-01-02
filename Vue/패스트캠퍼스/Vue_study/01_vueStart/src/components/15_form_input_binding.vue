<template>
    <!-- 1. :value와 @input에 핸들러를 작성해서 양방향 데이터 바인딩하기 -->
    <h1>{{ msg }}</h1>
    <input type="text" :value="msg" @input="handler"/>

    <!-- 2. 메소드를 호출하는 방식이 아닌 인라인 방식을 통해 더 간단하게 구현 가능 -->
    <input type="text" :value="msg" @input="msg = $event.target.value"/>

    <!-- 3. 위의 구조를 vue에서는 v-model을 통해 간소화할 수 있음 -->
    <input type="text" v-model="msg">
    {{ checked }}
    <input type="checkbox" v-model="checked">
    <!-- v-model 사용시 주의 사항 -->
    <!-- 한글을 작성할 때 하나의 글자가 다 작성 되어야 반영되는 현상이 있음 -->
    <!-- 즉, 한박자 늦게 동작하게 됨 -->
    <!-- 따라서 기존의 인라인 방식으로 양방향 데이터 바인딩을 구현해야 함 -->
    {{ msg2 }}
    <input type="text" :value="msg2" @input="msg2 = $event.target.value">

</template>

<script>
export default {
    data() {
        return {
            msg: 'Hello!',
            checked: false,
            msg2: "한글은 :value와 @input을 이용해서 양방향 데이터 바인딩"
        }
    },
    methods: {
        handler(event) {
            console.log(event.target.value)
            this.msg = event.target.value
        }
    },
}
</script>

<style lang="scss" scoped></style>