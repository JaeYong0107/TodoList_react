import { useNavigate } from 'react-router-dom';

import './TodoItem.css';

export default function TodoItem(props) {
    const navigate = useNavigate();
    const { id, category, title, startDate, endDate, todoList } = props


    return (
        <div className="todo-item-container" onClick={() => navigate('detail')}>
            <div className="deadline">~ 마감 기한</div>
            <button className='todo-item-edit'>Edit</button>
            <h3>제목</h3>
            <progress className='todo-item-progress' value='50' min='0' max='100' />
        </div>
    )
}