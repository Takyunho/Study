<template>
  <!-- 01 base -->
  <!-- <section>
    <h1>{{ count }}</h1>
    <button @click="increase">버튼</button>
    <p v-if="count > 4">4보다 큽니다!</p>
    <ul>
      <Base v-for="fruit in fruits" :key="fruit" :name="fruit"></Base>
    </ul>
  </section> -->

  <!-- 02 lifecycle -->
  <!-- <LifeCycle></LifeCycle> -->

  <!-- 03 template syntax -->
  <!-- <Syntax></Syntax> -->

  <!-- 04 computed -->
  <!-- <Computed></Computed> -->

  <!-- 05 ComputedCaching -->
  <!-- <ComputedCaching></ComputedCaching> -->

  <!-- 06 Getter And Setter-->
  <!-- <GetterAndSetter></GetterAndSetter> -->

  <!-- 07 Watch -->
  <!-- <WatchComponent></WatchComponent> -->

  <!-- 08 Class And StyleBinding -->
  <!-- <ClassBinding></ClassBinding> -->

  <!-- 09 StyleBinding -->
  <!-- <StyleBinding></StyleBinding> -->

  <!-- 10 조건부 렌더링 (Conditional Rendering) -->
  <!-- <Conditional></Conditional> -->

  <!-- 11 리스트 렌더링 (ListRendering) -->
  <!-- <List></List> -->

  <!-- 12 이벤트 핸들링 (event handling) -->
  <!-- <EventHandling></EventHandling> -->

  <!-- 13 이벤트 수식어 (event modifier) -->
  <!-- <EventModifier></EventModifier> -->

  <!-- 14 키 수식어 (Key modifier) -->
  <!-- <KeyModifier></KeyModifier> -->

  <!-- 15 폼 입력 바인딩 (Form input binding) -->
  <!-- <FormBinding></FormBinding> -->

  <!-- 16 v-model 수식어 -->
  <!-- <Vmodel></Vmodel> -->

  <!-- 17 컴포넌트 기초 -->
  <!-- memo -->
  <!-- 컴포넌트이름은 PascalCase를 사용 -->
  <!-- <ComponentBase></ComponentBase> -->

  <!-- 자식 컴포넌트에서 slot 태그를 사용하면 부모컴포넌트 사이의 내용이 그 태그의 위치로 들어간다. -->
  <!-- <ComponentBase>slot 이용</ComponentBase> -->
  <!-- 일반 텍스트뿐만 아니라, 스타일이 들어간 태그도 넣을 수 있다. -->
  <!-- <ComponentBase> -->
    <!-- 스타일 동적 바인딩 -->
    <!-- <span :style="{color: red }">태그도 가능하다!</span> -->
    <!-- 스타일 정적 바인딩 -->
    <!-- <span style="color: blue">태그도 가능하다!</span> -->
  <!-- </ComponentBase> -->

  <!-- 일반 데이터를 보낼때는 "문자열"로 보내고, data안의 데이터를 보낼때는 v-bind(:)를 붙여서 보내야 함 -->
  <!-- 기술적으로 props를 자식 컴포넌트에 전달할 때 camelCase를 사용할 수도 있지만,
  camelCase로 선언된 props 속성일지라도 관례적으로 HTML 속성 표기법과 동일하게 kebab-case로 표기해서 사용하도록 해야 한다. 
  예를들어, bgColor로 데이터를 보낼 수 있지만, bg-color로 작성하는 것이 바람직하다. -->
  <!-- <ComponentBase bg-color="#33A06F" :font-color="color"></ComponentBase> -->
  <!-- <ComponentBase text-msg="안녕!" font-color="#000"></ComponentBase> -->

  <!-- 숫자 -->
  <!-- `42`는 정적이지만 Vue에 이것이 문자열이 아닌 JavaScript 표현식임을 알려주려면 v-bind가 필요하다. -->
  <!-- <ComponentBase :likes="42"></ComponentBase> -->

  <!-- 불리언 -->
  <!-- 값이 없는 prop은 'true'가 전달된다. -->
  <!-- <ComponentBase large></ComponentBase> -->
  <!-- 'false'는 정적이지만 Vue에 이것이 문자열이 아닌     -->
  <!-- JavaScript 표현식임을 알려주려면 v-bind가 필요하다. -->
  <!-- <ComponentBase :is-published="false"></ComponentBase> -->

  <!-- 배열 -->
  <!-- 배열도 정적이더라도 v-bind가 필요하다. -->
  <!-- <ComponentBase :fruit="[111, 'apple', 113]"></ComponentBase> -->

  <!-- 객체 -->
  <!-- 객체도 정적이더라도 v-bind가 필요 -->
  <!-- <ComponentBase :author="{ name: 'yun', company: 'idb'}"></ComponentBase> -->

  <!-- 객체의 모든 속성을 props로 전달하려면 인자 없이 v-bind를 사용하면 된다. -->
  <!-- 예를 들어서 <BlogPost v-bind="post(data에서 정의된 객체 데이터임)" /> 처럼 사용하면 된다. -->


  <!-- 18. 컴포넌트 속성 상속 -->
  <!-- 컴포넌트에 연결된 특정한 속성(예를 들어 class속성)은 자식 컴포넌트의 최상단 요소(루트 요소)에 반영된다. -->
  <!-- <ComponentAttributeInheritance class="yun" style="color: blue">
    Banana
  </ComponentAttributeInheritance> -->

  <!-- 19. 컴포넌트 emit -->
  <!-- 이벤트도 상속이 되므로 자식 컴포넌트의 루트 요소에 반영된다. -->
  <!-- 이벤트의 이름은 emit으로 넘어가서 사용될 것이기 때문에 아래처럼 굳이 click이라는 이름을 반영하지 않더라도 상관 없다. -->
  <!-- <ComponentEmit @click="log"> -->
  <!-- 다시 말해, 컴포넌트에 연결하는 이벤트는 실제로 쓸 수 있는 이벤트가 아니여도 상관없고, 내가 원하는 이름으로 만들고나서 그걸 해당하는 컴포넌트(자식 컴포넌트)에다가 emits라는 옵션에 등록하고 $emit 메소드로 정의해주면 된다. (자세한 사용법은 아래 script의 emit 설명부분 참고)-->
  <!-- 참고) 이벤트의 이름은 카멜케이스가 아니라 케밥케이스로 작성해야 함. -->
  <ComponentEmit @yunho="log" @double-click="log2" @get-event="log3" @changed-msg="logMsg">
    emit 공부하기
  </ComponentEmit>
</template>

<script>
//^ component는
// 1. 가져오고 (import '등록이름' from '경로')
// 2. 등록하고 (components: { 컴포넌트이름 }) => 
// 3. 쓴다. (<Fruit></Fruit> 처럼)

//^ props는
// 1. 부모컴포넌트에서 보내고 (:데이터이름="data안의 데이터" or 보낼데이터이름="보낼데이터")
// 2. 자식컴포넌트에서 받아서 props에 등록하고 (props: { 데이터이름: String, default: '기본값' })
// 3. 쓴다. ({{ 데이터이름 }})

//^ emit은
// 1. 자식 컴포넌트에서 this.$emit()에다가 부모 컴포넌트로 보낼 함수명, 보낼 데이터를 명시
// ex) 사용할 부분(예를 들어 함수나 watch)에 this.$emit('함수명', 보낼 데이터) 작성
// 2. 자식 컴포넌트에서 emits: [] 옵션에다가 보낼 함수명을 등록
// ex) emits: ['함수명', '함수명2', ...]
// 3. 부모 컴포넌트에서 자식 컴포넌트에다가 @함수명="methods에서실행할 함수"으로 받아서 쓴다.
// ex) <자식컴포넌트 @함수명="log"></자식컴포넌트>
// 4. 부모 컴포넌트에서 methods: { 작명() { } }으로 함수를 정의해서 쓴다.
// ex) methods: { log() { console.log('log') } }



// import Base from './components/01_base.vue';
// import LifeCycle from './components/02_lifecycle.vue';
// import Syntax from './components/03_syntax.vue';
// import Computed from './components/04_computed.vue';
// import ComputedCaching from './components/05_computedCaching.vue';
// import GetterAndSetter from './components/06_getter_setter.vue';
// import WatchComponent from './components/07_watch.vue';
// import ClassBinding from './components/08_classBinding.vue';
// import StyleBinding from './components/09_styleBinding.vue';
// import Conditional from './components/10_conditionalRendering';
// import List from './components/11_listRendering';
// import EventHandling from './components/12_eventHandling'
// import EventModifier from './components/13_eventModifier'
// import KeyModifier from './components/14_keyModifier'
// import FormBinding from './components/15_form_input_binding'
// import Vmodel from './components/16_v-modelModifier'
// import ComponentBase from './components/17_componentBase'
// import ComponentAttributeInheritance from './components/18_componentAttributeInheritance.vue'
import ComponentEmit from './components/19_componentEmit.vue'

export default {
  components: {
    // Base,
    // LifeCycle,
    // Syntax,
    // Computed,
    // ComputedCaching,
    // GetterAndSetter,
    // WatchComponent,
    // ClassBinding,
    // StyleBinding,
    // Conditional,
    // List,
    // EventHandling,
    // EventModifier,
    // KeyModifier,
    // FormBinding,
    // Vmodel,
    // ComponentBase,
    // ComponentAttributeInheritance,
    ComponentEmit,
  },

  // 데이터를 바꾸면 화면도 바뀐다 => 반응성(Reactivity)
  data() {
    return {
      count: 0,
      fruits: ["Apple", "Banana", "Cherry"],
      color: '#fff',  // 자식데이터로 보낼 데이터
      large: false, // false로 지정해놨어도 컴포넌트에서 그냥 보내면 true가 전달됨
      red: 'red',
    }
  },

  methods: {
    increase() {
      this.count += 1;
    },
    log() {
      console.log('click!');
    },
    log2() {
      console.log("더블클릭 함수 실행");
    },
    log3(event) {
      console.log("event 객체 받아오기")
      console.log(event)
    },
    logMsg(msg) {
      console.log(msg)  // 자식 컴포넌트에서 보낸 데이터를 받아서 콘솔에 출력
    }
  },

}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 50px;
  color: rosybrown;
}

ul {
  li {
    font-size: 30px;
  }
}
</style>
