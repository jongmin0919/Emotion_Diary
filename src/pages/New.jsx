import Button from "../components/Button";
import Header from "../components/Header";
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Editor from "../components/Editor";
import usePageTitle from "../hooks/usePageTitle";

  const New = () => {

  const {onCreateDiary} = useContext(DiaryDispatchContext)
  const nav = useNavigate();
  
  usePageTitle("새 일기 쓰기")
    
  const onSubmit = (input) => {
    onCreateDiary(input.createDate.getTime(), input.emotionId, input.content);
    // 뒤로 가기를 방지하기 위해 두번째 매개변수로 replace옵션을 true로 설정해서 이전 히스토리 대신 '/' 경로를 덮어 씌우고 이동.
    nav('/', {replace : true});
  }
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        // useNavitage의 인자로 -1을 입력하면 뒤로, 1을 입력하면 앞으로 이동합니다. (단계별 이동 가능)
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
      />
    <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New;