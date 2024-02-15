import { collection,  getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { db } from "../routes/firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo?: string; //사진은 필수가 아니므로 ?처리
  tweet: string;
  userId: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  
`

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, "tweets"), 
      orderBy("createdAt", "desc") //createdAt 기준 내림차순
    )
    const querySnapshot = await getDocs(tweetsQuery);
    const tweets = querySnapshot.docs.map(doc=>{
     const{photo, tweet, userId, username, createdAt} = doc.data();
     return {
      photo,
      tweet,
      userId,
      username,
      createdAt,
      id: doc.id
     }
    })
    console.log(tweets)
    setTweets(tweets)
  }
  useEffect(()=>{
    fetchTweets();
  }, [])
  return <Wrapper>
    {tweets.map(tweet=><Tweet key={tweet.id} {...tweet}/>)}
  </Wrapper>
}