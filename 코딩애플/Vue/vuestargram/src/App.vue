<template>
  <div class="header">
    <ul class="header-button-left">
      <li>Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li>Next</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :data="data" :step="step" :url="url" />
  <button class="btn" @click="more">더보기</button>

  <div class="footer">
    <ul class="footer-button-plus">
      <!-- input에 multiple 속성을 추가하면 사진을 여러개 선택할 수 있음 -->
      <!-- input에서 이미지파일을 우선선택 할 수 있도록 하는 방법 => accept="image/*" 을 추가 -->
      <!-- 이미지만 업로드 받고싶으면 자바스크립트로 확장자 검사를 해야함 -->
      <input @change="upload" type="file" id="file" class="inputfile" />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import data from './assets/data.js'
import Container from './components/Container.vue'
import axios from 'axios'


export default {
  name: 'App',
  data() {
    return {
      data: data, // 포스팅 데이터
      btnPlus: 0, // 더보기
      step: 0,    // tab UI
      url: "",    // 파일업로드시 저장할 데이터
    }
  },
  components: {
    Container,  // ES6 부터 key, value의 변수명이 같을때 생략이 가능
  },
  methods: {
    more() {
      axios.get(`https://codingapple1.github.io/vue/more${this.btnPlus}.json`)
        .then( result => {    // 파라미터가 1개면 소괄호 생략가능
          // 요청 성공시 실행할 코드
          // console.log(result)
          // console.log(result.data);
          this.data.push(result.data)
          this.btnPlus++
        })
    },
    upload(e) {
      let photo = e.target.files;   // 업로드한 파일(사진)을 변수에 담기
      console.log(photo);
      console.log(photo[0]);
      this.step = 1;        // 다음 페이지로 이동
      
      // 업로드한 이미지 띄우기
      // 1. FileReader() -> 이미지를 텍스트(글자)로 변환해줌
      // 2. URL.createObjectURL() -> 이미지의 가상 URL을 생성해줌 (URL을 만들어주는 함수)
      this.url = URL.createObjectURL(photo[0]);
      console.log(this.url);   // 임시 url


      }
  }
}
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
/* 더보기 버튼 */
.btn {
  width: 80px;
  display: block;
  margin: 0 auto;
  border: 1px solid #eee;
  border-radius: 5px;
  background: rgb(45, 147, 194);
  color: #fff;
  padding: 10px;
  cursor: pointer;
}
</style>
