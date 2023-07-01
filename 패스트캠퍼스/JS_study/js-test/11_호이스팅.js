// 호이스팅(Hoisting)
// 함수 선언부가 유효범위 최상단으로 끌어 올려지는 현상

export default function app() {

  const a = 7;
  
  const double = () => {
    return a * 2;
  }
  
  console.log(double());

}
