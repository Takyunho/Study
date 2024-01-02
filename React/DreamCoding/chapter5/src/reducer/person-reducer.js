export default function personReducer(person, action) {
  switch (action.type) {
    case "updated": {
      const { prevName, currentName } = action;

      return {
        ...person,
        mentors: person.mentors.map((mentor) =>
          mentor.name === prevName ? { ...mentor, name: currentName } : mentor
        ),
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
      const { deleteName } = action;

      return {
        ...person,
        mentors: person.mentors.filter((mentor) => mentor.name !== deleteName),
      };
    }
      
    default: {
      throw Error(`알 수 없는 액션 타입: ${action.type}`);
    }
  }
}
