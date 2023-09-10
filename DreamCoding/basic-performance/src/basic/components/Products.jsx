import React, { useEffect, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState(false);
  const handleChange = () => setChecked((prev) => !prev);

  //* loading, error 표시하기
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  //* loading, error 표시하기
  useEffect(() => {
    //* 1 
    setLoading(true);
    setErrMsg(undefined);

    fetch(`data/${checked ? 'sale_' : ''}products.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔥뜨끈한 데이터를 네트워크에서 받아옴');
        // setLoading(false); // finally()를 사용하므로, 이 코드는 필요없다.
        setProducts(data);
      }).catch(() => {
        //* 2
        setErrMsg('데이터를 가져오는데 실패했습니다.');
      }).finally(() => setLoading(false)); //* 3. 성공하든 실패하든 로딩은 끝나야 하므로, finally()를 사용한다.

    return () => {
      console.log('🧹 깨끗하게 청소하는 일들을 합니다.');
    };
  }, [checked]);



  //* 4. if문을 return해서 여러가지의 내용을 표시할 수 있다!!
  // 데이터를 가져오고 있는 경우,
  if (loading) return <p>로딩중...!</p>
  
  // 데이터를 가져오는데 실패한 경우,
  if (errMsg) return <p>{errMsg}</p>

  // 데이터를 가져오는데 성공한 경우,
  return (
    <>
      <input
        id='checkbox'
        type='checkbox'
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor='checkbox'>Show Only 🔥 Sale</label>
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
    </>
  );
}
