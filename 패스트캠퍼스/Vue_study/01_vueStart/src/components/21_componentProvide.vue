<template>
    <!-- App.vue 파일에서 가져온 msg 데이터를 자식 컴포넌트로 한번 더 전달할 때 props를 이용하지만
    provide를 이용하면 props를 전달할 필요가 없음 -->
    <!-- <ComponentInject :msg="msg"></ComponentInject> -->
    <ComponentInject></ComponentInject>
</template>

<script>
import ComponentInject from './21_componentInject.vue'

export default {
    //=> App.vue 파일에서 가져온 msg 데이터를 자식 컴포넌트로 보내기 위해 props에 등록해야하지만,
    //=> provide를 사용하는 경우에는 등록해줄 필요가 없음
    // props: {
    //     msg: {
    //         type: String,
    //         default: ''
    //     },
    // },

    components: {
        ComponentInject,
    },
}
</script>
