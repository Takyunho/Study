import { useState } from 'react';
import './App.css';

// ui의 업데이트는 상태로부터 시작되어야 한다.
// 상태는 개별적으로 관리해도 되지만 연관되는 데이터라면 객체로 관리하는 것이 좋다.
export default function AppForm() {
  const [user, setUser] = useState(userList)

  const handleChange = (e) => {
    // console.log(e)
    console.log(e.target)
    console.log(e.target.name)        // input의 name or email
    console.log(e.target.value)       // input의 value or value
    const { name, value } = e.target  // input의 e.target.name or e.target.email, e.target.value
    setUser({...user, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    console.log(user)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름</label>
      <input type="text" id='name' name='name' value={user.name} onChange={handleChange} />
      <label htmlFor="email">이메일</label>
      <input type="email" id='email' name='email' value={user.email} onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

const userList = {
  name: '',
  email: '',
}
