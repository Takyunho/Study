// 1.  입력에 대한 이벤트 리스너 등록하기
// input 요소로부터 이벤트 리스너를 등록하여, 이벤트를 캐치 후, 입력받은 데이터를
// 배열에 순차적으로 담기

const todoInputElem = document.querySelector('.todo-input');
const todoListElem = document.querySelector('.todo-list');
const completeAllBtnElem = document.querySelector('.complete-all-btn'); // 9. 전체 완료 처리를 위해 만들어둔 버튼을 querySelector를 통해 checkAllBtnElem이라 선언
const leftItemsElem = document.querySelector('.left-items'); // 10. 남은 할 일 개수를 표시하는 요소를 querySelector를 사용하여 가져와 leftItemsElem이라 선언

/* 11.
All : 전체 투두리스트를 보여줌.
Active : 완료되지 않은 할 일 리스트를 보여줌.
Completed : 완료된 할 일 리스트를 보여줌.
Completed Clear : 완료된 할 일 리스트를 전체 투두리스트에서 삭제함.
*/
const showAllBtnElem = document.querySelector('.show-all-btn');	// All 버튼 
const showActiveBtnElem = document.querySelector('.show-active-btn'); // Active 버튼
const showCompletedBtnElem = document.querySelector('.show-completed-btn'); // Completed 버튼
const clearCompletedBtnElem = document.querySelector('.clear-completed-btn'); // Completed Clear 버튼


// 10. setLeftItems()라는 함수를 만들어 완료 처리가 되는 부분 마다 적용하여, 남은 할 일 개수를 갱신
// 현재 완료되지 않은 할 일 리스트를 반환한다.
const getActiveTodos = () => {
  return todos.filter(todo => todo.isCompleted === false);
}
const setLeftItems = () => {
  const leftTodos = getActiveTodos()
  const 남은투두길이 = leftTodos.length
  leftItemsElem.innerHTML = `${남은투두길이}개 남음`
}
// setLeftItems()함수를 todos의 배열의 길이와 완료상태가 변할 때 호출되는 함수[ 로드시실행(), appendTodos(), deleteTodo(), completeTodo(), onClickCompleteAll() ]에 각각 적용하자.

let todos = [];   // 할 일들을 담을 배열
let id = 0;       // 각각의 할 일들이 유니크하게 구별될 수 있는 키값을 설정하기 위해 선언

// 2. 할 일 추가하기
const setTodos = (newTodos) => {
  todos = newTodos;
}
const getAllTodos = () => {
  return todos;
}

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = getAllTodos().concat({ id: newId, isCompleted: false, content: text })
  //concat()을 사용하는 이유는 concat()은 기존 todos배열에 아무런 영향을 주지 않고 todos배열을 복사한 값에 추가한 할 일을 반환해주기 때문
  // 스프레드 연산자 사용할 경우
  // const newTodos = [...getAllTodos(), {id: newId, isCompleted: false, content: text }] 
  setTodos(newTodos) // 반환된 newTodos를 setTodos()라는 함수로 기존 todos배열을 변경시키기
  checkIsAllCompleted(); // 9. 전체 완료처리 확인
  setLeftItems(); // 10. 남은 할 일 개수 표시
  paintTodos();
}

// 5. 할 일 삭제하기
const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
  setTodos(newTodos);
  setLeftItems(); // 10. 남은 할 일 개수 표시
  paintTodos();
}

// 6. 할 일 완료하기
const completeTodo = (todoId) => {
  // Array map()을 사용하여 완료 처리를 하고자 하는 할 일의 isCompleted 값을 토글(true이면 false로, false면 true로) 처리하여 새로운 todos 배열을 저장
  const newTodos = getAllTodos().map(todo => todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo)
  setTodos(newTodos);
  setLeftItems(); // 10. 남은 할 일 개수 표시
  paintTodos();
  checkIsAllCompleted(); // 9. 전체 todos의 완료 상태를 파악하여 전체 완료 처리 버튼 CSS 반영
}

// 8. 투두업데이트(수정)하기
const updateTodo = (text, todoId) => {
  const currentTodos = getAllTodos();
  const newTodos = currentTodos.map(todo => todo.id === todoId ? ({ ...todo, content: text }) : todo);
  setTodos(newTodos);
  paintTodos();
}

// 7. 더블 클릭시 할 일 수정되게 하기
const onDbclickTodo = (e, todoId) => {
  const todoElem = e.target;
  const inputText = e.target.innerText;
  const todoItemElem = todoElem.parentNode;
  const inputElem = document.createElement('input');
  inputElem.value = inputText;
  inputElem.classList.add('edit-input');
  inputElem.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      updateTodo(e.target.value, todoId);
      document.body.removeEventListener('click', onClickBody); // 이벤트리스너 제거
      // onClickBody()함수는 event 객체를 인자로 받으며, event객체의 target이 수정 모드를 위해 생성한 inputElem이 아니라면, inputElem의 부모 요소인 todoElem에서 removeChild()를 사용하여 inputElem을 제거. 그런 다음 body 요소에 등록된 클릭 이벤트를 제거
    }
  })
  // 투두아이템 요소를 제외한 영역을 클릭시, 수정모드 종료하기
  const onClickBody = (e) => {
    if (e.target !== inputElem) {
      todoItemElem.removeChild(inputElem);
      document.body.removeEventListener('click', onClickBody);
    }
  }

  document.body.addEventListener('click', onClickBody) // body 클릭에 대한 이벤트 리스너 등록
  todoItemElem.appendChild(inputElem); // 투두아이템 요소에 자식 요소로 인풋요소 추가
}


// 9. 전체 완료처리
const getCompletedTodos = () => {
  return todos.filter(todo => todo.isCompleted === true);
}

let isAllCompleted = false; // 전체 todos 체크 여부

const setIsAllCompleted = (bool) => { isAllCompleted = bool };

const completeAll = () => {
  completeAllBtnElem.classList.add('checked');
  const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: true }))
  setTodos(newTodos)
}

const incompleteAll = () => {
  completeAllBtnElem.classList.remove('checked');
  const newTodos = getAllTodos().map(todo => ({ ...todo, isCompleted: false }));
  setTodos(newTodos)
}
// 전체 todos의 isCompleted 여부를 체크하여, 처리
// 새롭게 만든 checkIsAllCompleted()함수를 completeTodo()함수와 appendTodos()함수에 추가해야함
const checkIsAllCompleted = () => {
  if (getAllTodos().length === getCompletedTodos().length) {
    setIsAllCompleted(true);
    completeAllBtnElem.classList.add('checked');
  } else {
    setIsAllCompleted(false);
    completeAllBtnElem.classList.remove('checked');
  }
}

const onClickCompleteAll = () => {
  if (!getAllTodos().length) return; // todos배열의 길이가 0이면 return;

  if (isAllCompleted) incompleteAll(); // isAllCompleted가 true이면 todos를 전체 미완료 처리 
  else completeAll(); // isAllCompleted가 false이면 todos를 전체 완료 처리 
  setIsAllCompleted(!isAllCompleted); // isAllCompleted 토글
  paintTodos(); // 새로운 todos를 렌더링
}


// 11. onClickShowTodosType() + clearCompletedTodos() 구현 및 paintTodos() 수정
let currentShowType = 'all'; // all  | active | complete
const setCurrentShowType = (newShowType) => currentShowType = newShowType

const onClickShowTodosType = (e) => {

    const currentBtnElem = e.target;
    const newShowType = currentBtnElem.dataset.type; // 현재 클릭된 버튼 요소인 currentBtnElem의 dataset을 사용해 type을 가져오기

    if ( currentShowType === newShowType ) return;

    const preBtnElem = document.querySelector(`.show-${currentShowType}-btn`);
    preBtnElem.classList.remove('selected'); // 이전의 showType 버튼에 'selected' 클래스 네임을 제거

    currentBtnElem.classList.add('selected') // 새로운 showType 버튼에 'selected' 클래스 네임을 추가
    setCurrentShowType(newShowType) // setCurrentShowType()함수를 사용하여, currentShowType을 변경 
  paintTodos(); // paintTodos()함수를 사용하여 재 렌더링
  // 하지만, 기존의 paintTodos()함수는 현재 currentShowType에 따라 렌더링하지 않고, 전체 투두리스트를 렌더링함
  // 따라서 기존 paitTodos()함수를 switch-case문을 사용하여 currentShowType에 따라 렌더링 할 수 있도록 변경해야 함
}

// todos 배열을 현재 완료되지 않은 할 일 리스트로 변경해 준 후, paintTodos()함수로 투두리스트를 재 렌더링
const clearCompletedTodos = () => {
  const newTodos = getActiveTodos()
  setTodos(newTodos)
  paintTodos();
}


// 3. HTML에 추가된 할 일 그려주기
// 실질적으로 각각의 할 일이 렌더링 되는 함수는 paintTodo()함수로 분리
const paintTodo = (todo) => {
  const todoItemElem = document.createElement('li');
  todoItemElem.classList.add('todo-item');

  todoItemElem.setAttribute('data-id', todo.id );

  const checkboxElem = document.createElement('div');
  checkboxElem.classList.add('checkbox');
  checkboxElem.addEventListener('click', () => completeTodo(todo.id))

  const todoElem = document.createElement('div');
  todoElem.classList.add('todo');
  todoElem.addEventListener('dblclick', (event) => onDbclickTodo(event, todo.id))
  todoElem.innerText = todo.content;

  const delBtnElem = document.createElement('button');
  delBtnElem.classList.add('delBtn');
  delBtnElem.addEventListener('click', () =>  deleteTodo(todo.id))
  delBtnElem.innerHTML = 'X';

  if(todo.isCompleted) {
      todoItemElem.classList.add('checked');
      checkboxElem.innerText = '✔';
  }

  todoItemElem.appendChild(checkboxElem);
  todoItemElem.appendChild(todoElem);
  todoItemElem.appendChild(delBtnElem);

  todoListElem.appendChild(todoItemElem);
}
// 기존 paitTodos()함수를 다음과 같은 형태로 switch-case문을 사용하여 currentShowType에 따라 렌더링 할 수 있도록 변경
const paintTodos = () => {
  todoListElem.innerHTML = null;

  switch (currentShowType) {
      case 'all':
          const allTodos = getAllTodos();
          allTodos.forEach(todo => { paintTodo(todo);});
          break;
      case 'active': 
          const activeTodos = getActiveTodos();
          activeTodos.forEach(todo => { paintTodo(todo);});
          break;
      case 'completed': 
          const completedTodos = getCompletedTodos();
          completedTodos.forEach(todo => { paintTodo(todo);});
          break;
      default:
          break;
  }
}


// 1. 로드시실행 함수는 투두인풋요소에 'keypress'에 대한 이벤트 리스너를 등록시킴
const 로드시실행 = function () {
  todoInputElem.addEventListener('keypress', (e) => {
    // 만약 입력되는 값이 'Enter'라면 appendTodos()함수에 인풋의 값을 넘겨주고 투두인풋요소의 값을 초기화 함
    if (e.key === 'Enter') {
      appendTodos(e.target.value);
      todoInputElem.value = '';
    }
  })
  // All, Active, Completed 버튼에는 onClickShowTodosType()함수를 콜백으로 호출
  showAllBtnElem.addEventListener('click', onClickShowTodosType);
  showActiveBtnElem.addEventListener('click', onClickShowTodosType);
  showCompletedBtnElem.addEventListener('click', onClickShowTodosType);
  // Completed Clear 버튼에는 clearCompletedTodos()함수를 콜백으로 호출
  clearCompletedBtnElem.addEventListener('click', clearCompletedTodos);

  // 전체 완료처리를 위한 이벤트 리스너 등록
  completeAllBtnElem.addEventListener('click', onClickCompleteAll);
  setLeftItems();
}
로드시실행();