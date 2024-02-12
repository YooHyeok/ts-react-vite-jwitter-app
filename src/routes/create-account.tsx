import { useState } from "react"
import styled from "styled-components"

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
export default function CreateAccount() {

  const [error, setError] = useState("")

  return (
  <Wrapper>
    <Title>Log into❌</Title>
    <Form>
      <Input name="name" placeholder="Name" type="text" required/>
      <Input name="email" placeholder="Email" type="email" required/>
      <Input name="password" placeholder="Password" type="password" required/>
      <Input type="submit" value={"Create Account"}/>
    </Form>
    {error !== "" ? <Error>{error}</Error>: null}
  </Wrapper>
  )
}