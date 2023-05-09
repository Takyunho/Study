<template>
    <!-- component는 재활용이 가능 -->
    <div class="btn" :style="setBackground" :class="{large: large}">
        Apple {{ likes }} {{ textMsg }}
        <!-- 컴포넌트 사이에 들어갈 내용을 slot이라는 태그로 위치를 정해주는 것 -->
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        // props를 등록할 때는 CamelCase로 등록
        // default를 지정해줄때는 아래처럼
        bgColor: {
            type: String,
            default: 'none'
        },
        // default를 지정하지 않을때는 아래처럼
        fontColor: String,
        textMsg: String,
        likes: Number,
        large: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            // 스타일을 바인딩하기 위한 객체데이터 정의
            setBackground: {
                backgroundColor: this.bgColor,
                color: this.fontColor
            }
        }
    },

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
    &.large {   // .btn.large
        font-size: 20px;
        padding: 20px 40px;
    }
}
</style>