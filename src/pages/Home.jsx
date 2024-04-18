import React, { useState, useContext } from 'react'
import { DiaryStatesContext } from "../App"
import Header from "../components/Header"
import Button from "../components/Button"
import DiaryList from "../components/DiaryList"
import usePageTitle from "../hooks/usePageTitle"

const getMonthlyData = (pivotDate, data) => {
  const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
  // Date의 입력 요소 중에 일을 입력하는 곳에 0을 입력할 경우 해당 달의 바로 전 마지막 일로 간주됨
  const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime();
  return data.filter((item) => {
    // item의 생성 날짜(createDate)가 해당하는 달의 시작일과 종료일 사이만 골라 화면에 출력
    return beginTime <= item.createDate && endTime >= item.createDate
  })
}

export default function Home() {
  const data = useContext(DiaryStatesContext);
  const [pivotDate, setPivotDate] = useState(new Date())
  usePageTitle(`감정 일기장`)

  const monthlyData = getMonthlyData(pivotDate, data);
  console.log(monthlyData)

  // Date 객체의 프로퍼티 getMonth의 반환값은 0 ~ 11의 범위를 벗어나면 이전 년도(-1)나 다음 년도(12)로 자동으로 넘어갑니다.
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1))
  }

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + -1))
  }

  return (
    <div>
      <Header title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
        rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
}
