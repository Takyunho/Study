// 라우터 세팅
/*
^ 1. npm install vue-router@4 설치
  -  npm run serve 끄고 해야함
^ 2. router.js만들어서 기본코드복붙
^ 3. 컴포넌트 import해오기 + routes부분 수정
^ 4. main.js에 라우터 쓴다고 아래 두줄 적어야함
  - import router from './router'
  - createApp(App).use(router).mount('#app') 
^ 5. 원하는 곳에 <router-view> 넣기 
  - props도 여기다가 : 붙여서 전송해야함
*/

// import { createWebHistory, createRouter } from "vue-router";   // HTML5 모드
import { createWebHashHistory, createRouter } from "vue-router";  // Hash 모드

import WriteList from './components/WriteList.vue'  // WriteList 가져오기
import Home from './components/Home.vue'    // MainHome 가져오기
import Detail from './components/Detail.vue'  // Detail 가져오기
import ErrorPage from './components/ErrorPage.vue'    // ErrorPage 가져오기
import Author from './components/Author.vue'
import Comment from './components/Comment.vue'


const routes = [
  {
    path: "/writelist",
    component: WriteList,
    //^ named views = 여러개의 컴포넌트를 한번에 보여줄때 사용. component: 다음에 중괄호를 열고 안에다가 컴포넌트를 작성한다.
    // component: {
    //   WriteList: WriteList,
    //   Comment: Comment,
    // }
  },
  {
    path: "/",
    component: Home,
  },
  {
    // path: "/writelist/detail/:parameter", //^ url 파라미터 문법
    path: "/detail/:parameter(\\d+)", // 파라미터 업그레이드 가능 / 소괄호 안에 정규식 입력가능(숫자만 입력가능하게함)
    component: Detail,
    //^ Nested routes 문법 : 특정 페이지에서 라우터를 또 나누는 경우
    children: [
      {
        path: "author", // 상대경로로 작성해야한다. /author처럼 슬래쉬 붙이면 안됨.
        component: Author,
      },
      {
        path: "comment",
        component: Comment,
      }
    ]
  },
  // 같은 라우터에 걸리면 위에 있는걸 적용시킨다. 따라서, 404 페이지같은 경우 맨 아래에 기재하자.
  {
    path: "/:anyting(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  // history: createWebHistory(),   //^ HTML5 모드
  /*
  HTML5 모드인 경우,
  서버에 아무 기능을 개발안해놨으니 404페이지가 뜨거나 그럴 수 있다.  
  그래서 이걸 방지하려면 서버에다가 "어떤 사람이 /어쩌구로 접속하면 그냥 Vue에게 라우팅 맡겨주세요" 라고 미리 기능개발이 필요하다.
  */

  history: createWebHashHistory(), //^ hash모드
  /*
  hash모드는 URL에 #이 붙은채로 시작하는데, #뒤에 있는 내용들은 절대 서버로 전달되지 않는다.
  그래서 서버가 라우팅을 채가는 일을 방지할 수 있고, Vue router에게 온전히 라우팅을 맡길 수 있다.
  서버가 없는경우, hash 라우터로 사이트를 만드는 것도 좋은 선택이다.
  */
  routes,
});

export default router; 

//^ Navigation guards(네비게이션 가드)
/*
@ 특정 URL로 접속하기 전에 실행할 수 있는 코드, hook이라고 보면 된다.
예를 들어, 마이페이지를 접속할때 로그인한 사람만 보여주고 싶은 경우,
라우팅해주기 전에 '로그인했는지?' 이런 코드를 실행해야 하는데, 이때 네비게이션 가드를 쓴다.

const routes = [
  {
    path: "/hello",
    component: HelloWorld,
    beforeEnter: ()=>{
      if (로그인했냐 == false) {
        return '/login'
      }
    }
  }
];

이런식으로 routes 안에서 beforeEnter 라는 항목을 만들어서 사용한다.

서버와 로그인 기능이 있는 실제 서비스라면 로그인한 사용자는 대부분 쿠키나 로컬스토리지에 로그인 정보가 저장되어 있다.
그게 있는지 검사하면 된다.
그러나, 자바스크립트 변수나 데이터들은 콘솔창 코드입력으로 언제나 위조가 가능하기 때문에
서버도 당연히 마이페이지 내용을 보내주기 전에 로그인 했는지 검증해야한다.

그리고 beforeEnter 안에 파라미터는 두세개 작명이 가능하다.

const routes = [
  {
    path: "/hello",
    component: HelloWorld,
    beforeEnter: (to, from)=>{
      return to.fullPath
    }
  }
];

첫째 파라미터 (to)는 목적지 페이지,
둘째 파라미터(from)는 출발 페이지이다.
이 파라미터들은 $route처럼 똑같이 이용가능하다. (위의 return 참조)
to.fullPath 하면 전체 경로를 알려주고
to.params.id 하면 id파라미터를 알려준다.

참고로, return false는 라우팅 중단,
return이 없으면 그냥 원래의 route인 /hello로 잘 이동시켜준다.
*/

//^ 여러개의 route에 같은 네비게이션 가드(Navigation guard)를 추가하고 싶으면
/*
router라는 변수에다가 .beforeEach()를 사용하면 된다.

const router = createRouter({ 어쩌구 });
router.beforeEach((to, from) => { // 페이지 변경 전에 실행할 코드 })

라우팅 전에 뭔가 실행하고 싶으면 beforeEach() 혹은 beforeResolve()를 쓰면 되고
라우팅 하고나서 뭔가 실행하고 싶으면 afterEach() 쓰면 된다.
*/

//^ Vue 컴포넌트 안에서도 네비게이션 가드(Navigation guard)를 쓸 수 있다.
/*
vue 파일(예를 들어 컴포넌트)에서도 Navigation guard를 사용 가능
created(), mounted() 처럼 비슷하게 쓸 수 있다.

beforeRouteEnter(){}
beforeRouteUpdate(to, from){}

라는 것들을 lifecycle hook쓰는 위치에다가 쓰면 된다.
파라미터는 두개 입력가능하다.
첫째 파라미터 = to = 목적지 페이지
둘째 파라미터 = form = 출발 페이지
*/