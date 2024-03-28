import { useRouteLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import DetailItem from '../components/DetailItem/DetailItem.jsx';
import { todoActions } from '../store/index.js';
import { useEffect, useState } from 'react';

export default function TodoDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState(useRouteLoaderData('current-item'));
    const [progress, setProgress] = useState(currentItem.todoList.reduce((count, item) => {
        return item.isCheck ? count + 1 : count
    }, 0))

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
    console.log(progress)
    return (
        <div className="detail-container">
            <div className='detail-delete-box'>
                <div className="detail-title">
                    <div>~ {currentItem.endDate}</div>
                    <p>{currentItem.title}</p>
                </div>
                <button onClick={deleteTodoItem}>Delete</button>
                <button onClick={() => navigate('edit')}>Edit</button>
            </div>
            {console.log(currentItem)}
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

export async function loader({ request, params }) {
    const itemId = params.itemId; // URL 파라미터에서 itemId를 가져옴
    // itemId를 사용하여 데이터를 불러오는 비동기 작업 수행
    const response = await fetch(`https://todo-e097a-default-rtdb.firebaseio.com/todo.json`);
    const data = await response.json();
    const item = data.find(item => item.id === itemId);

    return item; // 불러온 데이터를 반환하여 컴포넌트로 전달
}