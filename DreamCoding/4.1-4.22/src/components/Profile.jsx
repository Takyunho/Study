import React from 'react';

//@ 4.8 Profile 첫 컴포넌트 만들기
// AppProfile.jsx 즉 부모 컴포넌트에서 App.css를 import 해왔기 때문에,
// 자식 컴포넌트에서 따로 import 할 필요가 없다.

export default function Profile() {
  return (
    <div className='profile'>
      <img
        src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
        alt="avatar"
        className='photo'
      />
      <h1>James Kim</h1>
      <p>프론트엔드 개발자</p>
    </div>
  );
}

