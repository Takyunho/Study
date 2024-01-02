import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* 
        ✅ PWA = Progressive Web App
        웹사이트를 안드로이드/iOS 모바일 앱처럼 사용할 수 있게 만드는 일종의 웹개발 기술
        근데 iOS, Android 앱으로 발행하는게 아니라 웹사이트 자체를 스마트폰 홈화면에 설치


        ✅ 웹사이트를 PWA화 시키면 좋은점
        1. 스마트폰, 태블릿 바탕화면에 웹사이트 설치가 가능하다.
        2. 오프라인에서도 동작할 수 있다.
        - service-worker.js 라는 파일과 브라우저의 Cache storage 덕분에 가능
        - 자바스크립트로 게임만들 때 유용
        3. 설치 유도 비용이 매우 적다.
        - 앱설치를 유도하는 마케팅 비용이 적게들어 좋다.
        - 구글플레이 스토어 방문해서 앱 설치하고 다운받게 하는건 항상 높은 마케팅 비용이 든다.
        그러나 PWA라면 웹사이트 방문자들에게 간단한 팝업을 띄워서 설치를 유도할 수 있으니
        훨씬 적은 마케팅 비용이 든다.


        ✅ PWA만드는 법
        - 아무사이트나 파일 2개만 사이트 로컬경로에 있으면 브라우저가 PWA로 인식(HTTPS 사이트여야함)
        - 즉, manifest.json과 service-worker.js라는 이름의 파일 두개를 만들면 됨
        - 하지만 기본 프로젝트를 npm build / yarn build 했을 경우 manifest.json 파일만 생성해줌
        service-worker.js 까지 자동으로 생성을 원한다면 프로젝트를 처음 만들 때 아래처럼 터미널에 입력
        ⭐ npx create-react-app 프로젝트명 --template cra-template-pwa

        PWA를 사용하려면 프로젝트를 다시 만들어야함
        다시 만들고 만든 프로젝트의 App.js , App.css , index.js 이런 파일들을 새 프로젝트에 복붙
        router, redux 등 라이브러리를 설치 했다면 새 프로젝트에서도 다시 설치해야함
        그리고 index.js 하단에
        serviceWorkerRegistration.unregister(); 부분을
        ⭐ serviceWorkerRegistration.register(); 로 바꿔야 함
        그래야 yarn build / npm run build 했을 때 manifest.json과 service-worker.js 파일이 자동으로 생성됨


        ✅ manifest.json / service-worker.js 파일 살펴보기
        build하고 나면 build 폴더 내에 manifest.json / service-worker.js 파일 생성됨
        ⭐ manifest.json 파일은 웹앱의 아이콘, 이름, 테마색 이런걸 결정하는 부분이다.
        {
          "version" : "여러분앱의 버전.. 예를 들면 1.12 이런거",
        "short_name" : "설치후 앱런처나 바탕화면에 표시할 짧은 12자 이름",
        "name" : "기본이름",
        "icons" : {여러가지 사이즈별 아이콘 이미지 경로 },
        "start_url" : "앱아이콘 눌렀을 시 보여줄 메인페이지 경로",
        "display" : "standalone 아니면 fullscreen", (상단바 보여줄지 말지)
        "background_color" : "앱 처음 실행시 잠깐 뜨는 splashscreen의 배경색",
        "theme_color" : "상단 탭색상 등 원하는 테마색상",
        }
        등 여러가지를 집어넣을 수 있음

        그리고 <link rel="manifest" href="/manifest.webmanifest">를
        웹앱에서 사용하는 모든 HTML안에 집어넣어야 하는데
        리액트가 알아서 해줘서 따로 건드릴 필요X

        ⭐ service-worker.js 파일은 웹앱을 설치했을 때
        어떤 CSS, JS, HTML, 이미지 파일이 하드에 설치되도록 도와주는 파일이다.
        ex. 카카오톡 앱같은거 설치할 때 구글플레이 스토어 가서 설치함
        그럼 카톡 구동에 필요한 이미지, 데이터들이 전부 하드에 설치됨
        그리고 카톡을 켜면 카톡 로고 같은 데이터를 카톡 서버에 요청하는게 아니라
        하드에 이미 설치되어 있는걸 그대로 가져와서 사용
        이걸 흉내내도록 도와주는 파일이 바로 service-worker 라는 파일

        그럼 이제 다음에 앱을 켤 때마다 서버에 CSS,JS,HTML 파일을 요청하는게 아니라
        Cache Storage에 저장되어있던 CSS,JS,HTML 파일을 사용하게된다.
        (그럼 이제 오프라인에서도 사용 가능)


        ✅ 개발자도구로 PWA 디버깅하기
        내가 build 했던 프로젝트가 PWA인지 아닌지 살펴보고 싶으면
        일단 사이트를 호스팅받아 올리거나 아니면 live server를 통해 build 폴더를 에디터로 오픈하고
        거기 있는 index.html을 우클릭 - live server로 띄우기

        개발자도구 키면 Application이라는 탭에 들어가서
        PWA와 관련된 모든걸 살펴볼 수 있다.
        Manifest 메뉴에선 manifest.json 내용들을 확인가능하고
        Service Worker 메뉴에선 service-worker 파일이 잘 있는지, 오프라인에선 잘 동작하는지
        테스트 가능하고 푸시알림 기능을 개발해놨다면 푸시알림도 샘플로 전송해볼 수 있다.
        Cache Storage 메뉴에선 service-worker 덕분에 하드에 설치된 CSS, JS, HTML 파일들을 확인할 수 있다.
        캐시된 파일 제거도 가능하다.


        ✅ 나의 PWA를 커스터마이징하려면?
        지금 PWA 발행이 쉽고 간단한 이유는 구글의 workbox 라는 라이브러리 덕분
        이게 create-react-app 설치할 때 함께 설치되었기 때문
        그래서 PWA 발행방식 같은걸 커스터마이징 하고싶으면 workbox 사용법을 익혀야 함(근데 복잡)

        Q. 하드에 설치할 파일 중에 HTML을 제외하고 싶다면?
        프로젝트 폴더 내의 node_modules/react-scripts/config/webpack.config.js 파일을 찾음

        new WorkboxWebpackPlugin.InjectManifest({
            swSrc,
            dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
            exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/], 
        
        여기의 exclude라는 항목이 어떤 파일을 캐싱하지 않을건지 결정하는 부분
        정규식으로 작성하는데 정규식과 일치하는 파일명을 제외
        그래서 원하는 HTML 파일을 여기 등록하면 끝
        exclude: [/\.map$/, /asset-manifest\.json$/, /index\.html/],

        이거 말고도 "모든 .css로 끝나는 파일"  "a라는 글자로 시작하는 파일"
        이런 식으로 정규식으로 작성할 수도 있는데 그것은 정규식 문법을 잘 찾아보자.
        아무튼 위처럼 코드를 추가하면 build 할 때 index.html 파일을 캐싱목록에서 제외해주게 된다.

        참고로 PWA는 구글 앱스토어에 올릴 수 있는 apk 파일로 변환할 수도 있는데 
        PWAbuilder 등을 이용하면 된다.

 */}

      </header>
    </div>
  );
}

export default App;
