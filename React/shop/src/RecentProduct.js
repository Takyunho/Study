/* eslint-disable */
import React, { useState } from 'react';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Detail from './Detail';


function RecentProduct(props) {

  // 상위 컴포넌트에서 하위 컴포넌트로
  // let [최근상품, 최근상품변경] = useState([]);

  return (
    <div className='mt-3'>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.최근상품 + 1) + '.jpg'}
        width='100%'></img>
      {/* <p>{props.shoes.title}</p> */}
    </div>
  )
}
<li>

</li>
export default RecentProduct;