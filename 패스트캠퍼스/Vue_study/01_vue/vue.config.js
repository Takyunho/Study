const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 컴포넌트 단일 이름의 에러인식 막기
  lintOnSave: false
})
