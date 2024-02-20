import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from "./firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-styled"
import GithubButton from "../components/github-btn"

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({email: '', password: ''})
  const [error, setError] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    setUserInfo(currentUserInfo => ({...currentUserInfo, [name]: value})) // 콜백 상태업데이트

  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if(isLoading || userInfo.email === "" || userInfo.password === "") return;
    try {
      setLoading(true)
      // 로그인
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      // 로그인 성공시 홈페이지 리다이렉트
      navigate("/")
    } catch (e) {
      if(e instanceof FirebaseError) { // 로그인 실패시
        console.log(e.code, e.message)
        setError(e.message)
      }
    } finally { // navigate에 의해 리다이렉트 되었더라도 무조건 실행된다.
      setLoading(false)
    }
  }

  return (
  <Wrapper>
    <Title>Log into ❌</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={userInfo.email} placeholder="Email" type="email" required/>
      <Input onChange={onChange} name="password" value={userInfo.password} placeholder="Password" type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading ? "Loading...." : "Log in"}/>
    </Form>
    {error !== "" ? <Error>{error}</Error>: null}
    <Switcher>
      Don't have na account?{" "}<Link to="/create-account">Create one &rarr;</Link>
    </Switcher>
    <GithubButton/>
  </Wrapper>
  )
}