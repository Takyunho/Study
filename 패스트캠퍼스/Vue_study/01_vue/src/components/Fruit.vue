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
        name: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    h1 {
        color: red !important;
    }

</style>