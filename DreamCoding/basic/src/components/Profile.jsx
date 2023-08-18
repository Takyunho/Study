import React from 'react';
// 상위 컴포넌트에서 App.css를 import해왔기 때문에 하위 컴포넌트인 Profile.jsx에서 class를 주더라도 스타일이 정의된다..!!

export default function Profile() {
  return (
    <div className='profile'>
      <img className='photo' src="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="avatar" />
      <h1>Lina</h1>
      <p>프론트엔드 고수</p>
    </div>
  );
}

