import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/Login.css";


const LOGIN_API = 'http://203.243.17.90:5001/login';
const SIGNUP_API = 'http://203.243.17.90:5001/register';


const Login = () => {

  let [userID, setUserID] = useState('');
  let [userPW, setUserPW] = useState('');
  let navigate = useNavigate();

  const setIdVal = (event) => { 
    // console.log(event.target.value);
    setUserID(event.target.value);
  }
  const setPwVal = (event) => {
    setUserPW(event.target.value);
  }

  // fetch
  

  return (
      <div className='login-container'>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input id="id-input" type="text" name="" required="" placeholder='Username' onChange={setIdVal} />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="" required="" placeholder='Password' onChange={setPwVal} />
              <label>Password</label>
          </div>
          <button className='login-btn'>로그인</button>
        </form>
        <button className='findId-btn'>아이디 찾기</button>
        <button className='findPw-btn'>비밀번호 찾기</button>
        <button className='signUp-btn' onClick={() => { navigate('/register')}}>회원가입</button>
      </div>
    </div>
    
    

    
  );
}

export default Login;
