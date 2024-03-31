import { useNavigate } from 'react-router-dom';

import calculateDateDifference from '../../util/calculateDateDifference.js'
import './SidebarItem.css';
import { useSelector } from 'react-redux';

export default function SidebarItem(props) {
    const navigate = useNavigate();
    const { id, category, title, endDate, todoList } = props;
    const remaingDate = calculateDateDifference(endDate);
    const checkNum = todoList.reduce((count, item) => {
        return item.isCheck ? count + 1 : count
    }, 0)
    const isLogin = useSelector(state => state.login.isLogin)

    return (
        <div className='sidebar-item'>
            {/* <div className="deadline">{remaingDate.days === 0 ? '오늘 까지' : remaingDate.days >= 0 ? `${remaingDate.days}일 남음` : '기한 마감!'}</div> */}
            {/* <button className='todo-item-edit' onClick={() => navigate(`/${id}/edit`)}>Edit</button> */}
            {!isLogin && <h3>{title}</h3>}
            {isLogin && <h3 onClick={() => navigate(id)}>{title}</h3>}
            {/* <progress value={checkNum} min={0} max={todoList.length} /> */}
        </div>
    )
}