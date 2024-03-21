import { useSelector } from 'react-redux';

import LoginModal from "../components/Login/LoginModal.jsx"
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import TodoItem from "../components/TodoItem/TodoItem.jsx"

export default function Main() {
    const todoItems = useSelector(state => state.todo.todoItems);

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
            {/* <LoginModal /> */}
        </main>
    )
}