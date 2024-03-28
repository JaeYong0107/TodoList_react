import { useState } from "react";
import { useDispatch } from "react-redux";

import { todoActions } from '../store/index.js'


export default function TodoNew() {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState('공부');
    const [inputTodo, setInputTodo] = useState([<li key={0}>
        <input className="edit-todo" type="text" name="todo" placeholder="할 일을 입력해주세요." />
        <button type="button" onClick={() => minusHandler(0)}>-</button>
        <button type='button' onClick={plusHandler}>+</button>
    </li>
    ])

    function plusHandler() {
        setInputTodo(prevInputTodo => {
            const newKey = prevInputTodo.length > 0 ? prevInputTodo[prevInputTodo.length - 1].key + 1 : 0;
            return [
                ...prevInputTodo,
                (<li key={newKey}>
                    <input className="edit-todo" type="text" name="todo" placeholder="할 일을 입력해주세요." />
                    <button type="button" onClick={() => minusHandler(newKey)}>-</button>
                    <button type='button' onClick={plusHandler}>+</button>
                </li>)
            ]
        })
    }

    function minusHandler(key) {
        setInputTodo(prevInputTodo => prevInputTodo.filter(item => item.key !== key))
    }

    function changeHandler(e) {
        setSelectedCategory(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault(); //브라우저의 기본 http 전송을 하지 않게 해줌.

        const fd = new FormData(e.target); //form 안의 name이 지정된 값들을 받아오기.
        const todoChannel = fd.getAll('todo'); // name이 todo인 데이터를 배열로 묶어오기
        const todoItemId = (Math.random() - 0.5) + ''; // item의 구별을 위한 id값 랜덤하게 지정
        const data = Object.fromEntries(fd.entries()); // 받아온 값들을 객체로 묶어주기
        data.todoList = todoChannel.map(item => { return { content: item, isCheck: false } }); // 배열로 묶은 todo를 객체에 추가하기
        data.id = todoItemId; // id도 추가
        data.category = selectedCategory;

        dispatch(todoActions.addTodoItem(data));
        alert('저장되었습니다.')
    }

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={submitHandler}>
                <div className="category-title-date">
                    <select className="edit-category" value={selectedCategory} onChange={changeHandler} style={{ backgroundImage: `url(${selectedCategory}-icon.png)` }}>
                        <option value='공부'>공부</option>
                        <option value='운동'>운동</option>
                        <option value='일'>일</option>
                        <option value='약속'>약속</option>
                    </select>
                    <input className="edit-title" type="text" name="title" placeholder="제목을 입력해주세요." />
                    <input className="edit-date" type="date" name="endDate" placeholder="마감 날짜" />
                </div>
                <div className="edit-todo-list">
                    <ul>
                        {inputTodo.map((item) => item)}
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