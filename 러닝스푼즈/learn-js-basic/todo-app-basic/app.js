// function App() {
//   // 초기의 TODO값
//   const todos = [
//     { contents: '공부하기', done: false },
//     { contents: '놀기', done: true },
//     { contents: '밥먹기', done: false }
//   ];
// }

//@ App이라는 함수가 존재할 수도 있으니까 즉각호출패턴으로 보호
(function () {
  // 초기의 TODO값
  const todos = [
    { contents: '공부하기', done: false },
    { contents: '놀기', done: true },
    { contents: '밥먹기', done: false }
  ];
  console.log(todos);

  countLeftTodo(todos)
  addTodo(todos, '잠자기');
  makeDone(todos[0]);

  console.log(todos);

  // 할일 더하기
  function addTodo(todos, contents) { // 배열과 콘텐츠를 파라미터로 받아서
    const newTodo = {
      contents: contents,
      done: false
    };
    todos.push(newTodo);
  }

  // done으로 만들기
  function makeDone(todo) {
    todo.done = true;
  }

  // 남은 할일의 개수를 구하는 함수
  // function countLeftTodo(todos) {
  //   let leftCount = 0;
  //   for (let i = 0; i < todos.length; i++) {
  //     const todoEl = todos[i];
  //     if(todoEl.done === false) leftCount++;
  //   }
  //   return leftCount;
  // }
  //# reduce함수를 이용하여 위의 countLeftTodo함수를 축약할 수 있음
  function countLeftTodo(todos) {
    return todos.reduce((prev, curr) => (curr.done === false) ? prev + 1 : prev, 0)
  }
})();