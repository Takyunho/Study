<template>
    <h1>{{ msg }}</h1>
    <!-- 1. change 이벤트 -->
    <!-- change 이벤트는 입력하는 동안에는 값이 변경되지 않고, 엔터를 누르거나 탭키를 누르거나 input에서 포커스를 해제되면 즉, 입력이 완료되면 그 때 값이 반영됨 -->
    <input type="text" :value="msg" @change="msg = $event.target.value">
    
    <!-- 2. v-model.lazy -->
    <!-- v-model에서 change이벤트처럼 사용하려면 v-model뒤에 .lazy를 붙여준다. -->
    <input type="text" v-model.lazy="msg">

    <!-- 3. v-model.number -->
    <!-- v-model을 통해 data의 값이 변경되는 경우 데이터 타입이 string이 되어버린다. -->
    <!-- 데이터 타입을 숫자로 유지하고 싶으면 v-model의 뒤에 .number를 붙여야 한다. -->
    <input type="text" v-model.number="msg">

    <!-- 4. v-model.trim -->
    <!-- trim()이라는 메소드는 문자의 제일 앞과 뒤의 공백을 제거시켜주는 메소드인데,
    v-model.trim으로 간단하게 구현 가능하다. -->
    <input type="text" v-model.trim="msg2">

    <!-- 메소드 체이닝으로 연결도 가능! -->
    <input type="text" v-model.lazy.trim="msg2">

    <!-- 5. radio 버튼 -->
    <!-- radio 버튼을 사용할 때는 v-model="picked" 사용 -->
    <!-- data에서 picked를 정의해야되는데, 값은 빈 문자열이여도 상관없다. -->
    <input type="radio" value="1" v-model="picked" />
    <label for="one">하나</label>
    <input type="radio" value="2" v-model="picked" />
    <label for="two">둘</label>

    <!-- 6. checkbox 버튼 -->
    <!-- 체크박스는 checked값에 불리언타입 데이터를 사용 -->
    <!-- 예를들어 `toggle`은 true 또는 false -->
    <div> {{ toggle }}</div>
    <input type="checkbox" v-model="toggle" />

    <!-- true-value 및 false-value 속성은 v-model을 사용하는 경우에만 작동하는 Vue 전용 속성 -->
    <!-- toggle 속성의 값은 체크박스가 선택되면 네로 설정되고 선택되지 않을 때는 아니오로 설정된다. -->
    <input
        type="checkbox"
        v-model="toggle"
        :true-value="dynamicTrueValue"
        :false-value="dynamicFalseValue" />


    <!-- 7. textarea -->
    <!-- textarea를 사용할 때는 이중 중괄호 X / v-model 사용 필요 -->
    <!-- <textarea>{{ msg }}</textarea> -->
    <textarea v-model="msg"></textarea>

    <!-- 8. selected -->
    <div>선택됨: {{ selected }}</div>

    <select v-model="selected">
        <option disabled value="">다음 중 하나를 선택하세요</option> <!--disabled 속성을 설정하면 select 못함-->
        <option>가</option>
        <option>나</option>
        <option>다</option>
    </select>

</template>

<script>
export default {
    data() {
        return {
            msg: 123,
            msg2: "hello world!",
            picked: '',
            toggle: false,
            dynamicTrueValue: '네',
            dynamicFalseValue: '아니오',
            selected: '',

        }
    },
    watch: {    // watch는 data의 값이 변경될 때마다 실행된다.
        msg() {
            console.log(this.msg);
            console.log(typeof this.msg);   // string
        },
        msg2() {
            // console.log(this.msg2.trim())   // trim()이라는 메소드는 문자의 제일 앞과 뒤의 공백을 제거시켜주는 메소드

            console.log(this.msg2)      // v-model.trim을 사용하는 경우 msg2의 값중에서 앞과 뒤의 공백만 제거하고 값은 변경되지 않았다고 판단하기 떄문에 콘솔이 출력되지 않는다.
        },
        picked() {
            console.log(this.picked)
        },
        selected() {
            console.log(this.selected)
        }
    },
}
</script>

<style lang="scss" scoped></style>