import './Editor.css'
import EmotionItem from "./EmotionItem"
import React from 'react'
import Button from './Button';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { emotionList } from './../util/constants';
import getStringedDate from './../util/get-stringed-date';


const Editor = ({initData, onSubmit}) => {
  
  const [input, setInput] = useState({
    createDate : new Date(),
    emotionId : 3,
    content : "",
  });

  const nav = useNavigate();

  useEffect(() => {
    // initData의 createDate의 값은 타임스탬프 형식의 값이고 setInput의 데이터 형식은 Date 객체 형식이기 때문에
    // 형식을 통일화 주기 위해서 initData의 createDate 값을 Date 객체로 변환하여 저장.
    // 단 해당 initData.createDate가 문자열로 전달될 수 있으므로 숫자로 변환 후 Date 객체로 변환
    if (initData) setInput({ ...initData, createDate : new Date(Number(initData.createDate)) })
  }, [initData])

  const onChangeInput = (e) => {

    let name = e.target.name
    let value = e.target.value
    // 인수로 전달되는 input의 date값은 getStringedDate메서드에 의해 문자 형식으로 변환되기 때문에 input 스테이트에 createdDate의 값으로 저장하기 위해서 Name이 createdDate 일때 그 값을 Date 객체로 변환해줌
    if(name === 'createDate') value = new Date(value)

    setInput({
      ...input,
      [name] : value
    })
  }

  const onClickSubmitButton = () => {
    onSubmit(input)
  }

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input onChange={onChangeInput} name = "createDate" value={getStringedDate(input.createDate)} type="date" />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => {
            return <EmotionItem
              // 사용자 정의 함수에서의 onClick은 단지 값(함수)을 넘겨주는 프롭스이기 때문에 전달 받는 쪽(EmotionItem)에서 해당 함수를 실제로 발동해야 합니다.
              onClick={() => {
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value : item.emotionId
                  }
                })
              }}
              key={item.emotionId} {...item} isSelected={item.emotionId === input.emotionId} />
          })} 
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content" value={input.content} onChange={onChangeInput} placeholder="오늘의 당신은 어땠나요?"></textarea>
      </section>
      <section className="button_section">
        {/* 직접적인 함수 호출일 경우 화살표 함수를, 아닐 경우 그냥 함수명만 작성 */}
        <Button onClick={() => nav(-1)} text={"취소하기"}/>
        <Button onClick={onClickSubmitButton} text={"작성완료"} type={"POSITIVE"}/>
      </section>
    </div>
  )
}

export default Editor
