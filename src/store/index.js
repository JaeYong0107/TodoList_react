import { configureStore, createSlice } from '@reduxjs/toolkit';
import { sendTodoData, sendUserInfo } from '../util/http';


const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [] },
    reducers: {
        initialSet(state, action) {
            state.todoItems = action.payload
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
    initialState: { isOpenLogin: false, isOpenSignUp: false },
    reducers: {
        openLoginModal(state) {
            state.isOpenLogin = true;
        },
        closeLoginModal(state) {
            state.isOpenLogin = false;
        },
        openSignUpModal(state) {
            state.isOpenSignUp = true;
        },
        closeSignUpModal(state) {
            state.isOpenSignUp = false;
        }
    }
})

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: { open: false },
    reducers: {
        toggleButton(state) {
            state.open = !state.open
        },
    }
})

const loginSlice = createSlice({
    name: 'login',
    initialState: { usersInfo: [], currentUser: { id: '', password: '', name: '' }, isLogin: false },
    reducers: {
        initialSet(state, action) {
            state.usersInfo = action.payload;
        },
        signUp(state, action) {
            const newUserinfo = action.payload;
            const existingInfo = state.usersInfo.find(info => (info.id === newUserinfo.id && info.password === newUserinfo.password))

            if (!existingInfo) {
                state.usersInfo.push({
                    id: newUserinfo.id,
                    password: newUserinfo.password,
                    name: newUserinfo.name,
                })
                console.log(newUserinfo)
            } else {
                throw new Error('이미 존재하는 유저 정보 입니다.')
            }

            async function sendInfo() {
                await sendUserInfo(state.usersInfo);
            }

            sendInfo();
        },
        login(state, action) {
            // users서버에 있는 id와 password가 일치하는게 있다면 승인.
            state.isLogin = true;
            state.currentUser = action.payload;
        },
        logout(state) {
            state.isLogin = false;
            state.currentUser = { id: '', password: '', name: '' };
        }
    }
})

const store = configureStore({
    reducer: { todo: todoSlice.reducer, modal: modalSlice.reducer, sidebar: sidebarSlice.reducer, login: loginSlice.reducer }
})

export const todoActions = todoSlice.actions;
export const modalActions = modalSlice.actions;
export const sidebarActions = sidebarSlice.actions;
export const loginActions = loginSlice.actions;

export default store;