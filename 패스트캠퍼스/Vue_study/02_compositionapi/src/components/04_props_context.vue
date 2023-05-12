<template>
    <div v-bind="$attrs" class="btn" @click="helloVue">
    <!-- <div v-bind="$attrs" class="btn" @click="helloVue" :style="{color: color}"> -->
        <slot></slot>
    </div>

    <!-- 참고) v-bind="$attrs" => 부모의 속성 전부 가져오기 -->
    <!-- 참고) 부모의 속성을 일부만 가져오는 경우, 콜론과 $attrs.가져올속성 -->
    <!-- ex. :style="$attrs.style" -->
</template>

<script>
import { onMounted } from 'vue'

export default {
    inheritAttrs: false,
    props: {
        color: {
            type: String,
            default: 'gray'
        },
    },
    emits: ['hello'],
    // mounted() {
    //     console.log(this.color)
    //     console.log(this.$attrs)
    // },
    // methods: {
    //     helloVue() {
    //         this.$emit('hello')
    //     }
    // },

    // composition api로 바꾸기 (props와 context를 사용)
    setup(props, context) {
        // creadted()와 같은 역할
        console.log(props)
        // console.log(props.color)
        // console.log(context)

        onMounted(() => {
            console.log(props.color)    //^ props에 등록된 color를 가져옴
            console.log(context.attrs)  //^ $attrs나 $emit은 context로부터 불러올 수 있음(그리고 $표시 안씀)
        })

        function helloVue() {
            const step = 0;
            context.emit('hello', step)   //^ $emit 대신 context.emit으로 사용
            // context.emit('hello', context.event)   //^ $event 대신 context.event로 사용
        }


        return {
            helloVue
        }


    }

}
</script>

<style lang="scss" scoped></style>