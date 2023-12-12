import React, { useReducer } from "react";
import personReducer from "./reducer/person-reducer";
import Button from "./components/Button";

//^ 5.19 성능 개선에 대한 단상
// 리액트 자체는 상태가 업데이트되면 재렌더링 되지만 실제 DOM 요소에서는 변경이 일어나지 않는다.
// // 그리고 리액트 내부적으로 변경이 일어나는 부분을 찾아서 실제로 값이 변경된 경우에만 실제 DOM 요소에 반영하도록 구현되어 있다.
// 따라서, 수많은 자식 컴포넌트를 갖고 있고, 무거운 일을 하는 컴포넌트가 아니면 너무 성능개선을 하려고 하지 않아도 된다.
// 수많은 자식 컴포넌트를 가지고 있거나 for 루프 등 무거운 일을 하는 경우에는 useCallback이나 useMemo를 이용해서 매번 호출되지 않도록 만들 수 있다.


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
  const [person, dispatch] = useReducer(personReducer, initialPerson);

  const changeMentorName = () => {
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const currentName = prompt("이름을 무엇으로 바꾸고 싶나요?");
    dispatch({ type: "updated", prevName, currentName }); // dispatch의 인자가 action이 된다.
  };

  const addMentor = () => {
    const newName = prompt("멘토의 이름은?");
    const newTitle = prompt("멘토의 직업은?");
    dispatch({ type: "added", newName, newTitle });
  };

  const deleteMentor = () => {
    const deleteName = prompt("삭제하고자 하는 멘토를 입력해주세요.");
    dispatch({ type: "deleted", deleteName });
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
      {/* 아래의 Button 컴포넌트는 상태가 변하면 리 렌더링 된다. */}
      <Button text='멘토 이름 바꾸기' onClick={changeMentorName}></Button>
      <Button text='멘토 추가하기' onClick={addMentor}></Button>
      <Button text='멘토 삭제하기' onClick={deleteMentor}></Button>
      {/* <button onClick={changeMentorName}>멘토 이름 바꾸기</button>
      <button onClick={addMentor}>멘토 추가하기</button>
      <button onClick={deleteMentor}>멘토 삭제하기</button> */}
    </div>
  );
}
