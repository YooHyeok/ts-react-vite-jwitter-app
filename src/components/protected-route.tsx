import { Navigate } from "react-router-dom"
import { auth } from "../routes/firebase"
import { useEffect } from "react";


/**
 * 로그인 한 사용자가 보게 될 컴포넌트
 * Home 컴포넌트와 Profile컴포넌트를 모두 보호한다.
 * @param {React.ReactNode} ProjectedRoute 컴포넌트에 감싸진 컴포넌트
 * @returns 로그인된 user라면 children / 실패시 login으로 리다이렉트
 */
export default function ProtectedRoute({children}: {children: React.ReactNode}) {

  const user = auth.currentUser // user 로그인 여부 - 로그인된 user값 혹은 null 반환
  console.log(user)
  if(!user) return <Navigate to="/login"/>
  return children
}