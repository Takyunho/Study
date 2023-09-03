import React from "react";
import { useImmer } from 'use-immer';

//------------- immer 라이브러리를 사용해서 상태관리하기
// 복잡한 상태를 관리하지 않는다면 immer를 사용하지 않아도 되지만,
// 중첩되고 복잡한 객체가 있고, 그걸 직관적으로 관리하고 싶다면 immer를 사용하는 것이 좋다.

export default function AppMentors() {
  const [person, updatePerson] = useImmer(initialPerson) 

  const handleUpdate = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const current = prompt("이름을 무엇으로 바꾸고 싶은가요?");
    
    // immer를 사용하면, state를 직접 변경하는 것처럼 보이지만,
    // 실제로는 draft라는 임시 객체를 만들어서 변경하고, 변경된 draft를 새로운 state로 만들어준다.
    updatePerson((person) => {
      const mentor = person.mentors.find((m) => m.name === prevName); // mentors 배열에서 prevName과 일치하는 멘토를 찾는다.
      mentor.name = current; // 찾은 멘토의 이름을 current로 바꾼다.
    })

    console.log(person);
  };

  const handleAdd = () => {
    const newName = prompt("추가할 멘토의 이름을 적어주세요.");
    const newTitle = prompt("멘토의 직업을 적어주세요.");
    
    updatePerson((person) => {
      person.mentors.push({ name: newName, title: newTitle });
    });

    console.log(person);
  };

  const handleDelete = () => {
    const removeName = prompt("삭제할 이름을 적어주세요");
    
    updatePerson((person) => {
      const removeIndex = person.mentors.findIndex((m) => m.name === removeName);
      console.log(removeIndex);
    })
    console.log(person)
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
