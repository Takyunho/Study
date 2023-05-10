<template>
    <!-- 컴포넌트 - slot -->
    <!-- 부모 컴포넌트에서 자식 컴포넌트를 사용하는 경우, 
    컴포넌트의 사이에 값이 있으면 그 값이 화면에 출력되고, 
    값이 없으면 자식 컴포넌트에서 slot태그에 기재한 값이 화면에 출력된다. -->
    <!-- 참고) slot 태그의 내용을 Fallback contents(대체 내용) 라고 부른다. -->
    <div class="btn" >
        <slot>slot default값</slot>
    </div>
    <!-- name 속성을 이용해서 slot의 위치를 지정할 수 있다. -->
    <slot name="header">header</slot>
    <slot name="footer">footer</slot>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn {
    display: inline-block;
    padding: 10px 20px;
    margin: 5px;
    border: 2px solid #33A06F;
    border-radius: 5px;
    background: none;
    color: #33A06F;
    font-weight: bold;
    cursor: pointer;
}
</style>