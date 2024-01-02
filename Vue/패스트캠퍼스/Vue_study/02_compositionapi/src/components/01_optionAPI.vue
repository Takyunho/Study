<template>
    <h1 @click="increase">
        {{ count }} / {{ doubleCount }}
    </h1>
    <h1>
        {{ message }} / {{ reverseMessage }}
    </h1>
</template>

<script>
export default {
    name: 'OptionApi',
    data() {
        return {
            message: 'Hello Vue!',
            count: 0
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2;
        },
        reverseMessage() {
            return this.message.split('').reverse().join('');
        }
    },
    methods: {
        increase() {
            this.count++;
        }
    }

    
}
</script>

<style lang="scss" scoped></style>