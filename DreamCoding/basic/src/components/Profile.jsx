import React from "react";

export default function Profile({ image, /* newTag */ name, title, isNew }) {
  return (
    <div className="profile">
      <img className="photo" src={image} alt="avatar" />
      {/* //^ 1. 3항 연산자로 newTag가 전달된 컴포넌트만 class주기 */}
      {/* <span className={ newTag ? 'new-tag' : '' }>{ newTag }</span> */}
      
      {/* //^ 2. isNew의 참 거짓 여부에 따라 span 보여주기 / 안보여주기 */}
      {/* isNew가 true이고, span태그가 존재하면 참 */}
      {isNew && <span className="new-tag">New</span>}
      
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
