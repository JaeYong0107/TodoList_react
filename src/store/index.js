import { configureStore, createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: { todoItems: [] },
    reducers: {
        addTodoItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.todoItems.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.todoItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    startDate: newItem.startDate,
                    endDate: newItem.endDate,
                    todo: newItem.todo
                })
            }

        }
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