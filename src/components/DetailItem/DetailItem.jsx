import { useState } from 'react';
import './DetailItem.css';

export default function DetailItem({ item, curIndex, onDelete, onCheck }) {
    const [isCheck, setIsCheck] = useState(item.isCheck ? 'check' : 'no-check')

    function checkHandler() {
        if (isCheck === 'no-check') {
            setIsCheck('check');
            onCheck(curIndex, 1);
        } else {
            setIsCheck('no-check');
            onCheck(curIndex, -1);
        }


    }

    return (
        <div className='detail-item-container'>
            <img className='x-close' src='x-close.svg' onClick={() => { onDelete(curIndex) }} />
            <button className='detial-check' onClick={checkHandler}><img src={`${isCheck}.svg`} alt={isCheck} /></button>
            <h1>{item.content}</h1>
        </div>
    )
}