import styled from "styled-components"

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column; /* flex 컨테이너내 아이템 배치 (Title과 Form을 column형태로 정렬) */
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`
export const Title = styled.h1`
  font-size: 42px;
`
export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* flex 컨테이너내 아이템 배치 (input들을 column형태로 정렬) */
  gap: 10px;
  width: 100%;
`
export const Input = styled.input`
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
export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`
export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`