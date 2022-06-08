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

import { createWebHistory, createRouter } from "vue-router";

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
        path: "author", // 상대경로로 작성, /author ==> X
        component: Author,
      },
      {
        path: "comment",
        component: Comment,
      }
    ]
  },
  // 같은 라우터에 걸리면 위에 있는걸 적용시킨다. 따라서, 404 페이지같은 경우 맨 아래에 기재
  {
    path: "/:anyting(.*)",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 