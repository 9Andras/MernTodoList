import React, {useEffect} from 'react';
import {useTodoContext} from "../hooks/useTodoContext";

import TodoDetails from "../components/Todos/TodoDetails";
import TodoForm from "../components/Todos/TodoForm";
import Loading from "../components/Loading/Loading";

function Homepage() {
    const {todos, dispatch} = useTodoContext();


    useEffect(() => {
        const fetchTodos = async (userId) => {
            try {
                const response = await fetch(`/api/users/${userId}/todos`);
                const data = await response.json();

                if (response.ok) {
                    dispatch({type: 'SET_TODOS', payload: data})
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchTodos();

    }, [dispatch]);


    return (
        <div className="home">
            <div className="todos">
                <h2>My Todos</h2>
                {todos ? (
                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Comment</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo) => (
                            <TodoDetails key={todo._id} todo={todo}/>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <Loading/>
                )}
            </div>
            <TodoForm/>
        </div>

    );
}

export default Homepage;
