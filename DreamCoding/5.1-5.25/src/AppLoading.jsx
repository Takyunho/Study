import React, { useEffect, useState } from "react";

//@ 5.21 ~ 2.22 기존 4챕터에서 만든 컴포넌트에 로딩, 에러 상태 추가하기

export default function AppLoading() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleCheck = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    // 1. 로딩중 상태 변경하기 + 에러상태 초기화
    setLoading(true);
    setFailed(false);

    fetch(`data/${checked ? "sale_" : ""}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터 가져오기 성공!");
        console.log(checked);
        setProducts(data);
        // 2. 로딩중 안보이도록 상태 변경하기
        setLoading(false);
      })
      .catch((e) => {
        console.log("데이터 가져오기 실패!");
        // 3. 로딩중 안보이도록 상태 변경 + 에러 상태 변경하기
        setLoading(false);
        setFailed(true);
      });

    return () => {
      console.log(
        "return 함수는 컴포넌트가 사라질 때(unmount될 때) 호출됩니다."
      );
    };
  }, [checked]); // checked가 변경될 때마다 호출

  return (
    <div>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleCheck}
      />
      <label htmlFor="checkbox">show only Sale 😆</label>

      {loading && !failed ? (
        <h1>Loading...</h1>
      ) : !loading && failed ? (
        <h1>데이터 불러오기 실패</h1>
      ) : (
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
      )}
    </div>
  );
}
