import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { todoActions } from '../store/index.js';

import DetailItem from '../components/DetailItem/DetailItem.jsx';
import calculateDateDifference from '../util/calculateDateDifference.js';

export default function TodoDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const todoItems = useSelector(state => state.todo.todoItems);
    const [currentItem, setCurrentItem] = useState(todoItems.find((item) =>
        item.id === useRouteLoaderData('current-item')));
    const [progress, setProgress] = useState(currentItem.todoList.reduce((count, item) => {
        return item.isCheck ? count + 1 : count
    }, 0))
    const remaingDate = calculateDateDifference(currentItem.endDate)

    useEffect(() => {
        dispatch(todoActions.updateTodoItem(currentItem));
    }, [currentItem])

    function deleteTodoItem() { // 삭제 버튼
        dispatch(todoActions.deleteTodoItem(currentItem.id));
        navigate('/');
    }


    function deleteTodo(curIndex) {
        setCurrentItem(prevItem => {
            const todoList = prevItem.todoList.filter((item, index) => index !== curIndex)
            return {
                ...prevItem,
                todoList
            }
        });
    }

    function checkTodo(curIndex, num) {
        setProgress(progress + num)
        dispatch(todoActions.checkTodoItem({ id: currentItem.id, index: curIndex }))
        setCurrentItem(prevItem => {
            return {
                ...prevItem,
                todoList: prevItem.todoList.map((item, index) => {
                    if (index === curIndex) {
                        return { ...item, isCheck: !item.isCheck }
                    } else { return item }
                }),
            }
        })
    }

    return (
        <div className="detail-container">
            <div className='detail-delete-box'>
                <div className="detail-title">
                    <div>{remaingDate.days === 0 ? '오늘 까지' : remaingDate.days >= 0 ? `${remaingDate.days}일 남음` : '기한 마감!'}</div>
                    <p>{currentItem.title}</p>
                </div>
                <button onClick={deleteTodoItem}>Delete</button>
                <button onClick={() => navigate('edit')}>Edit</button>
            </div>
            <progress value={progress} min={0} max={currentItem.todoList.length} />
            <div className="detail-grid">
                <ul>
                    {currentItem.todoList.map((item, index) => (
                        <li key={index}><DetailItem item={item} curIndex={index} onDelete={deleteTodo} onCheck={checkTodo} /></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export async function loader({ params }) {
    const itemId = params.itemId; // URL 파라미터에서 itemId를 가져옴

    return itemId; // 불러온 데이터를 반환하여 컴포넌트로 전달
}