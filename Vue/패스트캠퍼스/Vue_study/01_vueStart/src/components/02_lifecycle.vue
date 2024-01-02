<template>
    <h1>{{ count }}</h1>
</template>
  
<script>
export default {
    data() {
        return {
            count: 2
        }
    },
    beforeCreate() {
        console.log("beforeCreate", this.count) // create 전에는 undefined
    },
    created() {
        console.log("Created", this.count)  // 2
    },
    beforeMount() {
        console.log("BeforeMount")
        console.log(document.querySelector("h1")) // 마운트 되기 전에는 null
    },
    mounted() {
        console.log("mounted")
        console.log(document.querySelector("h1")) // <h1>2</h1>
    }
}
</script>
  
<style></style>