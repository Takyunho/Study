<template>
    <!-- 예제 1 -->
    <!-- 조건부 렌더링 (v-if, v-else-if, v-else) -->
    <button @click="handler"> Click me!</button>
    <h1 v-if="isShow">Hello ?!</h1>
    <h1 v-else-if="count > 3">Count > 3!</h1>
    <h1 v-else>Good~</h1>

    <!-- 예제 2 -->
    <!-- 조건부 렌더링을 통해 특정한 요소들을 Group으로 묶어서 보이거나 보이지 않게 할 때,
    최적화를 위해 일반요소대신에 template 요소를 사용할 수 있다. (보이지 않는 래퍼 역할) -->
    <!-- template 요소는 따로 렌더링 되지 않기 때문에 개발자 도구를 열어서 확인하더라도 나타나지 않는다. (div 같은 일반 요소는 나타남) => 공식문서 참조 -->
    <template v-if="isShow">
        <h1>Title</h1>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
    </template>
    <!-- 참고) 최상위 템플릿 요소에는 v-if를 사용할 수 없다. -->

    <!-- 예제 3 -->
    <!-- v-if를 사용하는 경우 false면 개발자 도구에서 주석 처리되어있는 것 처럼 나오고,
    v-show를 사용하면 요소는 렌더링이 되지만 display: none 속성을 통해 보이지 않는다. -->
    <!-- v-show는 <template> 엘리먼트를 지원하지 않으며 v-else와 상호작용하지 않는다. -->
    <button @click="handler2">Click ~~</button>
    <h1 v-show="isShow">Hello!!!!</h1>

    <!-- v-if는 "실제" 조건부 렌더링입니다. 왜냐하면 조건부 블록이 전환될 경우, 블록 내 이벤트 리스너와 자식 컴포넌트가 제대로 제거되거나 재생성되기 때문입니다.

    또한 v-if는 게으르므로(lazy), 초기 조건이 false면 아무 작업도 수행하지 않습니다. 조건부 블록은 조건이 true가 될 때까지 렌더링되지 않습니다.

    이에 비해 v-show는 훨씬 간단합니다. 엘리먼트는 CSS 기반으로 전환 되므로, 초기 조건과 관계없이 항상 렌더링 됩니다.

    일반적으로 v-if는 전환 비용이 더 높고, v-show는 초기 렌더링 비용이 더 높습니다. 따라서 매우 자주 전환해야 하는 경우 v-show를, 실행 중에 조건이 변경되지 않는 경우 v-if를 사용하는 것이 좋습니다. -->
    
    <!--! v-if로 일단 사용하고, 사용자가 많이 반복하는 구조라면 v-show로 바꾸면 될 듯 -->

</template>

<script>
export default {
    data() {
        return {
            isShow: false,
            count: 0
        }
    },

    methods: {
        handler() {
            this.isShow = !this.isShow;
            this.count += 1;
        },
        handler2() {

        }
    },

}
</script>

<style lang="scss" scoped>

</style>