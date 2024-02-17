import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column1 = styled.div`
`;
const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const Photo = styled.img`
/* position: relative;
  top:20px; */
  margin-top: 25px;
  width: 115px;
  height: 115px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin: 10px 0px;
  min-height: 40px;
  font-size: 18px;
`;

const FilledButton = styled.button`
  background-color: tomato;
  color: white;
  font-weight: 600;
  border: 1px solid tomato;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
  `

const LinedButton = styled.label`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid tomato;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 5px;
  margin: 10px 0px;
  min-height: 40px;
  height: 100%;
  max-height: 106px;
  border-radius: 20px;
  font-size: 17.5px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;


const EditPhotoBtn = styled.label`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid tomato;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`

export default function Tweet({photo, tweet, username, userId, docId}: ITweet) {
  const user = auth.currentUser;
  const [updateMode, setUpdateMode] = useState(false);
  const onUpdate = () => {
    setUpdateMode(true);
  }
  const onCancel = () => {
    setUpdateMode(false);
  }
  const onSubmit = () => {
    setUpdateMode(false);
  }

  const onDelete = async() => {
    const ok = confirm("Are you sure you want to delete this?")
    if(!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", docId))
      if(photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${docId}`)
        await deleteObject(photoRef)
      }
    } catch (error) {
      console.log(error)
    } finally {
      // ToDos..
    }
  }

  return(
    <Wrapper>
      <Column1>
        <Username>{username}</Username>
        {updateMode ? 
        <>
        <TextArea required rows={5} maxLength={180} value={tweet} placeholder="What is happening?"/>
        <LinedButton onClick={onCancel}>Cancel</LinedButton>&nbsp; 
        <FilledButton onClick={onSubmit}>Submit</FilledButton>
        </>
        :
        <>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? <LinedButton onClick={onUpdate}>Update</LinedButton> : null}&nbsp; 
        {user?.uid === userId ? <FilledButton onClick={onDelete}>Delete</FilledButton> : null}
        </>
        }
      </Column1>
      {photo? 
      <Column2>
        <Photo src={photo}/>
        {updateMode ? <EditPhotoBtn>Edit</EditPhotoBtn> : null}
      </Column2> 
      : null}
    </Wrapper>
  );
}