import { useState } from "react";
import { useDispatch } from "react-redux";

import { todoActions } from '../store/index.js'


export default function TodoEdit() {
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState('공부');

    function changeHandler(e) {
        setSelectedValue(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault(); //브라우저의 기본 http 전송을 하지 않게 해줌.

        const fd = new FormData(e.target); //form 안의 name이 지정된 값들을 받아오기.
        const todoChannel = fd.getAll('todo'); // name이 todo인 데이터를 배열로 묶어오기
        const todoItemId = Math.random() - 0.5; // item의 구별을 위한 id값 랜덤하게 지정
        const data = Object.fromEntries(fd.entries()); // 받아온 값들을 객체로 묶어주기
        data.todo = todoChannel; // 배열로 묶은 todo를 객체에 추가하기
        data.id = todoItemId; // id도 추가
        console.log(data);

        dispatch(todoActions.addTodoItem(data));
    }

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={submitHandler}>
                <div className="category-title-date">
                    <select className="edit-category" value={selectedValue} onChange={changeHandler} style={{ backgroundImage: `url(${selectedValue}-icon.png)` }}>
                        <option value='공부'>공부</option>
                        <option value='운동'>운동</option>
                        <option value='일'>일</option>
                        <option value='약속'>약속</option>
                    </select>
                    <input className="edit-title" type="text" name="title" placeholder="제목을 입력해주세요." />
                    <input className="edit-date" type="date" name="startDate" placeholder="시작 날짜" />
                    <input className="edit-date" type="date" name="endDate" placeholder="마감 날짜" />
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