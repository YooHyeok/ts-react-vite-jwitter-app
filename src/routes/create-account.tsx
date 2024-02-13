import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { Wrapper, Title, Form, Input, Error, Switcher } from "../components/auth-styled"
import { auth } from "./firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if(name === "name") {
      setName(value);
    } else if(name === "email") {
      setEmail(value)
    } else if(name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if(isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true)
      // 계정 생성
      const credentials = await createUserWithEmailAndPassword(auth, email, password) //인증객체, 이메일, 패스워드 FireBase에 전달 -> 인증성공시 자격증명 반환
      console.log(credentials.user)
      // 사용자 프로필이름 지정
      await updateProfile(credentials.user, {displayName: name,})
      // 회원가입 성공시 홈페이지 리다이렉트
      navigate("/")
    } catch (e) {
      // setError
      if(e instanceof FirebaseError) { // 회원가입 실패시
        console.log(e.code, e.message)
        setError(e.message)
      }
    } finally { // navigate에 의해 리다이렉트 되었더라도 무조건 실행된다.
      setLoading(false)
    }
    console.log(name, email, password)
  }

  return (
  <Wrapper>
    <Title>Join ❌</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required/>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
      <Input onChange={onChange} type="submit" value={isLoading ? "Loading...." : "Create Account"}/>
    </Form>
    {error !== "" ? <Error>{error}</Error>: null}
    <Switcher>
      Already have an account?{" "}<Link to="/login">Log in &rarr;</Link>
    </Switcher>
  </Wrapper>
  )
}