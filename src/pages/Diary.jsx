import React from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import getStringedDate from './../util/get-stringed-date';
import usePageTitle from "../hooks/usePageTitle";

export default function Diary() {

  const nav = useNavigate();
  // useParams는 브라우저에 명시된 파라미터(:)의 값을 가져오는 커스텀 훅임. {params.id}로 사용 가능
  const params = useParams();

  usePageTitle(`${params.id}번 일기 기록`)

  const curDiaryItem = useDiary(params.id)
  // useDiary는 포함 함수인 useEffect보다 먼저(렌더링 전에) 실행되기 때문에 undefined를 반환하므로 이에 대해서 대비를 해야함
  if (!curDiaryItem) {
    return <div>데이터 로딩중...</div>
  }

  // 위의 조건에 걸리지 않은 경우, 즉 정상적으로 useDiary의 반환값을 받은 경우 구조 분해 할당으로 해당 값들을 추가 후 화면 렌더링
  const { createDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createDate))

  return (
    <div>
      <Header title={`${title} 기록`}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={() => nav(`/edit/${params.id}`)} text={"수정하기"} />} />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  )
}
