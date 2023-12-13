import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import AppXY from './AppXY';
// import AppMentor from './AppMentor';
// import AppMentors from './AppMentors';
// import AppMentorsImmer from './AppMentorsImmer';
// import AppForm from './AppForm';
// import AppWrap from './AppWrap';
// import AppTheme from './AppTheme';
// import AppMentorsButton from "./AppMentorsButton";
import AppLoading from './AppLoading';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* React.StrictMode를 제거해주면 console이 한번 찍히게 된다 */}
  
    {/* 5.1 챕터소개 */}
    {/* 5.2 ~ 5.4 마우스 따라가기/기본구현/개선하기 */}
    {/* <AppXY /> */}

    {/* 5.5 ~ 5.6 중첩 객체 상태 관리(멘토 바꾸기) */}
    {/* <AppMentor /> */}

    {/* 5.7 ~ 5.8 배열 상태 관리 */}
    {/* 5.9 ~ 5.10 멘토 추가/삭제하기 */}
    {/* 5.11 상태관리 라이브러리에 대해 */}
    {/* 5.12 Reducer 사용해보기 */}
    {/* <AppMentors /> */}

    {/* 5.13 immer 라이브러리 사용 */}
    {/* <AppMentorsImmer></AppMentorsImmer> */}

    {/* 5.14 Form을 만드는 법 */}
    {/* <AppForm></AppForm> */}

    {/* 5.15 ~ 5.16 컴포넌트의 재사용 */}
    {/* <AppWrap></AppWrap> */}

    {/* 5.17 Context란? 컨셉 정리 */}

    {/* 5.18 다크모드 Context 만들기 */}
    {/* <AppTheme></AppTheme> */}

    {/* 5.19 성능 개선에 대한 단상 */}
    {/* 5.20 성능 개선 해보기 (useMemo, useCallback, React.memo) */}
    {/* <AppMentorsButton></AppMentorsButton> */}

    {/* 5.21 ~ 5.22 로딩, 에러 상태 추가 */}
    {/* 5.23 커스텀 훅 만들기 */}
    <AppLoading></AppLoading>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
