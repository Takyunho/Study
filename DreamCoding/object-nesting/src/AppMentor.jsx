import { useState } from "react";
import "./App.css";

export default function AppMentor() {
  const [person, setPerson] = useState({
    name: "yun",
    title: "웹개발자",
    mentor: {
      name: "밥",
      title: "개발고수",
    },
  });

  return (
    <div>
      <h1>
        {person.name}은 {person.title}
      </h1>
      <p>
        {person.name}의 멘토는 {person.mentor.name} ({person.mentor.title})
      </p>
      <button
        onClick={() => {
          const name = prompt("이름을 입력하세요");
          setPerson((prev) => ({ 
            ...prev,
            mentor: {
              ...prev.mentor,   // 나머지 값들을 전개 연산자를 통해 전부 가져오기
              name: name        // key와 value가 같기 때문에 name으로 축약 가능 

              // title: prev.mentor.title
              // title: person.mentor.title
            }
          }));
          console.log(person)
        }}
      >
        멘토 이름 바꾸기
      </button>

      <button
        onClick={() => {
          const title = prompt("타이틀을 입력하세요");
          setPerson(prev => ({
            ...prev,
            mentor: {
              ...prev.mentor,
              title: title    // title로 축약 가능
            }
          }));
          console.log(person)
        }}
      >
        멘토 타이틀 바꾸기
      </button>
    </div>
  );
}
