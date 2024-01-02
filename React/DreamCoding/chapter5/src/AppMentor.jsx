import React, { useState } from "react";

//^ 5.5 중첩 객체 상태 관리(멘토 바꾸기)
const personObj = {
  name: "윤호",
  title: "개발자",
  mentor: {
    name: "엘리",
    title: "시니어 개발자",
  },
};

export default function AppMentor() {
  const [person, setPerson] = useState(personObj);

  const changeMentorName = () => {
    const name = prompt(`what's your mentor's name?`);
    setPerson((prevPerson) => ({
      ...prevPerson,
      mentor: {
        ...prevPerson.mentor, //* name보다 먼저 기재해야됨
        name,
      },
    }));
  };
  console.log(person);

  const changeMentorTitle = () => {
    const title = prompt(`what's your mentor's title?`);

    setPerson((prevPerson) => ({
      ...prevPerson,
      mentor: {
        ...prevPerson.mentor,
        title,
      },
    }));
  };

  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>
        {person.name}의 멘토는 {person.mentor.name} ({person.mentor.title})
      </p>
      <button onClick={changeMentorName}>멘토 이름 바꾸기</button>
      <button onClick={changeMentorTitle}>멘토 타이틀 바꾸기</button>
    </div>
  );
}
