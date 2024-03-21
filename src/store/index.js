import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [{ id: 't1', category: 'category', title: 'title', startDate: '2024-03-21', endDate: '2024-03-25', todoList: [] },] },
    reducers: {}
})


const store = configureStore({
    reducer: { todo: todoSlice.reducer }
})

export default store;