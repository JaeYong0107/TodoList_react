import { useNavigate } from 'react-router-dom';

import './TodoItem.css';

export default function TodoItem(props) {
    const navigate = useNavigate();
    const { id, category, title, startDate, endDate, todoList } = props
    const checkNum = todoList.reduce((count, item) => {
        return item.isCheck ? count + 1 : count
    }, 0)

    return (
        <div className="todo-item-container" >
            <div className="deadline">~ {endDate - startDate}남음</div>
            <button className='todo-item-edit' onClick={() => navigate(`/${id}/edit`)}>Edit</button>
            <h3 onClick={() => navigate(id)}>{title}</h3>
            <progress className='todo-item-progress' value={checkNum} min={0} max={todoList.length} />
        </div>
    )
}