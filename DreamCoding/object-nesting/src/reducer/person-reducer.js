// 함수(state, action)
export default function personReducer(person, action) {
  switch (action.type) {

    case "updated": {
      const { prevName, current } = action;
      return {
        ...person,
        mentors: person.mentors.map((mentor, index) => {
          if (mentor.name === prevName) {
            return {
              ...mentor,
              name: current,
            };
          }
          return mentor;
        }),
      };
    }

    case "added": {
      const { newName, newTitle } = action;
      const newMentor = {
        name: newName,
        title: newTitle,
      };
      return {
        ...person,
        mentors: [...person.mentors, newMentor],
      };
    }

    case "deleted": {
      const { removeName } = action;
      return {
        ...person,
        mentors: person.mentors.filter((mentor) => mentor.name !== removeName),
      };
    }

    default: {
      throw Error(`알 수 없는 액션: ${action}`);
    }
  }
}
