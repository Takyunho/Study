import { useState } from 'react';
import './App.css';
import Products from './components/Products';

export default function AppProducts() {
  const [showProducts, setShowProducts] = useState(true);

  const handleToggle = () => {
    setShowProducts(show => !show)
  }

  return (
    <div>
      {showProducts && <Products></Products>}
      <button onClick={handleToggle}>Toggle</button>
    </div>
  );
}


