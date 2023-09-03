import React from "react";

export default function Avatar({ image, name, size }) {
  return (
    <div>
      <img src={image} alt={name} width={size} height={size} style={{borderRadius: '50%'}} />
    </div>
  );
}
