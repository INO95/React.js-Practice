import React, { useReducer, useMemo } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
//import useInputs from './hooks/useInput';
import produce from 'immer';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  // active값이 true도 되있는 애들만 따로 filter로 새로운 배열을 만들고 그 길이를 리턴한다
  return users.filter(user => user.active).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
      // {
      //   //action.user로 생긴 새로운 요소를 포함시킨 새로운 배열을 만듬 (concat)
      //   users: state.users.concat(action.user)
      // };
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });

      // {
      //   // 원래 배열의 불변성을 위해서 spread 연산자 이용해서 하나 새로 만듬
      //   ...state,
      //   // map 이용해서 요소의 상태 변경해준다
      //   users: state.users.map(user =>
      //     // id가 다를경우에는 그냥 user 반환
      //     // id가 일치할경우 false일때 누르면 true되고 true일때 누르면 false됨
      //     user.id === action.id ? { ...user, active: !user.active } : user
      //   )
      // };
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
      // {
      //   ...state,
      //   // 누른 아이디가 일치하지 않는 애들만 따로 (그니까 상관없는애들) 새로 filter로 뽑음
      //   users: state.users.filter(user => user.id !== action.id)
      // };
    default:
      return state;
  }
}

//Context API
// UserDispatch 라는 이름으로 내보내줍니다.
// 어디서든 dispatch를 꺼내어 쓸 수 있다.
export const UserDispatch = React.createContext(null);

function App() {
  // const [{ username, email }, onChange, onReset] = useInputs({
  //   username: '',
  //   email: ''
  // });
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  // useMemo : 연산한 값 재사용 
  // 첫 번쨰 파라미터는 어떻게 연산할지 정의하는 함수
  // 두 번째 파라미터는 deps 배열
  // 밑에 활성사용자수 나타내는거임
  const count = useMemo(() => countActiveUsers(users), [users]);

  // const onCreate = useCallback(() => {
  //   dispatch({
  //     type: 'CREATE_USER',
  //     user: {
  //       id: nextId.current,
  //       username,
  //       email
  //     }
  //   });
  //   onReset();
  //   nextId.current += 1;
  // }, [username, email, onReset]);


  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser

      />
      <UserList users={users} />
      <div>활성사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;


// import React, { useRef, useReducer, useMemo, useCallback } from 'react';
// import UserList from './UserList';
// import CreateUser from './CreateUser';
// import useInputs from './hooks/useInput';

// function countActiveUsers(users) {
//   console.log('활성 사용자 수를 세는중...');
//   return users.filter(user => user.active).length;
// }

// const initialState = {
//   // inputs: {
//   //   username: '',
//   //   email: ''
//   // },
//   users: [
//     {
//       id: 1,
//       username: 'velopert',
//       email: 'public.velopert@gmail.com',
//       active: true
//     },
//     {
//       id: 2,
//       username: 'tester',
//       email: 'tester@example.com',
//       active: false
//     },
//     {
//       id: 3,
//       username: 'liz',
//       email: 'liz@example.com',
//       active: false
//     }
//   ]
// };

// function reducer(state, action) {
//   switch (action.type) {
//     // case 'CHANGE_INPUT':
//     //   return {
//     //     ...state,
//     //     inputs: {
//     //       ...state.inputs,
//     //       [action.name]: action.value
//     //     }
//     //   };
//     case 'CREATE_USER':
//       return {
//         //inputs: initialState.inputs,
//         users: state.users.concat(action.user)
//       };
//     case 'TOGGLE_USER':
//       return {
//         //...state,
//         users: state.users.map(user =>
//           user.id === action.id ? { ...user, active: !user.active } : user
//         )
//       };
//     case 'REMOVE_USER':
//       return {
//         //...state,
//         users: state.users.filter(user => user.id !== action.id)
//       };
//     default:
//       return state;
//   }
// }

// //UserDispatch라는 이름으로 내보내줍니다.
// export const UserDispatch = React.createContext(null);

// function App() {

//   const [{ username, email}, onChange, reset] = useInputs({
//     username : '',
//     email : ''
//   })

//   const [state, dispatch] = useReducer(reducer, initialState);
//   const nextId = useRef(4);

//   const { users } = state;
//   //const { username, email } = state.inputs;

//   // const onChange = useCallback(e => {
//   //   const { name, value } = e.target;
//   //   dispatch({
//   //     type: 'CHANGE_INPUT',
//   //     name,
//   //     value
//   //   });
//   // }, []);

//   const onCreate = useCallback(() => {
//     dispatch({
//       type: 'CREATE_USER',
//       user: {
//         id: nextId.current,
//         username,
//         email
//       }
//     });
//     nextId.current += 1;
//   }, [username, email, reset]);

//   const onToggle = useCallback(id => {
//     dispatch({
//       type: 'TOGGLE_USER',
//       id
//     });
//   }, []);

//   const onRemove = useCallback(id => {
//     dispatch({
//       type: 'REMOVE_USER',
//       id
//     });
//   }, []);

//   const count = useMemo(() => countActiveUsers(users), [users]);
//   return (
//     <>
//       <CreateUser
//         username={username}
//         email={email} 
//         onChange={onChange}
//         onCreate={onCreate}
//       />
//       <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
//       <div>활성사용자 수 : {count}</div>
//     </>
//   );
// }

// export default App;


// // import React, {useRef, useState, useReducer, useMemo, useCallback} from 'react';
// // import Hello from './Hello';
// // import './App.css';
// // import Wrapper from './Wrapper';
// // import Counter from './Counter';
// // import InputSample from './InputSample';
// // import UserList from './UserList';
// // import CreateUser from './CreateUser';

// // function countActiveUsers(users) {
// //   console.log('활성 사용자 수를 세는 중...');
// //   return users.filter(user =>  user.active).length;
// // }

// // const initialState = {
// //   inputs: {
// //     username: '',
// //     email: ''
// //   },
// //   users: [
// //     {
// //       id: 1,
// //       username: 'velopert',
// //       email: 'public.velopert@gmail.com',
// //       active: true
// //     },
// //     {
// //       id: 2,
// //       username: 'tester',
// //       email: 'tester@example.com',
// //       active: false
// //     },
// //     {
// //       id: 3,
// //       username: 'liz',
// //       email: 'liz@example.com',
// //       active: false
// //     }
// //   ]
// // };
// // function reducer(state, action) {
// //   switch (action.type) {
// //     case 'CHANGE_INPUT':
// //       return {
// //         ...state,
// //         inputs: {
// //           ...state.inputs,
// //           [action.name]: action.value
// //         }
// //       };
// //     default:
// //       return state;
// //   }
// // }
// // function App() {
// //   const [state, dispatch] = useReducer(reducer, initialState);  
// //   const { users } = state;
// //   const { username, email } = state.inputs;

// //   const onChange = useCallback(e => {
// //     const { name, value } = e.target;
// //     dispatch({
// //       type: 'CHANGE_INPUT',
// //       name,
// //       value
// //     });
// //   }, []);

// //   const onCreate = useCallback(() => {
// //     dispatch({
// //       type: 'CREATE_USER',
// //       user: {
// //         id: nextId.current,
// //         username,
// //         email
// //       }
// //     });
// //     nextId.current += 1;
// //   }, [username, email]);

// //   const [inputs, setInputs] = useState({
// //     username : '',
// //     email : ''
// //   });
// //   //const {username, email} = inputs;
// //   // const onChange = useCallback(
// //   //   e => {
// //   //   const {name, value} = e.target;
// //   //   setInputs({
// //   //     ...inputs,
// //   //     [name]: value
// //   //   });
// //   // },
// //   // []
// //   // ); 
// //   // const [users, setUsers] = useState([
// //   //   {
// //   //     id: 1,
// //   //     username: 'velopert',
// //   //     email: 'Public.Velopert@gamil.com',
// //   //     active: true
// //   // },
// //   // {
// //   //     id: 2,
// //   //     username: 'velopert2',
// //   //     email: 'Public.Velopert@gamil.com2',
// //   //     active: false
// //   // },
// //   // {
// //   //     id: 3,
// //   //     username: 'velopert3',
// //   //     email: 'Public.Velopert@gamil.com3',
// //   //     active: false
// //   // }
// //   // ]);

// //   const nextId = useRef(4);
// //   // const onCreate = useCallback(() => {
// //   //   const user = {
// //   //     id : nextId.current,
// //   //     username,
// //   //     email
// //   //   };
  
// //     //spread 연산자 사용
// //     // setUsers([...users, user]);
// //     //setUsers([...users.concat(user)]);

// //   //   setInputs({
// //   //     username : '',
// //   //     email : ''
// //   //   });
// //   //   nextId.current += 1;
// //   // }, [username, email]);

// //   const onRemove = useCallback (
// //   id => {
// //     // user.id가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
// //     // = user.id 가 id 인것을 제거함
// //     //setUsers(users.filter(user => user.id !== id));
// //   }, [users]);

// //   const onToggle = useCallback( 
// //     id => {
// //     // setUsers(
// //     //   users.map(user =>
// //     //     // id값을 비교해서 다르다면 그대로 두고, 같다면 active 값을 반전시킨다.
// //     //     user.id === id ? {...user, active: !user.active} : user
// //     //     )
// //     // );
// //   }, 
// //   []
// //   );
  

// //   const count = useMemo(() => countActiveUsers(users), [users]);

// //   const name = 'react';
// //   const style = {
// //     backgroundColor: 'black',
// //     color: 'aqua',
// //     fontSize: 24, // 기본 단위 px
// //     padding: '1rem' // 다른 단위 사용 시 문자열로 설정
// //   }

// //   return (
// //     <>
// //       <CreateUser
// //         username={username}
// //         email={email}
// //         onChange={onChange}
// //         onCreate={onCreate}
// //       />
// //       <UserList users={users} />
// //       <div>활성사용자 수 : 0</div>
// //       {/* <CreateUser 
// //         username={username}
// //         email={email}
// //         onChange={onChange}
// //         onCreate={onCreate}
// //         /> */}
// //       {/* <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
// //       <div>활성사용자 수 : {count}</div> */}
// //       <InputSample />
// //       <Counter />
// //       {/* 주석은 화면에 보이지 않습니다 */}
// //       /* 중괄호로 감싸지 않으면 화면에 보입니다 */
// //       {/* props 전달 : 일종의 파라미터라고 보면 될 것 같다. */}
// //       <Wrapper>
// //       {/* true는 자바스크립트 값이라서 {}로 감싸준다. */}
// //       {/* isSpecial 값을 지정하지 않을 경우 true로 취급된다. */}
// //       <Hello name = "react" color = "red" isSpecial={true}
// //         // 열리는 태그 내부에서는 이렇게 주석을 작성 할 수 있습니다.
// //       />
// //       <div style={style}>{name}</div>
// //       <Hello color="pink"/>
// //       </Wrapper>
// //       <div className="gray-box"></div>
// //     </>
// //   );
// // }

// // export default App;