import { useState } from 'react';
import './AppXY.css';

//^ 5.2 ~ 5.4 마우스 따라가기

export default function AppXY() {
  //@ 연관된 상태는 하나의 객체로 관리하는 것이 좋다.
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // console.log(e)
    //@ set함수는 콜백에서 한번에 호출 하는 것이 좋다. (여러가지의 set 함수를 호출하더라도 리액트에서 알아서 가상 DOM을 만들지만, 100% 보장되는 것은 아니기 때문)
    // setPosition({ x: e.clientX, y: e.clientY });
    
    //? 만약 수평으로만 이동이 가능하게 하려면?
    // setPosition((prev) => ({ x: e.clientX, y: prev.y })) // 객체는 ()로 감싸줘야 한다.

    //? useState에 여러개의 값이 들어있는 경우, 예를 들어 {x: 0, y: 0, z: 0}
    setPosition((prev) => ({
      ...prev, // 기존의 값을 그대로 가져오고
      x: e.clientX // x값만 변경
    }))
    console.log(position)
  }


  return (
    <div className="container" onMouseMove={handleMouseMove}>
      {/* <div className="pointer" style={{left: XY.x, top: XY.y }}></div> */}
      {/* //@ left와 top을 바꾸는 것이 아니라 transform: translate(x값, y값) 을 이용해 좌표 변경 */}
      <div className="pointer" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}></div>
    </div>
  );
}


