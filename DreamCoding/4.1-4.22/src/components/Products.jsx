import React, { useEffect, useState } from "react";

//@ 4.20 useEffect 제대로 사용하기

export default function Products() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(prev => !prev)
  }

  useEffect(() => {
    fetch(`data/${checked ? 'sale_' : ''}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터 가져오기 성공!");
        console.log(checked);
        setProducts(data);
      });

    return () => {
      console.log(
        "return 함수는 컴포넌트가 사라질 때(unmount될 때) 호출됩니다."
      );
    };
  }, [checked]);  // checked가 변경될 때마다 호출

  return (
    <div>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleCheck}
      />
      <label htmlFor="checkbox">show only Sale 😆</label>
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
