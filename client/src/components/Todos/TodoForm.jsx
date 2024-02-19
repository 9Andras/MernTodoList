import React, {useState} from "react";
import {useTodoContext} from "../../hooks/useTodoContext";
import {useAuthContext} from "../../hooks/useAuthContext";

function TodoForm() {
    const {dispatch} = useTodoContext();
    const {user} = useAuthContext();

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null)

    const handleAddTodo = async (e, userId) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return;
        }

        const data = {title, comment};
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
                setError(responseData.error)
            }

            if (response.ok) {
                console.log(responseData);
                resetForm();
                dispatch({type: 'CREATE_TODO', payload: responseData});
            }
        } catch (error) {
            console.error('Failed to submit data: ', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setComment('');
        setError(null);
    }

    return (
        <>
            <form onSubmit={(e) => handleAddTodo(e, user.user._id)}>
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
                {error &&
                    <div className="error">
                        {error}
                    </div>}
                <button type="submit">Save</button>
            </form>
        </>
    );

}

export default TodoForm;
