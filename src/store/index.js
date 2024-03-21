import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [{ id: 't1', category: 'category', title: 'title', startDate: '2024-03-21', endDate: '2024-03-25', todoList: [] },] },
    reducers: {}
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

export const modalActions = modalSlice.actions;

export default store;