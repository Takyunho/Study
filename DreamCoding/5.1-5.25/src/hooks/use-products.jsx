import { useEffect, useState } from "react";

// salesOnly를 인자로 받는다. -> salesOnly는 checked값임 (true/false)
export default function useProducts({ salesOnly}) { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    fetch(`data/${salesOnly ? "sale_" : ""}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log("데이터 가져오기 성공!");
        console.log(salesOnly);
        setProducts(data);
      })
      .catch((e) => setError("에러가 발생했음!"))
      .finally(() => setLoading(false))

    return () => {
      console.log(
        "return 함수는 컴포넌트가 사라질 때(unmount될 때) 호출됩니다."
      );
    };
  }, [salesOnly]);

  //* 일반 컴포넌트는 UI를 반환하는 반면에,
  //* 커스텀 훅은 외부에서 사용할 값(상태)을 반환한다.
  return [products, loading, error];
}
