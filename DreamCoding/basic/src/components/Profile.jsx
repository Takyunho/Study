import React from "react";
// 상위 컴포넌트에서 App.css를 import해왔기 때문에 하위 컴포넌트인 Profile.jsx에서 class를 주더라도 스타일이 정의된다..!!

// export default function Profile(props) {
export default function Profile({ image, name, title }) {
  return (
    <div className="profile">
      {/* <img className="photo" src={props.image} alt="avatar" /> */}
      {/* <h1>{props.name}</h1> */}
      {/* <p>{props.title}</p> */}
      <img className="photo" src={image} alt="avatar" />
      <h1>{name}</h1>
      <p>{title}</p>
    </div>
  );
}
