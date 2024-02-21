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
                dispatch({type: 'EDIT_TODO', payload: (updatedTodo)});
                setEditingId(null);
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

                if (response.ok) {
                    dispatch({type: 'DELETE_TODO', payload: {_id: todoId}});
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="todo-details">
            {editingId === todo._id ? (
                <>
                    <label>Title:</label>
                    <br/>
                    <input
                        type="text"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        required/>
                    <br/>
                    <label>Comment:</label>
                    <br/>
                    <input
                        type="text"
                        value={editComment}
                        onChange={e => setEditComment(e.target.value)}
                        required/>
                    <span
                        className="material-symbols-outlined"
                        id="todo-details__save"
                        title="save"
                        onClick={() => handleEditTodo(user.user._id, todo._id)}>save
                    </span>
                    <span
                        className="material-symbols-outlined"
                        id="todo-details__cancel"
                        title="cancel"
                        onClick={() => setEditingId(null)}>cancel
                    </span>
                </>
            ) : (
                <>
                    <h4>{todo.title}</h4>
                    <p>{todo.comment}</p>
                    <p>{new Date(todo.createdAt).toDateString()}</p>
                    <span
                        className="material-symbols-outlined"
                        id="todo-details__delete"
                        title="delete"
                        onClick={() => handleDeleteTodo(user.user._id, todo._id)}>delete
                    </span>
                    <span
                        className="material-symbols-outlined"
                        id="todo-details__edit"
                        title="edit"
                        onClick={() => editTodo(todo)}>edit
                    </span>
                </>
            )}
        </div>
    );
}

export default TodoDetails;
