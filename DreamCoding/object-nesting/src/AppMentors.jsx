import React, { useState } from 'react';

export default function AppMentors() {
  const [person, setPerson] = useState({
    name: '윤호',
    title: '개발자',
    mentors: [
      {
        name: 'John',
        title: '시니어 개발자'
      },
      {
        name: 'Bob',
        title: '시니어 개발자'
      }
    ]
  })
  return (
    <div>
      <h1>{person.name}는 {person.title}</h1>
      <p>{person.name}의 멘토는:</p>
      <ul>
        {person.mentors.map((mentor, index) => (
          <li key={index}>{mentor.name} ({mentor.title})</li>
        ))}
      </ul>
      <button onClick={() => {
        const prevName = prompt("누구의 이름을 바꾸고 싶은가요?")
        const current = prompt("이름을 무엇으로 바꾸고 싶은가요?")

        setPerson((prev) => ({
          ...prev,
          mentors: prev.mentors.map((mentor, index) => {
            // console.log(mentor)
            if (mentor.name === prevName) {
              return {
                ...mentor,
                name: current
              }
            } else {
              return mentor
            }
          })
           
        }))

        console.log(person)
      }}>멘토의 이름을 바꾸기</button>
    </div>
  );
}

