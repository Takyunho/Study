import React, { useReducer } from "react";
import personReducer from "./reducer/person-reducer";

//------------- useReducer 사용하기

export default function AppMentors() {
  // const [person, setPerson] = useState(initialPerson);
  const [person, dispatch] = useReducer(personReducer, initialPerson);

  //~ dispatch로 action을 보내서 reducer를 통해 state를 변경할 수 있다.
  const handleUpdate = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const current = prompt("이름을 무엇으로 바꾸고 싶은가요?");
    dispatch({type: 'updated', prevName, current})
    console.log(person);
  };

  const handleAdd = () => {
    const newName = prompt("추가할 멘토의 이름을 적어주세요.");
    const newTitle = prompt("멘토의 직업을 적어주세요.");
    dispatch({type: 'added', newName, newTitle})
    console.log(person);
  };

  const handleDelete = () => {
    const removeName = prompt("삭제할 이름을 적어주세요");
    dispatch({type: 'deleted', removeName})
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
