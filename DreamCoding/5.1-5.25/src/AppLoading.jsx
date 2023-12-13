import React, { useEffect, useState } from "react";

//@ 5.21 ~ 2.22 기존 4챕터에서 만든 컴포넌트에 로딩, 에러 상태 추가하기

export default function AppLoading() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); //@ 빈 상태면 undefined로 초기화 됨

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    //* 1. 로딩중 상태 변경하기 + 에러상태 초기화
    setLoading(true);
    setError(undefined);

    fetch(`data/${checked ? "sale_" : ""}productss.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터 가져오기 성공!");
        console.log(checked);
        setProducts(data);
      })
      .catch((e) => {
        //* 2. 에러 상태 변경하기
        setError("에러가 발생했음!");
      })
      .finally(() =>
        //* 3. 로딩중 상태 초기화하기 (성공하든 실패하든 호출)
        setLoading(false)
      );

    return () => {
      console.log(
        "return 함수는 컴포넌트가 사라질 때(unmount될 때) 호출됩니다."
      );
    };
  }, [checked]); // checked가 변경될 때마다 호출

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
