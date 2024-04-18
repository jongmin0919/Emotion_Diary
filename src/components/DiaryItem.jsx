import getEmotionImage from "../util/get-emotion-image"
import './DiaryItem.css'
import React, { useContext } from 'react'
import Button from "./Button"
import { useNavigate} from "react-router-dom"
import { DiaryDispatchContext } from "../App"

const DiaryItem = ({id, createDate, emotionId, content}) => {

  const { onDeleteDiary } = useContext(DiaryDispatchContext)

  const nav = useNavigate();

  return (
    <div className="DiaryItem" >
      <div onClick={() => {nav(`/diary/${id}`)}} className={`img_section img_section_${emotionId}`}>
        <img src={getEmotionImage(emotionId)}/>
      </div>
      <div onClick={() => { nav(`diary/${id}`)}} className="info_section">
        {/* 타임스탬프 형태로 변환된 값을 담은 프롭에 toLocaleDateString 메서드를 사용할 수 없기 때문에 Date 객체로 다시 변환해 준 후 사용.*/}
        <div className="created_date">{new Date(createDate).toLocaleDateString()}</div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => {nav(`/edit/${id}`)}} text={"수정하기"} />
        <Button onClick={() => {
          const alert = window.confirm("정말 삭제하시겠습니까?")
          if (alert) onDeleteDiary(id);
        }} text={"삭제하기"} type={"NEGATIVE"}/>
      </div>
    </div>
  )
}

export default DiaryItem
