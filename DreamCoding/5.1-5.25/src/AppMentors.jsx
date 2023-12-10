import React, { useState } from "react";

//^ 5.7 ~ 5.8 배열 상태 관리

export default function AppMentors() {
  const [person, setPerson] = useState({
    name: "윤호",
    title: "개발자",
    mentors: [
      {
        name: "엘리",
        title: "시니어 개발자",
      },
      {
        name: "헤로피",
        title: "시니어 개발자",
      },
    ],
  });

  const changeMentorName = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const currentName = prompt("이름을 무엇으로 바꾸고 싶나요?");

    setPerson((prevPerson) => ({
      ...prevPerson,
      mentors: prevPerson.mentors.map((mentor) =>
        mentor.name === prevName ? { ...mentor, name: currentName } : mentor
      ),
    }));

    //@ 리액트에서 사용하는 모든 상태는 불변성을 유지해야 한다.
    //@ 상태의 객체나 배열의 내부 내용을 직접적으로 업데이트 하면 안되고, 새로운 객체나 배열을 만들어서 업데이트 해야 한다.
    //@ 그래야 리액트가 상태가 업데이트 되었음을 감지하고, 리렌더링을 할 수 있다. (값을 아무리 바꿔봤자 객체나 배열이 만들어 졌을 때의 참조값이 그대로이면 리렌더링이 되지 않는다.)
  };
  console.log(person);

  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>{person.name}의 멘토는 :</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <button onClick={changeMentorName}>멘토 이름 바꾸기</button>
    </div>
  );
}
