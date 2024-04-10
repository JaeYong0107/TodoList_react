import { useNavigate } from 'react-router-dom';

import calculateDateDifference from '../../util/calculateDateDifference.js'
import './TodoItem.css';
import { useSelector } from 'react-redux';

export default function TodoItem(props) {
    const navigate = useNavigate();
    const { id,title, endDate, todoList } = props;
    const remaingDate = calculateDateDifference(endDate);
    const checkNum = todoList.reduce((count, item) => {
        return item.isCheck ? count + 1 : count
    }, 0)
    const isLogin = useSelector(state => state.login.isLogin)

    return (
        <div className="todo-item-container" >
            <div className="deadline">{remaingDate.days === 0 ? '오늘 까지' : remaingDate.days >= 0 ? `${remaingDate.days}일 남음` : '기한 마감!'}</div>
            {!isLogin && <>
                <button className='todo-item-edit' >Edit</button>
                <h3 >{title}</h3>
            </>}
            {isLogin && <>
                <button className='todo-item-edit' onClick={() => navigate(`/${id}/edit`)}>Edit</button>
                <h3 onClick={() => navigate(id)}>{title}</h3>
            </>}
            <progress className='todo-item-progress' value={checkNum} min={0} max={todoList.length} />
        </div>
    )
}