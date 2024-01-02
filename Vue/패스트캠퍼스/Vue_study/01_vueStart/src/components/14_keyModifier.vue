<template>
    <!-- 키 수식어 -->
    <input type="text" @keydown="handler" />
    <!-- enter를 눌렀을 때 handler 함수가 실행됨 -->
    <input type="text" @keydown.enter="handler2" />
    <!-- enter뿐만 아니라 다른 키도 가능 -->
    <input type="text" @keydown.a="handler3" />
    <!-- 메소드 체이닝을 통해서 키 + 키 가능 (즉, 키의 조합이 가능하다!) -->
    <input type="text" @keydown.ctrl.a="handler4" />

    <!-- 자세한 사항은 공식문서 참고 -->
</template>

<script>
export default {
    methods: {
        handler(e) {
            console.log(e)
            if (e.key === 'Enter') {
                console.log('Enter!!')
            }
        },
        handler2() {
            console.log('keydown.enter로 엔터가 입력됨!')
        },
        handler3() {
            console.log('keydown.a로 a가 입력됨!')
        },
        handler4() {
            console.log('ctrl + a!!!')
        }
    },
}
</script>

<style lang="scss" scoped></style>