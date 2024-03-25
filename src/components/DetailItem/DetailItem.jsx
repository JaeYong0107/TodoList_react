import './DetailItem.css';

export default function DetailItem({ item }) {
    return (
        <div className='detail-item-container'>
            <img className='x-close' src='x-close.svg' />
            <button className='detial-check'><img src='check.svg' alt='' /></button>
            <h1>{item}</h1>
        </div>
    )
}