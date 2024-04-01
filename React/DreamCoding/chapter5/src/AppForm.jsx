import React, { useState } from "react";

//@ 5.14 Form을 만드는 방법
// 리액트의 모든 UI는 상태의 변경으로부터 발생한다.
// 그러나 입력폼은 상태가 변경되지 않아도 바로 UI가 변경된다.
// => 이러한 것을 uncontrolled component 라고 한다. (통제되지 않는 컴포넌트)
// 따라서, 상태를 통제할 수 있도록 만들어주어야 한다.
// 1. 상태를 만든다. useState 이용 => 연관된 값이면 객체로 관리하는 것이 좋다.
// 2. input의 value에 상태를 연결한다.
// 3. input의 onChange 이벤트를 통해 상태를 변경한다.
// 4. form의 onSubmit 이벤트에서는 새로고침을 막는다.
// 5. form의 onSubmit 이벤트를 통해 상태를 서버로 보낸다.

export default function AppForm() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log(form)
  };

  const handleChange = (e) => {
    //@ 1. e.target에서 name과 value를 추출
    const { name, value } = e.target; // input의 name속성값과 value속성 값 추출
    console.log(e.target)
    console.log(name) // 여기서 name은 form.name이 아니라, input의 name속성값임(name, email이 된다.)
    console.log(value)

    //@ 2. setForm을 통해 상태 변경
    setForm((prev) => ({
      ...prev,
      [name]: value, //* name이 name이면 form.name이 되고, name이 email이면 form.email이 된다.
    }))
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">이름:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <label htmlFor="email">이메일:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <button>Submit</button>
    </form>
  );
}
