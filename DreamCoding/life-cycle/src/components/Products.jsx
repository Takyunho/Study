import React, { useEffect, useState } from "react";

export default function Products() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //^ 경로를 그냥쓰면 public 폴더에서 찾는다.
    fetch("data/products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("네트워크에서 받아온 데이터", data);
        setProducts(data);
      });

    //^ useEffect에서 return의 콜백함수를 통해 cleanup을 할 수 있다.
    return () => {
      console.log("Products 컴포넌트가 unmounted 될때 실행됩니다.");
    };
  }, []);   //^ 첫번째 인자는 콜백, 두번째 인자는 디펜던시를 전달(빈 배열을 전달하면 아무런 디펜던시가 전달되지 않기 때문에 컴포넌트가 처음에 보여질때만 useEffect훅이 실행된다.)

  return (
    <div>
      <ul>
        {/* {products.map(product => {
          return (
            <li key={product.id}>
              <article>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </article>
            </li>
          )
        })} */}

        {products.map((product) => (
          <li key={product.id}>
            <article>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </article>
          </li>
        ))}
      </ul>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </div>
  );
}
