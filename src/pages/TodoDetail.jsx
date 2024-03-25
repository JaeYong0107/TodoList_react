import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import DetailItem from '../components/DetailItem/DetailItem.jsx';
import { todoActions } from '../store/index.js';
import { useEffect } from 'react';

export default function TodoDetail() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { itemId } = useParams();
    const todoItems = useSelector(state => state.todo.todoItems);
    const currentItem = todoItems.find((item) => item.id === itemId);

    useEffect(() => {
        dispatch(todoActions.setCurrentId(itemId));
    }, [])

    function deleteTodoItem() {
        dispatch(todoActions.deleteTodoItem(itemId));
        navigate('/');
    }
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
            <progress value='50' min='0' max='100' />
            <div className="detail-grid">
                <ul>
                    {currentItem.todoList.map((item) => (
                        <li key={Math.random() - 0.5}><DetailItem item={item} /></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
