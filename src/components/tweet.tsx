import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import {  doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {  useRef, useState } from "react";

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
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: ; */
  width: 115px;
  /* gap: 5px; */
`;

const EditPhoto = styled.img`
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
  min-height: 108px;
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

const Form = styled.form`
/*   display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px; */
`;

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

const AttachFileInput = styled.input`
  display: none;
`;
const AddPhotoBtn = styled.label`
  color: white;
  display: block;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`
const EditPhotoBtn = styled.label`
  margin-top: 4px;
  float: left;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  border: 1px solid white;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`
const DeletePhotoBtn = styled.label`
  margin-top: 4px;
  float: right;
  color: white;
  font-weight: 600;
  border: 1px solid white;
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

export default function Tweet({photo, tweet, username, userId, docId}: ITweet) {
  const user = auth.currentUser;
  const [updateMode, setUpdateMode] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [editFile, setEditFile] = useState<File|null>(null)
  const [editPhoto, setEditPhoto] = useState<string|null|undefined>(photo)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onUpdate = () => {
    setUpdateMode(true);
  }
  const onCancel = () => {
    setEditPhoto(photo)
    setUpdateMode(false);
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value)
  }

  /**
   * 삭제 핸들러
   * @returns 
   */
  const onDelete = async() => {
    const ok = confirm("Are you sure you want to delete this?")
    if(!ok) return;
    setEditPhoto(undefined)
    setEditFile(null)
  }
  
  /**
   * 수정 후 저장 핸들러
   * @param e 
   * @returns 
   */
  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || editTweet === "" || editTweet.length > 180) return;

    try {
      /* 내용 */
      const tweetRef = doc(db, "tweets", docId);
      await updateDoc(tweetRef, {
        tweet: editTweet,
      });

      let url = null;
      /* 이미지 */
      if (editFile && editPhoto) {// 수정/추가
        const originRef = ref(storage, `tweets/${user.uid}/${docId}`);
        if(photo) await deleteObject(originRef); // 사진이 존재하면 storage에서 사진 삭제
        const locationRef = ref(storage, `tweets/${user.uid}/${docId}`);
        const result = await uploadBytes(locationRef, editFile);
        url = await getDownloadURL(result.ref);
      }

      if(!editPhoto) url = "" // 삭제

      await updateDoc(tweetRef, {photo: url,});

    } catch (e) {
      console.log(e);
    } finally {
      setUpdateMode(false);
    }
  }

  const onPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {files} = e.target;
    if(files && files.length === 1) {
      setEditFile(files[0])
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e:ProgressEvent<FileReader>) => {
        setEditPhoto(e.target?.result);
      }
    }
    return;
  }
  return(
    <Wrapper key={userId}>
      <Column1>
        <Username>{username}</Username>
        {updateMode ? 
        <Form onSubmit={onEditSubmit}>
        <TextArea required rows={5} maxLength={180} value={editTweet} onChange={onChange} placeholder="What is happening?"/>
        <LinedButton onClick={onCancel}>Cancel</LinedButton>&nbsp; 
        <FilledButton>Submit</FilledButton>
        </Form>
        :
        <>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? <LinedButton onClick={onUpdate}>Update</LinedButton> : null}&nbsp; 
        {user?.uid === userId ? <FilledButton onClick={onDelete}>Delete</FilledButton> : null}
        </>
        }
      </Column1>
      <Column2>
        {editPhoto ? 
        <>
          <EditPhoto src={editPhoto}/> 
            {updateMode && 
            <>
              <EditPhotoBtn onClick={() => fileInputRef.current?.click()} /* htmlFor="photo" */>Edit</EditPhotoBtn>
              <DeletePhotoBtn onClick={onDelete} >del</DeletePhotoBtn>
            </>
            } 
        </>
        : 
        updateMode && <AddPhotoBtn onClick={() => fileInputRef.current?.click()}>Add</AddPhotoBtn> 
        }

      </Column2>
      <AttachFileInput ref={fileInputRef} onChange={onPhotoChange} type="file" id="photo" accept="image/*"/>
    </Wrapper>
  );
}