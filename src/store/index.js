import { configureStore, createSlice } from '@reduxjs/toolkit';
import { sendTodoData } from '../util/http';


const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [], currentId: 'currentId' },
    reducers: {
        initialSet(state, action) {
            state.todoItems = action.payload
        },
        setCurrentId(state, action) {
            state.currentId = action.payload;
        },
        addTodoItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.todoItems.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.todoItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    startDate: newItem.startDate,
                    endDate: newItem.endDate,
                    todoList: newItem.todoList,
                    category: newItem.category
                })
            }

            async function sendTodoItems() {
                await sendTodoData(state.todoItems);
            }

            sendTodoItems();
        },
        deleteTodoItem(state, action) {
            const currentId = action.payload
            const actionItems = state.todoItems.filter(item => item.id !== currentId);

            state.todoItems = actionItems;

            async function sendTodoItems() {
                await sendTodoData(state.todoItems);
            }

            sendTodoItems();
        },
        editTodoItem(state, action) {
            const currentId = state.currentId;
            const updatedItem = action.payload; // 새로운 데이터로 업데이트할 항목

            // 새로운 상태 배열 생성
            const updatedTodoItems = state.todoItems.map(item => {
                // 현재 항목의 ID와 일치하는 경우 새로운 데이터로 대체
                if (item.id === currentId) {
                    return {
                        id: updatedItem.id,
                        title: updatedItem.title,
                        startDate: updatedItem.startDate,
                        endDate: updatedItem.endDate,
                        todoList: updatedItem.todoList,
                        category: updatedItem.category
                    };
                }
                // 일치하지 않는 경우 현재 항목 그대로 유지
                return item;
            });
            console.log(updatedTodoItems);
            async function sendTodoItems() {
                await sendTodoData(updatedTodoItems);
            }

            sendTodoItems();

            // 새로운 상태 객체 반환
            return {
                ...state,
                todoItems: updatedTodoItems
            };
        },
    }
})

const modalSlice = createSlice({
    name: 'modal',
    initialState: { open: false },
    reducers: {
        openModal(state) {
            state.open = true;
        },
        closeModal(state) {
            state.open = false;
        }
    }
})


const store = configureStore({
    reducer: { todo: todoSlice.reducer, modal: modalSlice.reducer }
})

export const todoActions = todoSlice.actions;
export const modalActions = modalSlice.actions;

export default store;