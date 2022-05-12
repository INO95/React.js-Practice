import React, { useRef, useContext } from 'react';
import { UserDispatch } from './App';
import useInputs from './hooks/useInput';

//유저를 만드는 함수 객체 생성
const CreateUser = () => {
    const [{ username, email}, onChange, reset] = useInputs({
        username : '',
        email : ''
    });

    //새로만든 유저의 id
    const nextId = useRef(4);
    //dispatch를 사용하기 위해 context api 설정
    const dispatch = useContext(UserDispatch);

    const onCreate = () => {
        dispatch({
            type : 'CREATE_USER',
            user : {
                id : nextId.current,
                username,
                email
            }
        });
        reset();
        nextId.current += 1;
    };

    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input 
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
};

export default React.memo(CreateUser);

// function CreateUser({username, email, onChange, onCreate}){
    
//     const nextId = useRef(4);
//     //user 컴포넌트에서 바로 dispatch를 사용하기 위해 useContext라는 Hook을 사용해서 우리가 만든
//     // UserDispatch Context를 조회해야한다.
//     const dispatch = useContext(UserDispatch);
//     return (
//         <div>
//             <input
//                 name = "username"
//                 placeholder="계정명"
//                 onChange={onChange}
//                 value={username}
//             />
//             <input
//                 name = "email"
//                 placeholder="이메일"
//                 onChange={onChange}
//                 value={email}
//             />
//             <button onClick={onCreate}>등록</button>
//         </div>
//     );
// }

// export default React.memo(CreateUser);