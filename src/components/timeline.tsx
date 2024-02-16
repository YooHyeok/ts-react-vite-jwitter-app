import { DocumentData, QuerySnapshot, collection,  getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { db } from "../routes/firebase";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

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
  // const fetchTweets = async () => {
  //   const tweetsQuery = query(
  //     collection(db, "tweets"), 
  //     orderBy("createdAt", "desc") //createdAt 기준 내림차순
  //   )

  //   /**
  //    * Firebase 쿼리기반 데이터 조회
  //    * getDocs
  //    * 조회할 컬렉션과 조건을 지정하여 쿼리를 생성후 getDocs함수의 매개변수로 넘겨 쿼리에대한 spanshot객체를 전달받는다.
  //    * 해당 snapshot 객체로부터 각 도큐먼트의 데이터를 조회할 수 있게 된다.
  //    */
  //   const querySnapshot = await getDocs(tweetsQuery);
  //   const tweets = getTweets(querySnapshot)
  //   setTweets(tweets)
  // }

  const getTweets = (snapshot: QuerySnapshot<DocumentData>) => {
    return snapshot.docs.map(doc=>{
      const{photo, tweet, userId, username, createdAt} = doc.data();
        return {
          photo,
          tweet,
          userId,
          username,
          createdAt,
          id: doc.id
        };
      })
  }

  useEffect(()=>{
    let unsubscribe: Unsubscribe|null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"), 
        orderBy("createdAt", "desc"), //createdAt 기준 내림차순
        limit(25) // 25개의 데이터만 가져와 비용을 절약한다.
      )
      /**
       * Firebase 쿼리기반 데이터 조회
       * onSnapshot - firebase realtime
       * 데이터베이스 및 쿼리와 실시간 연결을 생성하고, 해당 쿼리에 새 요소가 생성되거나 요소가 삭제되었거나 또는 업데이트 됐을 때 쿼리에 알려준다.
       * 문서를 한 번만 가져오는 대신 쿼리에 리스너를 추가한다.
       * 그리고 무언가 삭제, 편집 또는 생성되었다는 알림을 받으면 해당 쿼리의 문서에서 필요한 데이터를 추출한다.
       * unsubscribe (구독취소) 함수를 반환한다
       */
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        // snapshot으로부터  마지막 스냅샷 이후의 변경사항(크기, 쿼리, 메타데이터, 문서 등)을 볼 수 있다.
        // snapshot.docChanges // 변경사항 을 배열로 반환한다. (변경사항으로 작업을 분기처리할 수 있음..) 
        const tweets = getTweets(snapshot)
          setTweets(tweets)
      })
    }
    fetchTweets();

    /* useEffect 클린업 함수 */
    return () => {
      unsubscribe && unsubscribe(); // 사용자가 해당 컴포넌트를 해제하면 구독을 취소하여 리소스 비용을 절감한다.
    }
  }, [])
  return <Wrapper>
    {tweets.map(tweet=><Tweet key={tweet.id} {...tweet}/>)}
  </Wrapper>
}