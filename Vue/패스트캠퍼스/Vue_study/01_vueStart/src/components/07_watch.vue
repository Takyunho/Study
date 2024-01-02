<template lang="">
    <h1 @click="changeMessage">{{ msg }}</h1>
    <h1>{{ reversedMessage }}</h1>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Hello?',
        }
    },
    computed: {
        reversedMessage() {
            return this.msg.split('').reverse().join('');
        }
    },
    //^ watch는 데이터의 변경사항을 감시하는 역할을 한다.
    watch: {
        msg(newVal, oldVal) {
            console.log(newVal, oldVal);    // 변경된 후의 데이터, 변경되기 전의 데이터
            //=> 파라미터를 하나만 받으면 변경된 후의 데이터만 받아온다.
            console.log(this.msg)   // 변경되고 난 후의 msg
        },
        
        //=> 계산된 속성의 변경사항도 감시할 수 있다.
        reversedMessage() {
            console.log(this.reversedMessage)   // 변경되고 난 후의 reversedMessage
        },
    },
    methods: {
        changeMessage() {
            this.msg = 'Good!';
        }
    }
}
</script>

<style lang="">

</style>