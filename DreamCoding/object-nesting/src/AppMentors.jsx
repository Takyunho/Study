import React, { useState } from "react";

// 배열과 객체를 이용한 CRUD
export default function AppMentors() {
  const [person, setPerson] = useState(initialPerson);

  const handleUpdate = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const current = prompt("이름을 무엇으로 바꾸고 싶은가요?");
    setPerson((prev) => ({
      ...prev,
      mentors: prev.mentors.map((mentor, index) => {
        if (mentor.name === prevName) {
          return {
            ...mentor,
            name: current,
          };
        }
        return mentor;        
      }),
    }));
    console.log(person);
  };

  const handleAdd = () => {
    const newName = prompt("추가할 멘토의 이름을 적어주세요.");
    const newTitle = prompt("멘토의 직업을 적어주세요.");
    const newMentor = {
      name: newName,
      title: newTitle,
    };
    setPerson((person) => ({
      ...person,
      //^ 1. concat을 사용한 방법
      // mentors: person.mentors.concat(newMentor)
      //^ 2. spread operator를 사용한 방법
      mentors: [...person.mentors, newMentor],
    }));
    console.log(person);
  };

  const handleDelete = () => {
    const removeName = prompt("삭제할 이름을 적어주세요");
    setPerson((person) => ({
      ...person,
      mentors: person.mentors.filter((mentor) => mentor.name !== removeName),
      // filter메소드를 이용해서 mentors배열에서 removeName과 같은 이름을 가진 멘토를 제외한 배열을 반환한다.
    }));
  };

  return (
    <div>
      <h1>
        {person.name}는 {person.title}
      </h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>
            {mentor.name} ({mentor.title})
          </li>
        ))}
      </ul>
      <button onClick={handleUpdate}>멘토의 이름을 바꾸기</button>
      <button onClick={handleAdd}>멘토 추가</button>
      <button onClick={handleDelete}>멘토 삭제</button>
    </div>
  );
}

const initialPerson = {
  name: "윤호",
  title: "개발자",
  mentors: [
    {
      name: "John",
      title: "시니어 개발자",
    },
    {
      name: "Bob",
      title: "시니어 개발자",
    },
  ],
};
