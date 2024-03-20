
import DetailItem from '../components/DetailItem/DetailItem.jsx';

export default function TodoDetail() {
    return (
        <div className="detail-container">
            <div className="detail-title">
                <div>~ 마감기한</div>
                <p>제목</p>
            </div>
            <progress value='50' min='0' max='100' />
            <div className="detail-grid">
                <ul>
                    <li><DetailItem /></li>
                    <li><DetailItem /></li>
                    <li><DetailItem /></li>
                    <li><DetailItem /></li>
                    <li><DetailItem /></li>
                    <li><DetailItem /></li>
                </ul>
            </div>
        </div>
    )
}