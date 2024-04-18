// vite를 사용할 때에는 이미지 파일을 assets 폴더에 넣으면 자동으로 최적화를 받을 수 있음 (원래는 public 폴더에 이미지를 넣고 경로를 적는 방식)
// 이미지를 assets 폴더에 넣고 사용을 하면 메모리 캐쉬가 딱 한 번 생성되어(재사용성) 매번 메모리 캐쉬가 생성되는 기존 방법보다 훨씬 생산적임.
// 결국 적은 양의 이미지는 assets 폴더에, 많은 양의 이미지일 경우 public 폴더를 사용할 필요가 있음.
import emotion1 from "./../assets/emotion1.png"
import emotion2 from "./../assets/emotion2.png"
import emotion3 from "./../assets/emotion3.png"
import emotion4 from "./../assets/emotion4.png"
import emotion5 from "./../assets/emotion5.png"

export default function getEmotionImage(emotionId){
  switch (emotionId) {
    case 1: return emotion1;
    case 2: return emotion2;
    case 3: return emotion3;
    case 4: return emotion4;
    case 5: return emotion5;
    default : return null;
    
  }
}