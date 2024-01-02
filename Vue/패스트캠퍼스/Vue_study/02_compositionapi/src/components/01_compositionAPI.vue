<template>
     <h1 @click="increase">
        {{ count }} / {{ doubleCount }}
    </h1>
    <h1>
        {{ message }} / {{ reverseMessage }}
    </h1>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    setup() {
        // message에 관한 내용
        const message = ref('Hello Vue!');
        const reverseMessage = computed(() => {
            return message.value.split('').reverse().join('');
        })

        // count에 관한 내용
        const count = ref(0);
        const doubleCount = computed(() => {
            return count.value * 2;
        })
        function increase() {
            count.value++;
        }

        // return
        return {
            message,
            reverseMessage,
            count,
            doubleCount,
            increase
        }

    }
}
</script>

<style lang="scss" scoped></style>