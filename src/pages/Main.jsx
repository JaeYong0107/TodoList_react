import { useDispatch, useSelector } from 'react-redux';

import Sidebar from "../components/Sidebar/Sidebar.jsx"
import TodoItem from "../components/TodoItem/TodoItem.jsx"
import { useEffect } from 'react';
import { getTodoData } from '../util/http.js';
import { todoActions } from '../store/index.js';

export default function Main() {
    const dispatch = useDispatch();
    const todoItems = useSelector(state => state.todo.todoItems);
    console.log(todoItems);
    useEffect(() => {
        async function fetchTodo() {
            try {
                const data = await getTodoData();
                dispatch(todoActions.initialSet(data));
            } catch (error) {
                console.error(error);
            }
        }

        fetchTodo();

    }, [])

    return (
        <main>
            <Sidebar />
            <div className="todo-item-list-container">
                <ul >
                    {todoItems.map(item => (
                        <li className="todo-item-list" key={item.id}>
                            <TodoItem {...item} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}