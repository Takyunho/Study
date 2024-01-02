import { Outlet } from 'react-router-dom'

const Event = () => { 

  return (
    <div>
      <h2>오늘의 이벤트</h2>   
      <Outlet></Outlet>
      {/* nested Routes를 사용하려면 Outlet도 같이 사용해야함 (그래야 보임)*/}
      {/* <Outlet>은 nested routes안의 element들을 어디에 보여줄지 표기하는 곳 */}
      {/* Outlet 자리에 route에 적은 것들이 보임 */}
      {/* 유사한 서브페이지들이 많이 필요할 때 사용하면됨 */}
    </div>

  )


}

export default Event