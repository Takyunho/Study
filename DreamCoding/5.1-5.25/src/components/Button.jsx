import React from "react";

export default function Button({ text, onClick }) {
  console.log('button', text, 're-rendering');

  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    borderRadius: "20px",
    margin: "0.4rem",
  };
  
  return (
    <div>
      <button onClick={onClick} style={buttonStyle}>
        {text}
      </button>
    </div>
  );
}
