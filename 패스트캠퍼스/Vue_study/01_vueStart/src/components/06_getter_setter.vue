<template lang="">
    <button @click="add">ADD</button>
    <h1>{{ reversedMsg }}</h1> 
    <h1>{{ reversedMsg }}</h1> 
    <h1>{{ reversedMsg }}</h1> 
    <h1>{{ reversedMsg }}</h1> 
</template>

<script>
export default {
    data() {
        return {
            msg: "Hello Computed!"
        }
    },
    //^ 계산된 속성은 기본적으로 getter 전용입니다.
    //^ 계산된 속성에 새 값을 할당하려고 하면 런타임 에러가 발생합니다.
    //^ 드물게 "수정 가능한" 계산된 속성이 필요한 경우, getter와 setter를 모두 제공하여 속성을 만들 수 있습니다.
    computed: {
        //- computed는 기본적으로 값을 얻어내는 용도로 사용한다.
        // reversedMsg() {
        //     return this.msg.split("").reverse().join("");
        // },

        //- 그러나 setter를 지정해줄 수도 있다.
        reversedMsg: {
            // Getter / 값을 얻어내는 용도
            get() {
                return this.msg.split("").reverse().join("");
            },
            // Setter / 값을 할당하는 용도
            set(value) {
                console.log(value)  // getter로부터 읽어온 값
                this.msg = value;
            }
        }
    },
    methods: {
        add() {
            this.reversedMsg += '!?'
        }
    }


}
</script>

<style lang="">

</style>