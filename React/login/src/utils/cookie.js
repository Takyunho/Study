// 0. npm install react-cookie
// 1. 쿠키 관련 함수 만들기 (만든 set, get 함수로 쿠키를 저장하고 이용하면 됨)
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (tokenName, value, option) => {
  return cookies.set(tokenName, value, { ...option });
}

export const getCookie = (tokenName) => {
  return cookies.get(tokenName);
}

export const removeCookie = (name) => {
  return cookies.remove(name);
};