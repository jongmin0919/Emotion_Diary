import { useContext, useEffect, useState } from "react"
import { DiaryStatesContext } from "../App"
import { useNavigate } from "react-router-dom"

// id를 전달하면 해당하는 id에 맞는 정보를 찾아 curDiaryItem 스테이트에 저장하는 커스텀 훅
const useDiary = (id) => {
 // 페이지가 렌더링 될 때 getCurruentDiaryItem()는 currentDiaryItem에 호출 되는데, 이때에는 컴포넌트가 다 렌더린 되지 않은 상태이므로 nav가 제대로 동작되지 않음.
  // 그래서 useEffect를 이용해 렌더링이 다 끝난 후에 해당 함수를 호출하게 해야함.
  const data = useContext(DiaryStatesContext)
  // 현재 페이지 정보를 담을 스테이트 생성
  const [curDiaryItem, setCurDiaryItem] = useState();

  const nav = useNavigate()

  useEffect(() => {
    const currentDiaryItem = data.find((item) => String(item.id) === String(id))
    //  !currentDiaryItem라는건 사용자가 페이지를 잘못 들어왔다는 것, 즉 주소창에 잘못 입력했다는 것을 의미.
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.")
      nav('/', {replace : true})
    }
    setCurDiaryItem(currentDiaryItem)
  }, [id, data])

  return curDiaryItem;
}

export default useDiary