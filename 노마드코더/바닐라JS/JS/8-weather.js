// const API_KEY = "839edc5c25edbaa5205c852c156a0184";

// const br = document.createElement("br");


// // GeolocationCoordinates 인스턴스는 다수의 속성을 갖지만, 그 중 가장 많이 쓰게 될 항목은 지도의 지점을 가리킬 때 사용할 latitude와 longitude입니다.
// //따라서 대부분의 Geolocation 성공 콜백은 아래와 같이 꽤 간단한 형태입니다.
// function onGeoOk(position) {
//   // const lat = position.coords.latitude;          // 위도
//   // const lon = position.coords.longitude;         // 경도
//   // console.log(lat)
//   // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

//   // 북이현동 
//   // const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.5610&lon=126.9543&appid=${API_KEY}&units=metric`;

//   // 서대문구
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=37.5791&lon=126.9368&appid=${API_KEY}&units=metric`;

//   // 3.0 원콜 (api key 발급 필요)
//   // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=37.5665&lon=126.9780&appid=24c1ee02bf6cb5d74b92ce8d1643b936&units=metric`
  
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       // console.log(data.name, data.weather[0].main) });
//       const weather = document.querySelector("#weather span:first-child");
//       const city = document.querySelector("#weather span:last-child");
//       // const name = data.name;
//       // const weather = data.weather[0].main; 를 아래처럼 이너텍스트
//       weather.innerText = `날씨 : ${data.weather[0].main}
//       온도 : ${data.main.temp}`;
//       weather.appendChild(br);        // 줄바꿈을 위해
//       city.innerText = `도시 : ${data.name}`;
//     });
// }
// // fetch를 통해 실제로 url을 클릭할 필요 없음. 자바스크립트가 대신 URL을 부름 
// /* 
// fetch는 promise임 - 당장 뭔가 일어나지 않고 시간이 좀 걸린 뒤에 일어남.
// 바로 받기위해, then을 사용하고 그 다음으로 response를 받음. 그리고 response의 json을 얻어야함
// response.json()은 검사 -> 네트워크 -> 미리보기(preview)에 있는 것들이 JSON임
// JSON에서 내용을 추출했으면 date를 얻음 
// 그 데이터중에서 name 추출
// 그리고 weather은 배열로 이루어짐
// 그래서 배열의 첫 번째 요소의 main을 얻기 위해 weather[0].main
// */

// function onGeoError() {
//   alert("너의 위치와 날씨를 찾을 수 없어!")
// }

// navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);  // Geolocation API는 사용자의 현재 위치를 가져오는 API로, 지도에 사용자 위치를 표시하는 등 다양한 용도로 사용할 수 있다.

// 유저의 위치를 주는 함수
// 성공했을때와 실패했을때 나눠서 함수작성
// API : 다른 서버와 이야기할 수 있는 방법이라고 생각하면 된다.



query = encodeURIComponent("구리시 인창동");
url = "http://14.63.1.173:1880/idbGeo?query="+query;
fetch(url)
.then(response => response.json())
.then(parsedResponse => {
    console.log(parsedResponse.addresses[0].x)
    console.log(parsedResponse.addresses[0].y)
    getWeatherInfo(parsedResponse.addresses[0].x,parsedResponse.addresses[0].y)
})
  .catch((error) => console.log(error));

function getWeatherInfo(lon, lat){
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3f34ac6faf90e23c5e377ecf7c8cf1f9`
    fetch(url)
    .then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse.main)
    })
    .catch((error) => console.log(error));
}