import { configureStore, createSlice } from '@reduxjs/toolkit';
import { sendTodoData } from '../util/http';


const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [] },
    reducers: {
        initialSet(state, action) {
            state.todoItems = action.payload
            console.log(action.payload)
        },
        addTodoItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.todoItems.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.todoItems.push({
                    id: newItem.id,
                    category: newItem.category,
                    title: newItem.title,
                    endDate: newItem.endDate,
                    todoList: newItem.todoList,
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
        updateTodoItem(state, action) {
            const currentId = action.payload.id;
            const updatedItem = action.payload; // 새로운 데이터로 업데이트할 항목

            // 새로운 상태 배열 생성
            const updatedTodoItems = state.todoItems.map(item => {
                // 현재 항목의 ID와 일치하는 경우 새로운 데이터로 대체
                if (item.id === currentId) {
                    return {
                        id: updatedItem.id,
                        category: updatedItem.category,
                        title: updatedItem.title,
                        endDate: updatedItem.endDate,
                        todoList: updatedItem.todoList,
                    };
                }
                // 일치하지 않는 경우 현재 항목 그대로 유지
                return item;
            });

            async function sendTodoItems() {
                await sendTodoData(updatedTodoItems);
            }

            sendTodoItems();


            // 새로운 상태 객체 반환
            return { todoItems: updatedTodoItems };
        },
        checkTodoItem(state, action) {
            const currentId = action.payload.id;
            const curIndex = action.payload.index;

            const updatedTodoItems = state.todoItems.map(item => {
                if (item.id === currentId) {
                    return {
                        ...item,
                        todoList: item.todoList.map((item, index) => {
                            if (index === curIndex) {
                                return {
                                    ...item,
                                    isCheck: !item.isCheck
                                }
                            }
                            return item
                        }),
                    };

                }
                return item;
            });

            async function sendTodoItems() {
                await sendTodoData(updatedTodoItems);
            }

            sendTodoItems();


            // 새로운 상태 객체 반환
            return { todoItems: updatedTodoItems };
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