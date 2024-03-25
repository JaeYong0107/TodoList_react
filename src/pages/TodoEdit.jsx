import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { todoActions } from '../store/index.js'


export default function TodoEdit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState({
        id: '',
        title: '',
        category: '',
        startDate: '',
        endDate: '',
        todoList: [],
    });

    const todoItems = useSelector(state => state.todo.todoItems)
    const currentId = useSelector(state => state.todo.currentId);
    useEffect(() => {
        const currentItem = todoItems.find((item) => item.id === currentId)

        setCurrentItem(currentItem);
    }, [])


    function changeHandler(e) {
        setCurrentItem({ ...currentItem, category: e.target.value });
    }

    function submitHandler(e) {
        e.preventDefault(); //브라우저의 기본 http 전송을 하지 않게 해줌.

        const fd = new FormData(e.target); //form 안의 name이 지정된 값들을 받아오기.
        const todoChannel = fd.getAll('todo'); // name이 todo인 데이터를 배열로 묶어오기
        const data = Object.fromEntries(fd.entries()); // 받아온 값들을 객체로 묶어주기
        data.todoList = todoChannel; // 배열로 묶은 todo를 객체에 추가하기
        data.id = currentId; // id도 추가
        data.category = currentItem.category;
        console.log(data);

        dispatch(todoActions.addTodoItem(data));
        navigate('/')
    }

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={submitHandler}>
                <div className="category-title-date">
                    <select className="edit-category" value={currentItem.category} onChange={changeHandler} style={{ backgroundImage: `url(${currentItem.category}-icon.png)` }}>
                        <option value='공부'>공부</option>
                        <option value='운동'>운동</option>
                        <option value='일'>일</option>
                        <option value='약속'>약속</option>
                    </select>
                    <input className="edit-title" type="text" name="title" defaultValue={currentItem.title} />
                    <input className="edit-date" type="date" name="startDate" defaultValue={currentItem.startDate} />
                    <input className="edit-date" type="date" name="endDate" defaultValue={currentItem.endDate} />
                </div>
                <div className="edit-todo-list">
                    <ul>
                        {currentItem.todoList.map((item) => (
                            <li key={Math.random() - 0.5}>
                                <input className="edit-todo" type="text" name="todo" defaultValue={item} />
                                <button>X</button>
                                <button>O</button>
                            </li>
                        ))}
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