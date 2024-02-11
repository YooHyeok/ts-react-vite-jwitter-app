import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./routes/create-account"


const router = createBrowserRouter([
  {
    path:"/", 
    element: <Layout/>, /* 해당 컴포넌트 내의 Outlet 컴포넌트에 자식 path와 매핑되는 컴포넌트를 ㄹ. */
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



function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
