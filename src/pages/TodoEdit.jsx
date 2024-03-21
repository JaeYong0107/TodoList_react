import { useState } from "react";


export default function TodoEdit() {
    const [categoryImg, setCategoryImg] = useState('공부-icon.png');

    function changeHandler(e) {
        setCategoryImg(e.target.value + '-icon.png');
    }

    return (
        <div className="edit-container">
            <form className="edit-form">
                <div className="category-title-date">
                    <select className="edit-category" onChange={changeHandler} style={{ backgroundImage: `url(${categoryImg})` }}>
                        <option value='공부' selected >공부</option>
                        <option value='운동'>운동</option>
                        <option value='일'>일</option>
                        <option value='약속'>약속</option>
                    </select>
                    <input className="edit-title" type="text" name="title" placeholder="제목을 입력해주세요." />
                    <input className="edit-date" type="text" name="startDate" placeholder="---- / -- / -- " />
                    <input className="edit-date" type="text" name="endDate" placeholder="---- / -- / -- " />
                </div>
                <div className="edit-todo-list">
                    <ul>
                        <li>
                            <input className="edit-todo" type="text" name="todo" placeholder="할 일을 입력해주세요." />
                            <button>X</button>
                            <button>O</button>
                        </li>
                        <li>
                            <input className="edit-todo" type="text" name="todo" placeholder="할 일을 입력해주세요." />
                            <button>X</button>
                            <button>O</button>
                        </li>
                    </ul>
                </div>
                <div className="edit-button">
                    <button id="text">취소</button>
                    <button>저장</button>
                </div>
            </form>
        </div>
    )
}