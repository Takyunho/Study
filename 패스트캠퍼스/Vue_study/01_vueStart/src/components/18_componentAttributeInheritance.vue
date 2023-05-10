<template>
    <!-- 컴포넌트 속성 상속 -->
    <!-- 컴포넌트로부터 받아온 class 속성의 값이 반영된다. -->
    <!-- 만약에 div가 두개 즉, 루트 요소가 두개이면 반영이 되지 않는다. -->
    <div class="btn">
        <slot></slot>
    </div>

    <!-- $attrs 객체를 이용해서 부모 컴포넌트의 속성값을 '개별로 이용'할 수 있다. -->
    <h1 :class="$attrs.class" :style="$attrs.style">$attrs 이용하기</h1>

    <!-- 부모 컴포넌트의 속성을 '전부 사용'하고 싶으면 일일이 적을 필요없이 v-bind="$attrs"를 이용하면 된다. -->
    <h1 v-bind="$attrs">부모 컴포넌트의 속성값 전부 사용하기</h1>
</template>

<script>
export default {
    
    inheritAttrs: false,    // 부모 컴포넌트로부터 속성 상속 받지 않게하기

    created() { 
        console.log(this.$attrs)    // $attrs 객체를 이용해 부모 컴포넌트로부터 속성값 가져오기
    },

    // memo
    //* 루트 요소가 여러개인경우, inheritAttrs: false로 지정한 다음, $attrs 객체를 이용해서 부모 컴포넌트의 속성값을 내가 원하는 요소에 사용할 수 있다.
    //* 반대로 루트 요소가 한개이면 inheritAttrs 속성을 지정하지 않아도 자동으로 루트요소에 부모 컴포넌트의 속성이 반영된다.
    //* 부모 컴포넌트의 속성을 '전부 사용'하고 싶으면 일일이 적을 필요없이 v-bind="$attrs"를 이용하면 된다.
}
</script>

<style lang="scss" scoped>
    .btn {
        display: inline-block;
        padding: 6px 12px;
        margin: 4px;
        border-radius: 4px;
        background: gray;
        color: #fff;
        cursor: pointer;
    }
</style>