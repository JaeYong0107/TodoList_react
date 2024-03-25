import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DetailItem from '../components/DetailItem/DetailItem.jsx';

export default function TodoDetail() {
    const { itemId } = useParams();
    const todoItems = useSelector(state => state.todo.todoItems);
    const currentItem = todoItems.find((item) => item.id === itemId);
    return (
        <div className="detail-container">
            <div className="detail-title">
                <div>~ {currentItem.endDate}</div>
                <p>{currentItem.title}</p>
            </div>
            <progress value='50' min='0' max='100' />
            <div className="detail-grid">
                <ul>
                    {currentItem.todo.map((item) => (
                        <li><DetailItem item={item} /></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}