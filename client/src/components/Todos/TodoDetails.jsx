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
                } else {
                    console.error(response.error)
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const toggleDone = async (userId, todoId) => {
            try {
                const response = await fetch(`/api/users/${userId}/todo/${todoId}/done`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({done: !todo.done})
                });

                if (response.ok) {
                    dispatch({type: 'MARK_TODO_DONE', payload: {_id: todoId}});
                } else {
                    console.error(response.error);
                }

            } catch (error) {
                console.error(error)
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
                <div className={`todo-item ${todo.done ? 'done' : ''}`}>
                    <h4>{todo.title}</h4>
                    <p>{todo.comment}</p>
                    <br/>
                    <p><u>Added </u>: {new Date(todo.createdAt).toLocaleString()}</p>
                    <p><u>Edited </u>: {todo.updatedAt === null ? 'not yet' : new Date(todo.updatedAt).toLocaleString()}</p>
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
                    <span
                        className="material-symbols-outlined"
                        id="todo-details__checkbox"
                        title={todo.done ? "mark undone" : "mark done"}
                        onClick={() => toggleDone(user.user._id, todo._id)}>
                        {todo.done ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                </div>
            )}
        </div>
    );
}

export default TodoDetails;
