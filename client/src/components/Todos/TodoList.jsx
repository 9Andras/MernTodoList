import React, {useEffect, useState} from 'react';
import './TodoList.css';

function TodoList({visible}) {
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editComment, setEditComment] = useState('');


    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('/api/todo');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveTodo = async (id) => {
        if (window.confirm('Confirm deletion of todo')) {
            try {
                await fetch(`/api/todo/${id}`, {
                    method: 'DELETE',
                });
                setTodos(todos.filter((todo) => todo._id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEditTodo = async (id) => {
        try {
            const response = await fetch(`/api/todo/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title: editTitle, comment: editComment}),
            });
            const updatedTodo = await response.json();
            setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
            setEditingId(null);
        } catch (error) {
            console.log(error);
        }
    };
    const editTodo = (todo) => {
        setEditTitle(todo.title);
        setEditComment(todo.comment);
        setEditingId(todo._id);
    }

    return (
        <div className={`todo-list ${visible ? 'visible' : 'hidden'}`}>
            <h2>Todo List</h2>
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
                    <tr key={todo._id}>
                        {editingId === todo._id ? (
                            <>
                                <td>
                                    <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                                           required/>
                                </td>
                                <td>
                                    <input type="text" value={editComment}
                                           onChange={e => setEditComment(e.target.value)} required/>
                                </td>
                                <td>
                                    <button onClick={() => handleEditTodo(todo._id)}>Save</button>
                                    <button onClick={() => setEditingId(null)}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{todo.title}</td>
                                <td>{todo.comment}</td>
                                <td>
                                    <button onClick={() => handleRemoveTodo(todo._id)}>Remove</button>
                                    <button onClick={() => editTodo(todo)}>Edit</button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;
