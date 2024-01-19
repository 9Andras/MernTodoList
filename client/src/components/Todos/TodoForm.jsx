import React, {useState} from "react";

function TodoForm({onSubmit}) {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');

    const handleFormSubmit = async (e, userId) => {
        e.preventDefault();
        const data = {title, comment};
        try {
            const response = await fetch(`/api/users/${userId}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                onSubmit();
                resetForm();
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setComment('');
    }

    return (
        <form onSubmit={handleFormSubmit}>
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
            <button type="submit">Add todo</button>
        </form>
    );

}

export default TodoForm;
