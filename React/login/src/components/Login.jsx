import React, { useState } from "react";
// import { useCookies } from "react-cookie";
import { setCookie, getCookie, removeCookie } from "../utils/cookie.js";

export default function Login() {
  const [user, setUser] = useState({ id: "", password: "" });
  // const [cookies, setCookie] = useCookies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // name속성값 id와 password / value 값

    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const login = async (event) => {
    event.preventDefault();

    const userData = {
      id: user.id,
      password: user.password,
    };

    console.log(userData);

    const loginURL = "http://121.65.104.214:3000/api/auth/login";

    try {
      const res = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const getUserData = await res.json();
      console.log(getUserData);

      if (getUserData.status_code === 200) {
        setCookie("access_token", getUserData.data.access_token, {
          path: "/",
          maxAge: 12 * 60 * 60 * 1000,
          sameSite: true,
        });
      } else {
        alert(getUserData.message);
      }
    } catch (error) {
    } finally {
    }
  };

  const logout = async () => {
    const logoutURL = "http://121.65.104.214:3000/api/auth/logout";

    try {
      const res = await fetch(logoutURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const logoutData = await res.json();
      console.log(logoutData);

      if (logoutData.status_code === 200) {
        alert(logoutData.message);
        removeCookie("access_token");
        // 로그인 페이지로 redirect 필요
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const getCookie = () => {
    console.log(getCookie("access_token"));
  };

  return (
    <>
      <form onSubmit={login}>
        <label htmlFor="userId">아이디</label>
        <input
          type="text"
          id="userId"
          name="id"
          placeholder="id"
          required
          value={user.id}
          onChange={handleChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          placeholder="passWord"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">전송</button>
      </form>
      <button onClick={getCookie}>가져오기</button>
      <button onClick={logout}>logout</button>
    </>
  );
}
