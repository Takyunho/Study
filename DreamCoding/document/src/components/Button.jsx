import React, { useState } from "react";

export default function Button() {
  function handleClick() {
    alert("click!");
  }

  return (
    <>
      <button onClick={handleClick}>Click</button>
    </>
  );
}

const userList = {
  name: "user",
  age: 20,
  address: "서울시",
};
