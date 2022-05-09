import React from "react";
// 리액트 컴포넌트를 만들 땐 위 명령문으로 임포트 해주어야만 한다.
// 함수형태, 클래스형태로도 작성 가능하다.
// XML 형식의 값을 반환해줄 수 있고 이를 JSX라고 부른다. 

function Hello(){
    return <div>안녕하세요. </div>
}

// 이 코드는 Hello라는 컴포넌트를 내보내겠다는 의미. 다른 컴포넌트에서도 사용 가능해진다.
export default Hello;