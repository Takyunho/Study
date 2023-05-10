<template>
    <div id="hello" ref="hello">
        Hi
    </div>
    <!-- ref : reference -->
    <!-- ref 속성을 통해 해당하는 요소를 참조할 수 있다. -->
    <!-- this.$refs로 참조한 요소를 사용할 수 있다. -->
    <!-- 자식 컴포넌트에서 값 가져오기 -->
    <RefsChild ref="child"></RefsChild>

    
</template>

<script>
import RefsChild from './22_refsChild.vue'

export default {
    created() {
        // const el = this.$refs.hello
        // console.log(el) // undefined
        //=> 주의 사항: 컴포넌트가 html 구조와 연결된 후(mounted된 후)에만 사용가능
        //=> 즉, created 라이프 사이클에서는 사용 불가능
    },
    mounted() {
        // const helloEl = document.querySelector('#hello')
        // console.log(helloEl)
        // console.log(helloEl.textContent)
        // ===
        const helloEl_ref = this.$refs.hello;
        console.log("hello el", helloEl_ref);

        const childEl = this.$refs.child;
        console.log("child", childEl)
        console.log("child el", childEl.$el)    // $el : 자식 컴포넌트의 최상위 요소가 하나인 경우의 그 요소
        console.log(childEl.$refs)  // $refs : 자식 컴포넌트의 하위 요소들의 정보가 나타남
        console.log(childEl.$refs.dd)
        console.log(childEl.$refs.dd.textContent)
    },
    components: {
        RefsChild
    }
}
</script>

<style lang="scss" scoped></style>