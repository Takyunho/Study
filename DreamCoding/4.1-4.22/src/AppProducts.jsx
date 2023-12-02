import React, { useState } from 'react';
import './App.css';
import Products from './components/Products';

//@ 4.19 useEffect 생애주기

export default function AppProducts() {
  const [showProducts, setShowProducts] = useState(true)

  const handleToggle = () => {
    setShowProducts((prev) => !prev)
  }

  return (
    <div>
      {showProducts && <Products></Products>}
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
}

