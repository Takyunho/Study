<template>
    <div @click="increase">
        {{ count }}
    </div>
</template>

<script>
//=> composition api를 사용할 때는 반응성을 가질 수 있도록 vue.js에서 제공하는 ref라는 속성을 사용해야 하므로, vue 패키지에서 import 해야 함
import { ref } from 'vue';

export default {
    // => option api
    // data() {
    //     return {
    //         count: 0,
    //     }
    // },
    // methods: {
    //     increase() {
    //         this.count += 1;
    //     }
    // },

    // option api로 작성된 내용을 composition api로 변경하기
    // => composition api
    
    setup() {
        // let count = 0;       //- setup 메소드에서 정의한 기본적인 변수는 반응성을 가지지 않는다.
        let count = ref(0);     //- 반응성을 가질 수 있는 객체데이터가 count에 할당됨
        console.log(count)  

        function increase() {
            count.value += 1;         //- ref로 인해 할당된 객체 데이터에서 value를 뽑아써야함
        }

        return {
            count,
            increase
        }
    },

    watch: {
        count() {
            console.log(this.count)
        }
    }
}
</script>

<style lang="scss" scoped></style>