import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import styled from "styled-components"
import { auth } from "./firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column; /* flex 컨테이너내 아이템 배치 (Title과 Form을 column형태로 정렬) */
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`
const Title = styled.h1`
  font-size: 42px;
`
const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* flex 컨테이너내 아이템 배치 (input들을 column형태로 정렬) */
  gap: 10px;
  width: 100%;
`
const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width:100%;
  font-size: 16px;
  &[type="submit"] {/* type이 submit이라면 */
    cursor: pointer; /* cursor pointer효과 */
    &:hover { /* hover되었다면 */
      opacity: 0.8; /* 투명도를 0.8로 지정 */
    }
  }
`
const Error = styled.span`
  font-weight: 600;
  color: tomato;
`
const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`
export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if(name === "email") {
      setEmail(value)
    } else if(name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if(isLoading || email === "" || password === "") return;
    try {
      setLoading(true)
      // 로그인
      await signInWithEmailAndPassword(auth, email, password)
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
    console.log(email, password)
  }

  return (
  <Wrapper>
    <Title>Log into ❌</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading ? "Loading...." : "Log in"}/>
    </Form>
    {error !== "" ? <Error>{error}</Error>: null}
    <Switcher>
      Don't have na account?{" "}<Link to="/create-account">Create one &rarr;</Link>
    </Switcher>
  </Wrapper>
  )
}