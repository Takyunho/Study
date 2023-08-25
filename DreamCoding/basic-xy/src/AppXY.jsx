import React, { useState } from 'react';
import './AppXY.css';

export default function AppXY() {
  // const [position, setPosition] = useState({x: 0, y: 0})
  const [position, setPosition] = useState({x: 0, y: 0, z: 0})

  const mouseMove = (e) => {
    // 만약에 수평으로만 이동이 가능하다면?
    // setPosition((prev) => ({ x: e.clientX, y: prev.y }))

    // 만약에 객체에 여러개의 값이 담겨있는 경우
    // x의 값만 변경하고 싶다면 나머지 키와 값들은 spread 연산자를 사용하여 그대로 가져오고, x만 수정!
    setPosition((prev) => ({ ...prev, x: e.clientX }))
  }

  return (
    <div className='container' onPointerMove={mouseMove}>
      <div className='pointer' style={{ transform: `translate(${position.x}px, ${position.y}px)`}}></div>
    </div>
  );
}
