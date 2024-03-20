import TodoItem from "../components/TodoItem/TodoItem.jsx"

export default function Main() {
    return (
        <main>
            <ul>
                <li className="todo-item-list"><TodoItem /></li>
                <li className="todo-item-list"><TodoItem /></li>
                <li className="todo-item-list"><TodoItem /></li>
                <li className="todo-item-list"><TodoItem /></li>
            </ul>
        </main>
    )
}