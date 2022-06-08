import { createApp } from 'vue'
import App from './App.vue'
//^ npm으로 bootstrap 설치하는 경우 아래의 코드 2줄 추가해야한다.
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//^ 라우터 사용하기
import router from './router'
createApp(App).use(router).mount('#app')

// createApp(App).mount('#app')
