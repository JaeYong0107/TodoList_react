import { json, useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { todoActions } from '../store/index.js';
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import TodoItem from "../components/TodoItem/TodoItem.jsx"
import { getTodoData } from '../util/http.js';

export default function Main() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const todoItems = useLoaderData();
    const sortedTodoItems = todoItems ? [...todoItems].sort((a, b) => new Date(a.endDate) - new Date(b.endDate)) : [];
    const isOpen = useSelector(state => state.sidebar.open);

    useEffect(() => {
        if (todoItems) {
            setLoading(false);
            dispatch(todoActions.initialSet(todoItems));
        }
    }, [todoItems, dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <main>
            <Sidebar todoItems={sortedTodoItems} />
            <div className="todo-item-list-container">
                <ul className={isOpen ? 'open' : 'close'}>
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
    const data = await getTodoData();

    return data;
}