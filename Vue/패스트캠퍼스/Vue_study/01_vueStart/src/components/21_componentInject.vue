<template>
    <!-- <p> Child : {{ msg }} </p> -->
    <!-- provide에서 computed 속성을 거쳐 전달된 데이터는 .value로 뽑아 써야한다. -->
    <p> Child : {{ msg.value }} </p>
</template>

<script>
export default {
    //=> 부모 컴포넌트인 21번~~.vue 파일에서 가져온 msg 데이터를 props에 등록해야하지만, 
    //=> provide를 통해 받아온 데이터는 props에 등록하지 않고
    //^ Inject 옵션에 등록해서 사용
    // props: {
    //     msg: String,
    // }
    inject: [
        'msg'   // ''로 감싸야 함
    ]
}
</script>

<style lang="scss" scoped></style>