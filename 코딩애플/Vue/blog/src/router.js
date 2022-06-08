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

import WriteList from './components/WriteList.vue'  // WriteList가져오기
import Home from './components/Home.vue'    // MainHome 가져오기


const routes = [
  {
    path: "/writelist",
    component: WriteList,
  },
  {
    path: "/",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 