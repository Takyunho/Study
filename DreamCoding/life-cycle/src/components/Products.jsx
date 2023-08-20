import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleChange = () => setChecked((checked) => !checked)

  useEffect(() => {
    fetch(`data/${ checked ? 'sale_' : '' }products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("네트워크에서 받아온 데이터", data);
        setProducts(data);
      });

    return () => {
      console.log("Products 컴포넌트가 unmounted 될때 실행됩니다.");
    };
  }, [checked]);  //^ checked가 변경될때 useEffect 훅이 다시 실행됨

  return (
    <div>
      <input id='checkBox' type="checkbox" value={checked} onChange={handleChange} />
      <label htmlFor="checkBox">Show only hot sale!</label>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
