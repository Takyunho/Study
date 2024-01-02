<template>
    <!-- style binding -->
    <!-- 스타일을 동적으로 관리할 수 있다. -->
    <h1 
        :style="{ color: color, fontSize: fontSize }" 
        @click="changeStyle">
        style binding
    </h1>
    
    <!-- data에 객체 데이터로 스타일을 설정하고, 그걸 가져와서 사용할 수도 있음 -->
    <!-- 템플릿이 더 깔끔해지도록 스타일 객체를 직접 바인딩하는 것이 좋은 방법 -->
    <h1 
        :style="fontStyle" 
        @click="changeStyle2">
        style binding
    </h1>

    <!-- 여러개의 스타일을 적용하기 위해서는 배열을 이용한다. -->
    <h1 
        :style="[fontStyle, backgroundStyle]" 
        @click="changeStyle2">
        style binding
    </h1>
</template>

<script>
export default {
    data() {
        return {
            color: 'gold',
            fontSize: '50px',
            fontStyle: {
                color: 'blue',
                fontSize: '40px',
            },
            backgroundStyle: {
                backgroundColor: 'black',
            }
        }
    },

    methods: {
        changeStyle() {
            this.color = 'red';
            this.fontSize = '30px';
        },
        changeStyle2() {
            this.fontStyle.color = 'orange';
            this.fontStyle.fontSize = '20px';
        }
    },


}
</script>

<style lang="scss" scoped></style>