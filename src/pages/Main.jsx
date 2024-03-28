import { json, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { todoActions } from '../store/index.js';
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import TodoItem from "../components/TodoItem/TodoItem.jsx"
export default function Main() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const todoItems = useLoaderData();
    const sortedTodoItems = todoItems ? todoItems.sort((a, b) => new Date(a.endDate) - new Date(b.endDate)) : [];
    useEffect(() => {
        if (todoItems) {
            setLoading(false);
        }
    }, [todoItems]);

    if (loading) {
        return <div>Loading...</div>;
    }

    dispatch(todoActions.initialSet(todoItems))

    return (
        <main>
            <Sidebar todoItems={sortedTodoItems} />
            <div className="todo-item-list-container">
                <ul >
                    {sortedTodoItems.map(item => (
                        <li className="todo-item-list" key={item.id}>
                            <TodoItem {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}
export async function loader() {
    const response = await fetch('https://todo-e097a-default-rtdb.firebaseio.com/todo.json');
    const resData = await response.json();
    if (!response.ok) {
        return json({ message: 'todoItems를 가져올 수 없습니다.' }, { status: 500 })
    }

    return resData;
}