import React from 'react'
import Button from "./Button"
import DiaryItem from "./DiaryItem"
import './DiaryList.css'
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const DiaryList = ({ data }) => {
  
  const nav = useNavigate();
  // 사용자가 select의 값을 선택함에 따라 해당 값을 보관할 state를 생성 및 함수로 변경해주는 역할
  const [sortType, setSortType] = useState("latest")
  const onChangeSortType = (e) => {
    setSortType(e.target.value)
  }

  // 반환값 없이 원본 배열만 바꾸는 sort와는 반대로 toSorted는 원본 배열의 변경 없이 정렬된 배열을 반환함.
  const getSortedDate = () => {
    // 객체 간의 비교에는 정렬 메서드가 제대로 동작되지 않으므로 그 조건을 콜백 함수로 직접 정의함.
    return data.toSorted((a, b) => {
      // 정렬 메서드는 두 매개변수의 연산 결과값이 음수일 때 자리변경이 일어나기 때문에, 자리올림을 위해서 다음과 같이 작성해 줍니다.
      if (sortType === 'oldest') return Number(a.createDate) - Number(b.createDate);
      else return Number(b.createDate) - Number(a.createDate);
    })
  }

  const sortedData = getSortedDate();
  console.log(sortedData)


  return (
    
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value="latest">최신 순</option>
          <option value="oldest">오래된 순</option>
        </select>
        <Button onClick={() => nav(`/new`)} text={"새 일기 작성"} type={'POSITIVE'}/>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => 
          <DiaryItem key={item.id} {...item}/>
        )}
      </div>
    </div>
    
  )
}

export default DiaryList
