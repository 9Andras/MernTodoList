import React, {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useTodoContext} from "../../hooks/useTodoContext";

function TodoDetails({todo}) {
    const {dispatch} = useTodoContext();
    const {user} = useAuthContext();

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editComment, setEditComment] = useState('');


    const handleEditTodo = async (userId, todoId) => {
        if (!user) {
            return;
        }
        try {
            const response = await fetch(`/api/users/${userId}/todo/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({title: editTitle, comment: editComment}),
            });
            const updatedTodo = await response.json();

            if (response.ok) {
                dispatch({type: 'EDIT_TODO', payload: updatedTodo});
            }

        } catch (error) {
            console.log(error);
        }
    };

    const editTodo = (todo) => {
        setEditTitle(todo.title);
        setEditComment(todo.comment);
        setEditingId(todo._id);
    }

    const handleDeleteTodo = async (userId, todoId) => {
        if (!user) {
            return;
        }
        if (window.confirm('Confirm deletion of todo')) {
            try {
                const response = await fetch(`/api/users/${userId}/todo/${todoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const jsonResponse = await response.json;

                if (response.ok) {
                    dispatch({type: 'DELETE_TODO', payload: jsonResponse});
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <tr key={todo._id}>
                {editingId === todo._id ? (
                    <>
                        <td>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={e => setEditTitle(e.target.value)}
                                required/>
                        </td>
                        <td>
                            <input
                                type="text"
                                value={editComment}
                                onChange={e => setEditComment(e.target.value)} required/>
                        </td>
                        <td>
                            <button
                                className="material-symbols-outlined"
                                onClick={() => handleEditTodo(user.user._id, todo._id)}>save
                            </button>
                            <button
                                className="material-symbols-outlined"
                                onClick={() => setEditingId(null)}>cancel
                            </button>
                        </td>
                    </>
                ) : (
                    <>
                        <td>{todo.title}</td>
                        <td>{todo.comment}</td>
                        <td>
                            <button
                                className="material-symbols-outlined"
                                onClick={() => handleDeleteTodo(user.user._id, todo._id)}>delete
                            </button>
                            <button
                                className="material-symbols-outlined"
                                onClick={() => editTodo(todo)}>edit
                            </button>
                        </td>
                    </>
                )}
            </tr>
        </>
    );
}

export default TodoDetails;
