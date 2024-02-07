import {TodoContext} from "../context/TodoContext";
import {useContext} from "react";

export const useTodoContext = () => {
    const context = useContext(TodoContext)

    if (!context) {
        throw Error('useTodoContext must be used inside a TodoContextProvider')
    }
    return context;
}
