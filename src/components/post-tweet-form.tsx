import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { auth, db, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Error } from "./auth-styled";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

const FirstRow = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  /* padding: 20px; */
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;  
`;
const Column1 = styled.div`
`;
const Column2 = styled.label`
  width: 150px;
  min-height: 150px;
  line-height: 150px;
  max-height: 150px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
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
const Photo = styled.img`
/* position: relative;
  top:20px; */
  /* margin-top: 25px; */
  width: 150px;
  height: 150px;
  border-radius: 15px;
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const [fileError, setFileError] = useState("");
  const [photo, setPhoto] = useState<string|null>(null);

  useEffect(()=>{
    if(fileError !== ""){
      setTimeout(()=>{
        setFileError("")
      }, 5000)
    } 
  }, [fileError])

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    
    if(files && files.length === 1) {
      if (files[0].size > 1024 ** 2) {
        setFileError("File size too big (Max 1MB)");
        return;
      }
      setFile(files[0])
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e:ProgressEvent<FileReader>) => {
        setPhoto(e.target?.result);
      }
    }
  }

  const onDeletePhoto = () => {
    setFile(null)
    setPhoto(null)
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if(!user || isLoading || tweet === "" || tweet.length > 180) return; // 함수 조기 종료
    try {
      setIsLoading(true)
      const dbCollection = collection(db, "tweets"); // collection(): Fire Store로부터 tweets 컬렉션 반환
      const doc = await addDoc(dbCollection, {// addDoc(): Fire Store에 새로운 Document 생성함수 - 생성할 컬렉션, 필드 및 데이터 추가
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous", // 닉네임이 존재하지 않으면 Anonymous 반환
        userId: user.uid // 트윗을 삭제하기 위한 작성자와 로그인한 userid일치여부

      }) 
      if(file) {
        // const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`)//파일에 대한 저장 위치
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`)//파일에 대한 저장 위치
        const result = await uploadBytes(locationRef, file); //저장위치와 파일을 매개변수로 담아 Byte로 변환하여 저장한다.
        const url = await getDownloadURL(result.ref);
        updateDoc(doc, {photo:url}) // 저장한 file URL을 저장되었던 Document에 다시 저장
      }
      setTweet("")
      setFile(null)
    } catch(e) {
      console.log(e)
    } finally {
      setIsLoading(false);
    }
  }
  return <Form onSubmit={onSubmit}>
    <FirstRow>
      <Column1>
        <TextArea required rows={5} maxLength={180} onChange={onChange} value={tweet} placeholder="What is happening?"/>
      </Column1>
      <Column2 htmlFor="file">
        {
          photo ? <Photo src={photo} /> : "사진 첨부 클릭"
        }
      </Column2>
    </FirstRow>
    <AttachFileButton onClick={onDeletePhoto}>{"Init Photo"}</AttachFileButton>
    <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
    {fileError !== "" ? <Error>{fileError}</Error> : null}
    <SubmitBtn type="submit" value={isLoading ? "Posting..." : "Post Tweet"}/>
  </Form>
}