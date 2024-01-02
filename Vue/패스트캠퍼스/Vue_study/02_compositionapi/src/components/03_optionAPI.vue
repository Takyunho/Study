<template>
    <h1 @click="increase">
        {{ count }} / {{ doubleCount }}
    </h1>
    <h1 @click="changedMessage">
        {{ message }} / {{ reversedMessage }}
    </h1>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
            message: 'option api - Vue!'
        }
    },
    computed: {
        doubleCount() {
            return this.count * 2
        },
        reversedMessage() {
            return this.message.split('').reverse().join('');
        }
    },
    watch: {
        message(newValue, oldValue) {
            console.log(newValue);
            console.log(oldValue);
        }
    },
    created() {
        
    },
    mounted () {
        
    },
    methods: {
        increase() {
            this.count += 1;
        },
        changedMessage() {
            this.message = 'Good ?';
        }
    },
    
    
}
</script>

<style lang="scss" scoped></style>