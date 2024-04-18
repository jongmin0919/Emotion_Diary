import { useEffect } from "react"

const usePageTitle = (title) => {
  useEffect(() => {
    // $기호를 네이밍 앞에 붙인 이유는 관례상 해당 돔 요소가 저장될 변수라는 것을 알리기 위함.
      const $title = document.getElementsByTagName("title")[0]
      $title.innerText = title;
  }, [title])
}

export default usePageTitle

