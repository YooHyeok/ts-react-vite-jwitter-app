import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
  <>
    <h2>header</h2>
    <Outlet/> {/* children을 뿌려준다. */}
    <h2>footer</h2>
  </>
  )
}