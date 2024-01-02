<template>
    <!-- 1. 루트 요소가 두개면 $emit을 이용해서 부모 컴포넌트의 이벤트를 사용할 수 있다. -->
    <!-- @이벤트="$emit('부모컴포넌트에 등록된 이벤트 이름(emits에 등록된 이름)')" -->
    <div class="btn" @dblclick="$emit('doubleClick')">
        <slot></slot>
    </div>
    <h1 @click="$emit('yunho')">루트 요소가 하나 더</h1>

    <!-- 2. $emit('가져온이름', $event) 즉, 두번째 인수로 $event를 넣으면 event 객체를 부모컴포넌트로 보낼 수 있다. (123을 넣으면 123이 전달됨) -->
    <button class="btn" @click="$emit('getEvent', $event)">이벤트 전달!</button>
    <button class="btn" @click="$emit('getEvent', 123)">일반 데이터 전달!</button>

    <!-- 3. watch를 이용해 msg 데이터가 변경될때마다 부모 컴포넌트로 msg 전달하기 -->
    <input type="text" v-model="msg">

    <!-- memo -->
    <!-- html 내에서 이벤트에 $emit을 사용하는 경우에는 this를 붙이지 않고, -->
    <!-- script 내에서 $emit을 사용하는 경우에는 this를 붙인다. -->
</template>

<script>
export default {
    // 부모 컴포넌트의 '이벤트'를 emits 에 등록한다.
    emits: [
        // 'click',
        'yunho',
        'doubleClick',
        'getEvent',
        'changedMsg'
    ],
    data() {
        return {
            msg: ''
        }
    },
    watch: {
        // msg라는 데이터를 감시한다.
        msg() {
            //^ msg 데이터가 변경될때마다 부모 컴포넌트로 msg 데이터를 전달한다.
            this.$emit('changedMsg', this.msg)  // $emit앞에 this를 붙이고, (이벤트이름, 보낼 데이터)를 넣는다.
        }
    }

}
</script>

<style lang="scss" scoped>
.btn {
    display: inline-block;
    padding: 10px 20px;
    margin: 5px;
    border: 2px solid #33A06F;
    border-radius: 5px;
    background: none;
    color: #33A06F;
    font-weight: bold;
    cursor: pointer;
}
</style>