import React, {useState} from "react";
import {useTodoContext} from "../../hooks/useTodoContext";
import {useAuthContext} from "../../hooks/useAuthContext";

import Loading from "../Loading/Loading";

function TodoForm() {
    const {dispatch} = useTodoContext();
    const {user} = useAuthContext();

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [deadline, setDeadline] = useState('');

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const handleAddTodo = async (e, userId) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!user) {
            setError('You must be logged in')
            return;
        }

        if (new Date(deadline).getTime() < Date.now()) {
            setIsLoading(false);
            setError("Deadline cannot be set in the past!")
            return;
        }

        const data = {title, comment, deadline};
        try {
            const response = await fetch(`/api/users/${userId}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(responseData.error)
            }

            if (response.ok) {
                resetForm();
                dispatch({type: 'CREATE_TODO', payload: responseData});
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Failed to submit data: ', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setComment('');
        setDeadline('');
        setError(null);
    }

    return (
        <>
            {isLoading ? (
                <Loading/>
            ) : (
                <form
                    className="todo-form"
                    onSubmit={(e) => handleAddTodo(e, user.user._id)}>
                    <h3>Add a new todo to your list</h3>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Comment:
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Deadline:
                        <input
                            type="datetime-local"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                            required
                        />
                    </label>
                    {error &&
                        <div className="error">
                            {error}
                        </div>}
                    <button
                        type="submit"
                        disabled={isLoading}>
                        Save
                    </button>
                </form>
            )}
        </>
    );

}

export default TodoForm;
