import React, { useState } from "react";
import Products from "../components/Products";
import { useQueryClient } from "@tanstack/react-query";

const client = useQueryClient();

export default function AppProducts() {
  const [showProducts, setShowProducts] = useState(true);

  return (
    <main className="container">
      <div>
        {showProducts && <Products />}
        <button onClick={() => setShowProducts((show) => !show)}>Toggle</button>
      </div>
      <div>
        {showProducts && <Products />}
        <button onClick={() => setShowProducts((show) => !show)}>Toggle</button>
      </div>
      {/* //^ cache를 invaildate하게 만들기 */}
      <button onClick={() => { client.invalidateQueries(['products', false]) }}>정보가 업데이트 되었음</button>
    </main>
  );
}
