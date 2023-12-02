import React, { useEffect, useState } from "react";

//@ 4.19 useEffect 생애주기

export default function Products() {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);

  // fetch("data/products.json") // 그냥 상대경로를 쓰면 public으로 접근 가능
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log("데이터 가져오기 성공!");
  //     setProducts(data);
  //   });

  // 위처럼 컴포넌트 내에서 그냥 fetch api를 사용하면 무한 루프에 걸린다.
  //@ 따라서 화면이 처음 로드될 때 딱 한번만 호출하도록 하려면 useEffect를 사용하면 된다.
  //^ useEffect(콜백함수, 디펜던시)
  // 👆 첫번째 인자는 콜백, 두번째 인자는 디펜던시를 전달(빈 배열을 전달하면 아무런 디펜던시가 전달되지 않기 때문에 컴포넌트가 처음에 보여질때만 useEffect훅이 실행된다.)
  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터 가져오기 성공!");
        setProducts(data);
      });

    //# 컴포넌트가 없어질 때 메모리를 정리한다던지, 소켓 네트워크 통신을 닫는다던지 할때에는 return 함수를 사용한다.
    return () => {
      console.log(
        "return 함수는 컴포넌트가 사라질 때(unmount될 때) 호출됩니다."
      );
    };
  }, []);

  return (
    <div>
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
