import './App.css';
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Notfound from './pages/Notfound';
import Edit from './pages/Edit';

function reducer(diaryData, action) {
  
  let nextState;

  switch (action.type) {
    case 'INIT': return action.data
    case 'CREATE': {
      nextState = [...diaryData, action.data]
      break;
    }
    case 'UPDATE': {
      nextState = diaryData.map((item) => String(item.id) === String(action.data.id) ? action.data : item)
      break;
    }
    case 'DELETE': {
      nextState = diaryData.filter((item) => String(item.id) !== String(action.id))
      break;
    }
    default: return diaryData
  }
  // 각 데이터를 생성, 수정, 삭제할 때 마다 로컬스토리지에 저장하도록 nextState에 결과값을 로컬스토리지의 diary 키의 값으로 저장
  localStorage.setItem("diary", JSON.stringify(nextState))
  return nextState
}

export const DiaryStatesContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  // useEffect의 Dispatch로 localdata를 꺼내오는 작업이 진행되기 전에 useDiary에서 data의 값을 참고하기 때문에 존재하지 않는 일기라는 알람이 뜸
  // 그래서 해당 상태값에 따라 로딩중일 때 임시 문구를 출력하는 작업을 해줘야함
  const [isLoading, setIsLoading] = useState(true);

  const [ diaryData , dispatch ] = useReducer(reducer, []);
  const diaryId = useRef(0)

  // useEffect를 사용해 로컬스토리지에 읽어온 값을 diaryData의 초기값으로 설정
  useEffect(() => {
    
    const storedData = localStorage.getItem("diary");
    const parsedStoreData = JSON.parse(storedData)
    // 스토리지에 꺼내서 파싱한 값이 없는 경우 그대로 종료
    if (!parsedStoreData) {
      setIsLoading(false);
      return 
    }
    // 아래 forEach를 사용하기 위해서는 그 호출자가 배열이여야 함으로, 해당 스토리지의 반환값이 배열인지를 확인하기 위한 조건문
    if (!Array.isArray(parsedStoreData)) {
      setIsLoading(false);
      return;
    }
    // 아이템이 추가될 때 현재 diaryId(useRef)의 가장 큰 값에서 1을 더해주어 중복을 방지하도록 하기 위한 코드
    let maxId = 0;
    parsedStoreData.forEach((item) => {
      if(Number(item.id) <maxId) maxId = Number(item.id)
    })
    diaryId.current = maxId + 1;

    dispatch({
      type: "INIT",
      data : parsedStoreData
    })
    setIsLoading(false);
  }, [])

  // 새로운 일기 생성
  const onCreateDiary = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: diaryId.current++,
        //  ES6 단축 구문으로, 키와 값이 동일한 경우 전달하는 쪽의 키를 생략하고 값만 넘겨줘도 됨
        createDate,
        emotionId,
        content,
      }
    })
  }
  // 기존 일기 수정
  const onUpdateDiary = (id ,createDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data:{
        id ,createDate, emotionId, content
      }
    })
  }

  // 기존 일기 삭제
  const onDeleteDiary = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    })
  }


  // isLoading이 true, 즉 useEffect의 작업들이 완료되고 isLoading이 false로 전환된 상태가 아니라면 해당 문구를 출력
  // 만약 isLoading이 false라고하면 아래의 조건값은 무시하고 반환될 컴포넌트들을 렌더링
  if (isLoading === true) {
    return <div>데이터 로딩중입니다 ...</div>
  }
  return (
    <>
      <DiaryStatesContext.Provider value={diaryData}>
      <DiaryDispatchContext.Provider value={{ onCreateDiary, onDeleteDiary, onUpdateDiary }}>
        {/* Routes는 Link의 차이점은 사용자가 직접 검색할 수 있냐(Route), 클릭만 할 수 있냐(a태그의 특징)의 차이입니다.*/}
        <Routes>
        {/* 주로 path에는 사용자가 입력한 주소값(param)이 입력되는데, 콜론(:)의 경우 useParams로, 쿼리 스트링의 경우 useSearchParams로 해당 입력값을 받아 처리할 수 있습니다. */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
      </DiaryStatesContext.Provider>
    </>
  )
}

export default App;
