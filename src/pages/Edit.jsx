import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DiaryDispatchContext, DiaryStatesContext } from "../App";
import useDiary from "../hooks/useDiary";
import usePageTitle from "../hooks/usePageTitle";

export default function Edit() {
  
  // DiaryItem의 수정하기 버튼에는 클릭 이벤트로 네비게이터 (nav(`/edit/${id}`))가 구현되었기 때문에 해당 edit 페이지를 이동하는 동시에
  // useParams를 이용해 주소 뒤의 id값을 입력 받을 수 있게 됩니다.
  const params = useParams();
  const nav = useNavigate(params.id);
  usePageTitle(`${params.id}번 일기 수정`)
  
  const curDiaryItem = useDiary(params.id)
    // 삭제버튼 발동시 삭제 과정을 처리하는 클릭 이벤트 핸들러 생성
  const { onDeleteDiary, onUpdateDiary } = useContext(DiaryDispatchContext)
  const onDeleteAlert = () => {
    const answer = window.confirm("정말 삭제하시겠습니까?")
    if (answer) {
      onDeleteDiary(params.id)
      nav('/',{replace:true})
    }
  }
  const onSubmit = (input) => {
    const answer = window.confirm("일기를 수정하시겠습니까?")
    if (answer) {
      onUpdateDiary(params.id, input.createDate.getTime(), input.emotionId, input.content)
      nav("/", {replace : true})
    }
    
  }
  
  return (
  <div>
    <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={<Button onClick={onDeleteAlert} text={"삭제하기"} type={"NEGATIVE"}/>}
      />
      <Editor onSubmit={onSubmit} initData = {curDiaryItem} />
  </div>
  )
}
