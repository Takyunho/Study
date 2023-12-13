import React, { useCallback, useReducer } from "react";
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

  //^ 5.20 성능 개선 해보기 (useMemo, useCallback, React.memo)
  //@ useCallback을 이용해서 매번 호출되지 않도록 만들 수 있다. (함수의 재생성을 막음)
  //@ useCallback을 아무리 호출해도 디펜던시가 변하지 않는 이상 동일한 콜백함수의 객체를 가지게 된다.

  const changeMentorName = () => {
    console.log("useCallback")
    const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
    const currentName = prompt("이름을 무엇으로 바꾸고 싶나요?");
    dispatch({ type: "updated", prevName, currentName }); // dispatch의 인자가 action이 된다.
  }
  // const changeMentorName = useCallback(() => {
  //   console.log("useCallback")
  //   const prevName = prompt("누구의 이름을 바꾸고 싶은가요?");
  //   const currentName = prompt("이름을 무엇으로 바꾸고 싶나요?");
  //   dispatch({ type: "updated", prevName, currentName }); // dispatch의 인자가 action이 된다.
  // }, []);

  const addMentor = useCallback(() => {
    const newName = prompt("멘토의 이름은?");
    const newTitle = prompt("멘토의 직업은?");
    dispatch({ type: "added", newName, newTitle });
  }, []);

  const deleteMentor = useCallback(() => {
    const deleteName = prompt("삭제하고자 하는 멘토를 입력해주세요.");
    dispatch({ type: "deleted", deleteName });
  }, []);

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
      {/*
      //@ prop을 전달하는 경우, 컴포넌트를 호출할 때 마다 prop의 값이 변경되지 않더라도 새로운 props라는 객체가 생성된다. 즉, 아래에서 text와 onClick이 컴포넌트가 호출될 때마다 새로운 props객체로 만들어져서 Button 컴포넌트로 전달되는 것이다.
      따라서, Button 컴포넌트는 매번 새로운 props를 받게 되고, Button 컴포넌트는 매번 리렌더링 된다.
      //* 이를 방지하기 위해 React.memo를 사용한다.
      //@ React.memo는 props라는 객체가 새로 만들어지더라도 이전에 받았던 props 객체와 비교해서 값이 변경되지 않았다면 리렌더링 하지마~ 라고 메모하는 것
      즉, React.memo를 사용하면 props가 변경되지 않는 이상 리렌더링이 되지 않는다!

      //@ 사용법
      // 1. 함수 표현식에서 함수 선언식으로 바꾼다. (화살표 함수 이용)
      // 2. memo로 감싸준다.
      */}
      <Button text="멘토 이름 바꾸기" onClick={changeMentorName}></Button>
      <Button text="멘토 추가하기" onClick={addMentor}></Button>
      <Button text="멘토 삭제하기" onClick={deleteMentor}></Button>
    </div>
  );
}
