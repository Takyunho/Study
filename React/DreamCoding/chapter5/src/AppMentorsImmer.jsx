import React, { useState } from "react";
import {useImmer} from "use-immer";

//^ 5.13 Immer 사용해보기
// useReducer보다 좀 더 직관적으로 사용할 수 있다.
// 무조건 useImmer를 사용하는 것보다는 데이터의 구조가 복잡하면 사용
const initialPerson = {
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
};

export default function AppMentors() {
  const [person, updatePerson] = useImmer(initialPerson);

  const changeMentorName = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const currentName = prompt("이름을 무엇으로 바꾸고 싶나요?");

    updatePerson((person) => {
      // mentors에서 prevName을 찾아서 currentName으로 바꾸기
      //@ find 메소드 이용
      const mentor = person.mentors.find((mentor) => mentor.name === prevName);
      mentor.name = currentName;
    })

  };

  const addMentor = () => {
    const newName = prompt("멘토의 이름은?");
    const newTitle = prompt("멘토의 직업은?");

    const newMentor = {
      name: newName,
      title: newTitle,
    };

    updatePerson((person) => {
      //@ immer 라이브러리를 사용하는 경우 push 메소드 사용 가능
      person.mentors.push(newMentor);
    })
  };

  const deleteMentor = () => {
    const deleteName = prompt("삭제하고자 하는 멘토를 입력해주세요.");

    updatePerson((person) => {
      // mentors에서 deleteName을 찾아서 삭제하기
      //@ 해당하는 인덱스를 찾아서 splice 메소드를 이용해 삭제
      const index = person.mentors.findIndex((m) => m.name === deleteName);
      if (index !== -1) person.mentors.splice(index, 1);
      // if (index !== -1) => 멘토 삭제 시 실제 멘토 이름 중 존재하지 않는 이름을 입력했을 때 마지막 배열 원소가 삭제되는 것을 방지
    })
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
      <button onClick={addMentor}>멘토 추가하기</button>
      <button onClick={deleteMentor}>멘토 삭제하기</button>
    </div>
  );
}
