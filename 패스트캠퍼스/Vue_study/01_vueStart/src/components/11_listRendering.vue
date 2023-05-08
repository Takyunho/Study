<template>
    <!-- 1. 일반 v-for 디렉티브를 통해 반복출력 (index도 뽑아서 쓸 수 있다.) -->
    <!-- 고유하게 구분할 수 있는 key 값이 필요하다. -->
    <ul>
        <li v-for="(fruit, index) in fruits" :key="fruit">
            {{ index + 1 }}. {{ fruit }}
        </li>
    </ul>

    <!-- 2. 계산된 속성을 통해 만들어진 새로운 배열을 v-for 디렉티브를 통해 반복해서 출력 -->
    <ul>
        <li v-for="newFruit in newFruits" :key="newFruit.id">
            {{ newFruit.id }}-{{ newFruit.name }}
        </li>
    </ul>

    <!-- 3. 객체구조분해 문법을 활용할 수도 있다. -->
    <!-- 객체구조분해 문법을 통해 newFruit.id 이런식이 아닌, 바로 id, name을 사용할 수 있다. -->
    <ul>
        <li v-for="{id, name} in newFruits" :key="id">
            {{ id }} - {{ name }}   
        </li>
    </ul>
    <button @click="handler">Click me!</button>
</template>

<script>
//^ 각각의 id를 고유하게 만들어줄 수 있는 shortid 패키지를 설치해서 사용하면 좋음
// npm i -D shortid (개발 의존성으로 설치)
import shortid from 'shortid';

export default {
    data() {
        return {
            fruits: ['Apple', 'Orange', 'Banana'],
        }
    },
    computed: {
        newFruits() {
            // return this.fruits.map((fruit, index) => {
            //     // console.log(fruit)
            //     // console.log(index)
            //     return {
            //         id: index,
            //         name: fruit
            //     }
            // })
            return this.fruits.map(fruit => ({
                    id: shortid.generate(), // shortid 패키지를 사용해서 고유한 id를 만들어줌
                    name: fruit
                })
            )

        }
        // return 결과
        // newFruits: [
            // { id: 0, name: 'Apple' },
            // { id: 1, name: 'Orange' },
            // { id: 2, name: 'Banana' }
        // ]
    },

    methods: {
        handler() {
            this.fruits.push("Cherry")
            // 수정 메서드는 이름에서 알 수 있듯이 호출된 원래 배열을 수정합니다. 이에 비해 수정이 아닌 방법도 있습니다. filter(), concat() 및 slice()는 원본 배열을 수정하지 않고 항상 새 배열을 반환합니다. 이러한 방법으로 작업하는 경우, 이전 배열을 새 배열로 교체해야 합니다.
            // ex
            // this.fruits = this.fruits.filter( (item) => item.message.match(/Foo/))
            //=> 이로 인해 Vue가 기존 DOM을 버리고 전체 리스트를 다시 렌더링할 것이라고 생각할 수도 있습니다. 다행히도 그렇지 않습니다. Vue는 DOM 엘리먼트 재사용을 최대화하기 위해 몇 가지 스마트 휴리스틱을 구현하므로, 이전 배열을 다른 배열로 바꾸는 과정에서 서로 중복되는 객체를 가지는 부분을 매우 효율적으로 처리합니다.
            // 즉, Vue는 돔 전체를 버리고 전체를 다시 렌더링 하는게 아니라 효율적으로 처리한다고 함.
        }
    },
}
</script>

<style lang="scss" scoped>

</style>