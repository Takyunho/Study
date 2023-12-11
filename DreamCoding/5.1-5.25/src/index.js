import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
// import AppXY from './AppXY';
// import AppMentor from './AppMentor';
// import AppMentors from './AppMentors';
// import AppMentorsImmer from './AppMentorsImmer';
import AppForm from './AppForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* React.StrictMode를 제거해주면 console이 한번 찍히게 된다 */}

    {/* 5.2 ~ 5.4 */}
    {/* <AppXY /> */}

    {/* 5.5 ~ 5.6 */}
    {/* <AppMentor /> */}

    {/* 5.7 ~ 5.8 */}
    {/* <AppMentors /> */}

    {/* 5.13 immer 라이브러리 사용 */}
    {/* <AppMentorsImmer></AppMentorsImmer> */}

    {/* 5.16  */}
    <AppForm></AppForm>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
