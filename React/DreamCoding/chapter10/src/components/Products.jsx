import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [checked, setChecked] = useState(false);
  // const [loading, error, products] = useProducts({ salesOnly: checked });

  //* react query
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", checked],
    queryFn: async () => {
      console.log("fetching..");
      // return fetch(`data/${checked ? 'sale_' : ""}products.json`).then((res) =>
      //   res.json()
      // );
      const res = await fetch(`data/${checked ? "sale_" : ""}products.json`);
      const data = await res.json();
      return data
    },
    staleTime: 1000 * 60 * 5,   // 5분
  });
  const handleChange = () => setChecked((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <>
      <input
        id="checkbox"
        type="checkbox"
        value={checked}
        onChange={handleChange}
      />
      <label htmlFor="checkbox">Show Only 🔥 Sale</label>
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
