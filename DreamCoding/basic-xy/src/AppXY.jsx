import React, { useState } from 'react';
import './AppXY.css';

export default function AppXY() {
  // const [X, setX] = useState(0);
  // const [Y, setY] = useState(0);
  const [position, setPosition] = useState({x: 0, y: 0})

  const mouseMove = (e) => {
    // console.log(e)
    // setX(e.clientX)
    // setY(e.clientY)
    // console.log(X, Y)
    
    // setPosition({ x: e.clientX, y: e.clientY })
    // console.log(position.x, position.y)

    // 만약에 수평으로만 이동이 가능하다면?
    setPosition((prev) => ({ x: e.clientX, y: prev.y }))
  }

  return (
    <div className='container' onPointerMove={mouseMove}>
      {/* react에서 인라인 style prop에서 픽셀 값을 넣을 때, 자동으로 숫자 뒤에 px을 붙여준다! */}
      {/* <div className='pointer' style={{ left: X - '15', top: Y - '15' }}></div> */}
      {/* <div className='pointer' style={{ transform: `translate(${X}px, ${Y}px)` }}></div> */}

      <div className='pointer' style={{ transform: `translate(${position.x}px, ${position.y}px)`}}></div>
      

    </div>
  );
}
