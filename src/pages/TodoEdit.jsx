import { useDispatch } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";

import { todoActions } from '../store/index.js'
import { useState } from "react";


export default function TodoEdit() {
    const dispatch = useDispatch();
    const currentItem = useRouteLoaderData('current-item')
    const [category, setCategory] = useState(currentItem.category)
    const [inputTodo, setInputTodo] = useState(currentItem.todoList.map((item, index) => (
        <li key={index}>
            <input className="edit-todo" type="text" name="todo" defaultValue={item.content} />
            <button type="button" onClick={() => minusHandler(index)}>-</button>
            <button type="button" onClick={plusHandler}>+</button>
        </li>
    )))

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
        setCategory(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const todoChannel = fd.getAll('todo');
        const data = Object.fromEntries(fd.entries());
        data.todoList = todoChannel.map((item, index) => {
            if (index < currentItem.todoList.length) {
                return { content: item, isCheck: currentItem.todoList[index].isCheck }
            } else { return { content: item, isCheck: false } }
        });
        data.id = currentItem.id;
        data.category = category;
        console.log(data)
        dispatch(todoActions.updateTodoItem(data));
    }

    return (
        <div className="edit-container">
            <form className="edit-form" onSubmit={submitHandler}>
                <div className="category-title-date">
                    <select className="edit-category" value={category} onChange={changeHandler} style={{ backgroundImage: `url(${currentItem.category}-icon.png)` }}>
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