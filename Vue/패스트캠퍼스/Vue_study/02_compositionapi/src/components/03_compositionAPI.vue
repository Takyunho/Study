<template>
    <h1 @click="increase">
        {{ count }} / {{ doubleCount }}
    </h1>
    <h1 @click="changedMessage">
        {{ message }} / {{ reversedMessage }}
    </h1>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
//=> 라이프사이클 훅에 접두사 "on"을 추가함으로서 컴포넌트의 라이프 사이클 훅에 접근할 수 있다.
//=> lifeCycle을 가져오는 경우 앞에 on이 붙고 그 다음 단어는 대문자로 시작한다.(다만, created는 없음!)

export default {
    //=> setup이라는 메소드는 컴포넌트가 생성된 직후에 동작하기 때문에 setup 메소드 내부의 로직은 created 라이프 사이클 훅에 작성하는 것과 동일하다.
    setup() {
        // count
        const count = ref(0)
        const doubleCount = computed(() => {
            return count.value * 2
        })
        function increase() {
            count.value += 1;
        }

        // message
        const message = ref('composition api - Vue!')
        const reversedMessage = computed(() => {
            return message.value.split('').reverse().join('');
        })
        // watch(감시할데이터, 콜백함수)
        watch(message, (newValue, oldValue) => {    // 첫번째 매개변수에 감시하고싶은데이터가 들어감(.value 안붙임!)
            console.log(newValue)
            console.log(oldValue)
        })
        function changedMessage() {
            message.value = 'Good ?';
        }

        // setup()에서 작성하는 것은 created()와 동일함
        console.log(message.value)

        // mounted(콜백함수)
        onMounted(() => {
            console.log(message.value)
        })

        return {
            count,
            doubleCount,
            increase,
            message,
            reversedMessage,
            changedMessage
        }

    }
}
</script>

<style lang="scss" scoped></style>