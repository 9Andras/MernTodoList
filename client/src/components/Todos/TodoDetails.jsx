import React, {useState} from "react";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useTodoContext} from "../../hooks/useTodoContext";
import Loading from "../Loading/Loading";

function TodoDetails({todo}) {
    const {dispatch} = useTodoContext();
    const {user} = useAuthContext();

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editComment, setEditComment] = useState('');
    const [editDeadline, setEditDeadline] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);


    const handleEditTodo = async (userId, todoId) => {
        setError(null);
        setIsLoading(true);

        if (!user) {
            setError('User required!')
            return;
        }

        if (new Date(editDeadline).getTime() < Date.now()) {
            setError("Deadline cannot be set in the past!")
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/users/${userId}/todo/${todoId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({title: editTitle, comment: editComment, deadline: editDeadline}),
            });
            const updatedTodo = await response.json();

            if (!response.ok) {
                setError(updatedTodo.error)
                setIsLoading(false);
            }

            if (response.ok) {
                dispatch({type: 'EDIT_TODO', payload: (updatedTodo)});
                setEditingId(null);
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const editTodo = (todo) => {
        setEditTitle(todo.title);
        setEditComment(todo.comment);
        setEditingId(todo._id);
        setEditDeadline(todo.deadline)
    }

    const handleDeleteTodo = async (userId, todoId) => {
        setError(null);
        setIsLoading(true);

        if (!user) {
            setError('User required!')
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

                if (!response.ok) {
                    setError(response.error)
                    setIsLoading(false);
                    console.error(response.error)
                }

                if (response.ok) {
                    dispatch({type: 'DELETE_TODO', payload: {_id: todoId}});
                    setIsLoading(false);
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const toggleDone = async (userId, todoId) => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/api/users/${userId}/todo/${todoId}/done`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({done: !todo.done})
            });
            const data = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(data.error);
                console.error(response.error);
            }

            if (response.ok) {
                dispatch({type: 'MARK_TODO_DONE', payload: {_id: todoId}});
                setError(null);
                setIsLoading(false);
            }

        } catch (error) {
            console.error(error)
        }
    };

    const checkTodoDeadline = () => {
        if (new Date(todo.deadline).getTime() < Date.now() && todo.deadline !== null && !todo.done) {
            return (
                <>
                    <p style={{color: "red"}}><b>DEADLINE MISSED!</b></p>
                    <p><u>was originally:</u></p>
                </>
            );
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
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
                            <br/>
                            <label>Deadline:</label>
                            <br/>
                            <input
                                type="datetime-local"
                                value={editDeadline}
                                onChange={e => setEditDeadline(e.target.value)}
                            />
                            {error &&
                                <div className="error">
                                    {error}
                                </div>
                            }
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
                            <p><strong><u>Due</u>:
                            </strong>{checkTodoDeadline()} {todo.deadline === null ? 'not yet specified' : new Date(todo.deadline).toLocaleString()}
                            </p>
                            <br/>
                            <p><u>Added</u>: {new Date(todo.createdAt).toLocaleString()}</p>
                            <p>
                                <u>Edited</u>: {todo.updatedAt === null ? 'not yet' : new Date(todo.updatedAt).toLocaleString()}
                            </p>
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
            )
            }

        </>
    );
}

export default TodoDetails;
