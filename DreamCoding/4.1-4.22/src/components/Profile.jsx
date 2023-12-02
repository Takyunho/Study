import React from 'react';

//@ 4.8 Profile 첫 컴포넌트 만들기
// AppProfile.jsx 즉 부모 컴포넌트에서 App.css를 import 해왔기 때문에,
// 자식 컴포넌트에서 따로 import 할 필요가 없다.

export default function Profile({image, name, title, isNew}) {
  return (
    <div className="profile">
      <img src={image} alt="avatar" className="photo" />
      {/* isNew가 true인 경우에만 span태그를 보여준다. */}
      {isNew && <span className="new">NEW</span>}
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}

