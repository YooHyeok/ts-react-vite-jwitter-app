import { GithubAuthProvider, signInWithPopup } from "firebase/auth"
import {styled} from "styled-components"
import { auth } from "../routes/firebase"
import { Error } from "./auth-styled"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { FirebaseError } from "firebase/app"

const Button = styled.span`
  margin-top: 50px;
  background-color: white;
  font-weight: 500;
  width: 100%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover { /* hover되었다면 */
      opacity: 0.8; /* 투명도를 0.8로 지정 */
    }
`
const Logo = styled.img`
  height: 25px;
`
export default function GithubButton() {
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const onClick = async() => {
    try {
      setError("")
      const provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider); // 팝업
      // await signInWithRedirect(auth, provider); // 페이지로이동
      navigate("/")
    } catch (e) {
      if(e instanceof FirebaseError) { // 로그인 실패시
        // console.log(e.code, e.message)
        setError(e.message)
      }
    }
  }

  return (
    <>
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Contiune with Github
    </Button>
    {error !== "" ? <Error>{error}</Error>: null}
    </>
    )
}