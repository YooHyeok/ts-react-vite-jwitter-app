import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./routes/firebase"
import styled from "styled-components"
import ProtectedRoute from "./components/protected-route"


const router = createBrowserRouter([
  {
    path:"/", 
    element: (
      <ProtectedRoute>
        <Layout/>
      </ProtectedRoute>
      ), /* 해당 컴포넌트 내의 Outlet 컴포넌트에 자식 path와 매핑되는 컴포넌트를 ㄹ. */
    children: [
      {
        path:"",
        element: <Home/> /* Layout컴포넌트의 Outlet에 매핑된다. */
      },
      {
        path:"profile",
        element: <Profile/> /* Layout컴포넌트의 Outlet에 매핑된다. */
      }
    ]
},
{
  path:"/login",
  element: <Login/>
},
{
  path: "/create-account",
  element: <CreateAccount/>
}
])

/**
 * 전체 높이 100% & 가운데 정렬
 */
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    /**
     * 인증준비 대기 (인증완료시 promise리턴) 
     * Firebase가 쿠기와 토큰을 읽고 백엔드와 소통해서 로그인여부를 확인하는 동안 대기한다.
     */
    await auth.authStateReady();
    // firebase 인증 대기 종료후 setIsLoading false처리
    setIsLoading(false);
  }
  useEffect(()=> {
    init()
  }, [])
  return (
    <Wrapper>
      {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
    </Wrapper>
  )
}

export default App
