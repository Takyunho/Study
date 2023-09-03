import React from "react";
import Avatar from "./Avatar";

// Navbar의 파라미터로 부모 컴포넌트에서 내용을 전달받는다.
export default function Navbar({ children }) {
  return (
    <header style={{ backgroundColor: "royalblue" }}>
      {/* <Avatar
        image="https://images.unsplash.com/photo-1602033350291-a9ab8d800269?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fCVFQyU5NiVCQyVFQSVCNSVCNHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        name="john"
        size={200}
      ></Avatar> */}
      {children}
    </header>
  );
}
