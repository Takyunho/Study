<template>
    <!-- 이벤트 수식어 -->
    <!-- 1. 이벤트 핸들러에서 event객체를 통해 이벤트의 기본 동작 방지 -->
    <a href="https://naver.com" target="_blank" @click="handler"> Naver </a>

    <!-- 2. prevent -->
    <!-- 이벤트 수식어인 .prevent를 통해 리로드를 방지함(methods에서 이벤트 객체의 preventDefault를 호출한 결과와 동일) -->
    <a href="https://naver.com" target="_blank" @click.prevent="handler2"> Naver </a>

    <!-- 3. once -->
    <!-- once 수식어는 특정 이벤트가 발생했을 때 이벤트 핸들러를 '단 한번'만 실행시켜주는 수식어 -->
    <a href="https://naver.com" target="_blank" @click.once="handler2"> Once </a>

    <!-- 4. 수식어는 메소드체이닝을 통해 여러개를 붙여쓸 수도 있다. -->
    <a href="https://naver.com" target="_blank" @click.prevent.once="handler2"> Naver </a>

    <!-- 5. stop -->
    <!-- stop 수식어는 event.stopPropagation 과 동일한 기능을 한다. (이벤트 버블링 막기) -->
    <div class="parent" @click="handlerA">
        <div class="child" @click.stop="handlerB"></div>
    </div>

    <!-- 6. 이벤트 캡처링(event capturing) -->
    <!-- click 함수 실행시 이벤트 버블링으로 인해 handlerB가 실행된 후 handlerA가 실행되는데,
    부모요소에다가 capture 수식어를 지정하면 handlerA가 실행되고 handlerB가 실행되게 된다. -->
    <div class="parent" @click.capture="handlerA">
        <div class="child" @click="handlerB"></div>
    </div>
    <!-- 이벤트 캡처링 후 이벤트 버블링 방지하기 capture.stop-->
    <div class="parent" @click.capture.stop="handlerA">
        <div class="child" @click="handlerB"></div>
    </div>

    <!-- 7. self -->
    <!-- self 수식어가 붙어있으면 그 요소에 해당하는 부분만 이벤트가 발생하게 됨 -->
    <!-- 노란색 테두리 부분만 클릭해야 이벤트가 발생 -->
    <div class="parent" @click.self="handlerA">
        <div class="child"></div>
        <!-- <div class="child" @click="handlerB"></div> -->
    </div>

    <!-- 8. wheel 이벤트와 passive 이벤트 수식어 -->
    <div class="parent" @wheel.passive="scroll">
        <div class="scrollChild"></div>
    </div>

</template>

<script>
export default {
    data() {
        return {};
    },

    methods: {
        handler(event) {
            event.preventDefault(); // 이벤트의 기본 동작을 막는다.
            //=> Prevent 이벤트 수식어와 동일   
            console.log("ABC!");
        },
        handler2() {
            console.log("ABC!");
        },
        handlerA() {
            // console.log(event)
            // console.log(event.target);
            //=> self 이벤트 수식어와 동일
            // console.log(event.currentTarget)
            console.log("handlerA");
        },
        handlerB() {
            // 이벤트 버블링 막기
            // event.stopPropagation();    // Propagation : 전파
            //=> stop 이벤트 수식어와 동일

            console.log("handlerB");
        },
        scroll(event) {
            for (let i = 0; i < 10000; i++) {
                console.log(event);
            }
        }
    },
};
</script>

<style lang="scss" scoped>
a {
    // display: block;
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    background-color: #0db981;
    color: white;
    text-decoration: none;
    text-align: center;
    line-height: 100px;
    margin-bottom: 10px;
}

.parent {
    width: 200px;
    height: 100px;
    background-color: #f1c40f;
    margin: 10px;
    padding: 10px;
    overflow: scroll;
    .child {
        width: 100px;
        height: 100px;
        background-color: #e67e22;
    }
}
.scrollChild {
    width: 100px;
    height: 2000px;
    background-color: #e67e22;
}
</style>
