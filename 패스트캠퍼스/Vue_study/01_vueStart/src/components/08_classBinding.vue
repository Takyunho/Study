<template>
    <!-- class binding -->

    <!-- 1. 인라인 방식 -->
    <!-- true일 때만 class가 연결됨 -->
    <h1 @click="activate" :class="{ active: isActive }"> 
        Hello? ({{ isActive }}) 
    </h1>

    <!-- 2. 데이터에 객체를 정의하고 그 객체를 사용할 수도 있다. -->
    <h1 @click="activate" :class="isActive2"> 
        Hello? ({{ isActive2 }}) 
    </h1>

    <!-- 3. 계산된 데이터 즉, computed 속성을 이용해서도 가능-->
    <h1 :class="isActive3"> 
        Hello? ({{ isActive3 }}) 
    </h1>

    <!-- 4. 배열로 바인딩도 가능하다. -->
    <div :class="[activeClass]">배열로 클래스 바인딩</div>
    <div :class="[activeClass, errorClass]">배열로 클래스 바인딩</div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
            isActive2: {
                active: false,
                'text-active': true
            },

            activeClass: 'active',
            errorClass: 'active2'
        }
    },

    computed: {
        isActive3() {
            return {
                active: !this.isActive,
                'text-active': true
            }
        }
    },

    methods: {
        activate() {
            this.isActive = !this.isActive;
            this.isActive2.active = !this.isActive2.active;
        },
    },
}
</script>

<style lang="scss" scoped>
.active {
    color: red;
    font-weight: bold;
}
.active2 {
    color: blue;
}
</style>