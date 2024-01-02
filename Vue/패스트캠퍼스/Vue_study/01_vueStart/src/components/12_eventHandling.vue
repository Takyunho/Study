<template>
    <button @click="handler">
        Click 1
    </button>

    <button @click="handler2('Hi')">
        click 2
    </button>

    <button @click="handler3('인수로 넣은 값', $event)">
        click 3
    </button>

    <!-- 인라인 화살표 함수를 사용해서 네이티브 DOM 이벤트 객체에 접근할 수도 있다. -->
    <button @click="(event) => handler3('인수로 넣은 값!', event)">
        click 4
    </button>

    <!-- 하나의 이벤트에 여러개의 메소드를 연결시켜서 사용할 수도 있다! -->
    <!-- 이때 주의할 점은 쉼표로 연결하되 메소드에 소괄호를 붙여서 메소드를 실행 시켜야 한다. -->
    <button @click="handlerA(), handlerB()">
        click AB
    </button>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
    methods: {
            // 매개변수로 값이 들어오면 그 값을 출력하고, 그렇지 않으면 네이티브 DOM 이벤트 객체만 출력한다.
            handler(event) {
                console.log(event)
                console.log(event.target)
                console.log(event.target.textContent)
            },
            handler2(msg) {
                console.log(msg)
            },

            // 두번째 인수부분에 $event를 넣으면 첫번째 매개변수와 네이티브 DOM 이벤트 객체를 둘다 출력할 수 있다.
            handler3(msg, event) {
                console.log(msg)
                console.log(event)
                console.log(event.target.textContent)
            },

            handlerA() {
                console.log("A");
            },
            handlerB() {
                console.log("B");
            }
        },
    }
</script>

<style lang="scss" scoped>
    button {
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
    }
</style>