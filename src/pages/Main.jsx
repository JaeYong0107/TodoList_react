import LoginModal from "../components/Login/LoginModal.jsx"
import Sidebar from "../components/Sidebar/Sidebar.jsx"
import TodoItem from "../components/TodoItem/TodoItem.jsx"

export default function Main() {
    return (
        <main>
            <Sidebar />
            <div className="todo-item-list-container">
                <ul >
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                    <li className="todo-item-list"><TodoItem /></li>
                </ul>
            </div>
            {/* <LoginModal /> */}
        </main>
    )
}