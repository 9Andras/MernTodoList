import {createContext, useReducer} from "react";

export const TodoContext = createContext();

export const todosReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TODOS':
            return {
                todos: action.payload
            }
        case 'CREATE_TODO':
            return {
                todos: [action.payload, ...state.todos]
            }
        case 'EDIT_TODO':
            return {
                todos: state.todos.map((todo) =>
                    todo._id === action.payload._id ? action.payload : todo
                )
            }
        case 'DELETE_TODO':
            return {
                todos: state.todos.filter((todo) => todo._id !== action.payload._id)
            }
        case 'MARK_TODO_DONE':
            return {
                todos: state.todos.map((todo) =>
                    todo._id === action.payload._id ? {...todo, done: !todo.done} : todo)
            }
        default:
            return state;
    }
}

export const TodoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(todosReducer, {
        todos: null
    });

    return (
        <TodoContext.Provider value={{...state, dispatch}}>
            {children}
        </TodoContext.Provider>
    );
}
