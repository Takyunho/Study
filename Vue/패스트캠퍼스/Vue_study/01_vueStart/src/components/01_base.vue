<template>
    <li>{{ name }}</li>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        name: String    // 이렇게 적으나 아래처럼 상세하게 적으나 똑같다.
        // name: {
        //     type: String,
        //     default: ''
        // }
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        color: red !important;
    }

</style>