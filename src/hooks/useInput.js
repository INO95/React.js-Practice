// 커스텀 Hooks를 만들 때에는 보통 이렇게 use라는 키워드로 시작하는 파일을 만든다
// useReducer로 구현
import { useCallback, useReducer } from "react";

function reducer(state, action){
    switch (action.type){
        case 'CHANGE' :
            return {
                ...state,
                [action.name] : action.value
            };
        case 'RESET':
            return Object.keys(state).reduce((acc, current) => {
                acc[current] = '';
                return acc;
            }, {});

        default:
            return state;
    }
}

function useInputs(initialForm) {
    const [form, dispatch] = useReducer(reducer, initialForm);
    const onChange = useCallback(e => {
        const { name, value} = e.target;
        dispatch({type: 'CHANGE', name, value});
    }, []);
    // change
    // const onChange = useCallback(e => {
    //     const { name, value } = e.target;
    //     setForm(form => ({ ...form, [name]: value}));
    // }, []);

    const reset = useCallback(() => dispatch({type : 'RESET'}));
    return [form, onChange, reset]
}

export default useInputs;