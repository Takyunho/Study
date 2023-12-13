import React, { useState } from "react";
import useProducts from "./hooks/use-products";

//@ 5.21 ~ 2.22 기존 4챕터에서 만든 컴포넌트에 로딩, 에러 상태 추가하기

export default function AppLoading() {
  const [checked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  //@ 5.23 커스텀 훅 만들기
  const [products, loading, error] = useProducts({ salesOnly: checked }); // salesOnly는 useProducts에서 받을 인자


  // * if문으로 각각의 다른 내용을 return
  if (loading) return <h1>loading...</h1>
  
  if (error) return <h1>{error}</h1>

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
          //@ 고유한 key 값을 기준으로 렌더링할지 판단하기 때문에 key값을 넣어줘야 한다.
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
