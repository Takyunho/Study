import { useState } from 'react';
import './AppXY.css';

export default function AppXY() {
  const [XY, setXY] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // console.log(e)
    setXY((prev) => ({ x: e.clientX, y: e.clientY }))
    console.log(XY)
  }



  return (
    <div className="container" onMouseMove={handleMouseMove}>
      <div className="pointer" style={{left: XY.x, top: XY.y }}></div>
    </div>
  );
}


