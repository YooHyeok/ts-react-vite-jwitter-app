import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";

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
    height: 115px;
  /* gap: 5px; */
`;

const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
`
const EditPhoto = styled.img`
/* position: relative;
  top:20px; */
  margin-top: 25px;
  border-radius: 15px;
  width: 100%;
  height: 100%;
  object-fit: cover; 
`;
const Username = styled.span`
  line-height: 20px;
  font-weight: 600;
  font-size: 15px;
  color : white;
`;

const CreatedAt = styled.span`
  line-height: 20px;
  font-weight: 600;
  font-size: 15px;
  color : gray;
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

const ProfileArea = styled.div`
display: grid;
/* width: 200px; */
grid-template-columns: 1fr 15fr;
`;

const PhotoArea = styled.label`
  width: 20px;
  height: 20px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #1d9bf0;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width:50%;
  }
`
export default function Tweet({avatar, photo, tweet, username, userId, docId, createdAt}: ITweet) {
  const user = auth.currentUser;
  const [updateMode, setUpdateMode] = useState(false);
  const [editTweet, setEditTweet] = useState(tweet);
  const [editFile, setEditFile] = useState<File|null>(null)
  const [editPhoto, setEditPhoto] = useState<string | null>()
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createdAtFormat = (createdAt: string) => {
    /* const date = new Date(createdAt);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24시간 형식
    };

    const format = date.toLocaleDateString('ko-KR', options)
    .replace(/\./g, '').replace(/ /g, '.')
    const lastDotIndex = format.lastIndexOf('.');
    return `${format.slice(0, lastDotIndex)} ${format.slice(lastDotIndex + 1)}`; */

    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1
    const day = date.getDate()
    const formattedDate = `${year}.${month}.${day}`;

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;

  }

  const onUpdate = () => {
    setEditPhoto(photo)
    setUpdateMode(true);
  }
  const onCancel = () => {
    setEditPhoto(photo)
    setUpdateMode(false);
  }
  /* 게시글 삭제 */
  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this tweet?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweets", docId));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${docId}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.log(e);
    } finally {
      //
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweet(e.target.value)
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
      if (editFile && editPhoto != photo) {// [수정/추가] - 수정내역이 있고, src가 같지 않으면 
        const originRef = ref(storage, `tweets/${user.uid}/${docId}`);
        if(photo) await deleteObject(originRef); // 사진이 존재하면 storage에서 사진 삭제
        const locationRef = ref(storage, `tweets/${user.uid}/${docId}`);
        const result = await uploadBytes(locationRef, editFile);
        url = await getDownloadURL(result.ref);
        setEditFile(null)

      } else if (!editFile && editPhoto != photo) { // [삭제] - src가 다르고, 수정내역이 없으면
        url = null;

      } else if (!editFile && editPhoto == photo){ // [유지] 수정내역이 없고 src가 같으면 기존사진
        url = photo;

      }
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
        setEditPhoto((e.target?.result as string | null) ?? null);
      }
    }
  }

  /**
   * 삭제 핸들러
   * @returns 
   */
  const onPhotoDelete = async() => {
    const ok = confirm("Are you sure you want to delete this?")
    if(!ok) return;
    setEditPhoto(undefined)
    setEditFile(null)
  }

  return(
    <Wrapper key={userId}>
      <Column1>
        
        <ProfileArea>
          <PhotoArea>
           {avatar && avatar != "" ? <AvatarImg src={avatar}/> : <DefaultAvatar/>}
          </PhotoArea>
          {/* <div><Username>{username}</Username>{' '}<CreatedAt>{createdAt}</CreatedAt></div> */}
          <div><Username>{username}</Username>{' '}<CreatedAt>{createdAtFormat(createdAt)}</CreatedAt></div>
        </ProfileArea>
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
        {updateMode ? /* Update모드가 아니면 기존 프로필만 출력 */
        <>
          {editPhoto ? 
          <>
            <EditPhoto src={editPhoto}/>
              {updateMode && 
              <>
                <EditPhotoBtn onClick={() => fileInputRef.current?.click()} /* htmlFor="photo" */>Edit</EditPhotoBtn>
                <DeletePhotoBtn onClick={onPhotoDelete} >del</DeletePhotoBtn>
              </>
              } 
          </>
          : 
          // updateMode && <AddPhotoBtn onClick={() => fileInputRef.current?.click()}>Add</AddPhotoBtn> 
          <AddPhotoBtn onClick={() => fileInputRef.current?.click()}>Add</AddPhotoBtn> 
          }
        </>
        : photo? <EditPhoto src={photo}/> : null }

      </Column2>
      <AttachFileInput ref={fileInputRef} onChange={onPhotoChange} type="file" id="photo" accept="image/*"/>
    </Wrapper>
  );
}
function DefaultAvatar() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
</svg>
}