import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
  <>
    <Outlet/> {/* children을 뿌려준다. */}
  </>
  )
}