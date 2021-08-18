import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../shared-modules/store';
import { fetchCount } from './todoListAPI';

export interface TodoListState {
  items: any[];
  filter: 'all' | 'done' | 'undone';
}

const initialState: TodoListState = {
  items: [],
  filter: 'all',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTodo: (state, action) => {
      const generateKey = () => {
        return `todo_${new Date().getTime()}`;
      };
      const id = generateKey();
      const newItem = {
        id,
        key: id,
        status: 'undone',
        content: action.payload,
        editMode: false,
      };
      state.items = [...state.items, newItem];
    },
    deleteTodo: (state, action) => {
      const rowToChange = state.items.findIndex(item => {
        return item.id === action.payload;
      });
      state.items = [...state.items.slice(0, rowToChange),
      ...state.items.slice(rowToChange + 1)];
    },
    editTodo: (state, action) => {
      const rowToChange = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });

      const newTodoList = [...state.items];
      newTodoList[rowToChange].content = action.payload.inputValue;

      state.items = newTodoList;
    },
    toggleDone: (state, action) => {
      const rowToChange = state.items.findIndex(item => {
        return item.id === action.payload.id;
      });

      const newTodoList = [...state.items];
      newTodoList[rowToChange].status = action.payload.done ? 'done' : 'undone';

      state.items = newTodoList;
    },
    toggleEditMode: (state, action) => {
      const rowToChange = state.items.findIndex(item => {
        return item.id === action.payload;
      });

      const newTodoList = [...state.items];
      newTodoList[rowToChange].editMode = !newTodoList[rowToChange].editMode;

      state.items = newTodoList;
    },
    updateFilter: (state, action) => void (state.filter = action.payload),
  },
});

export const {
  addTodo,
  deleteTodo,
  editTodo,
  toggleDone,
  toggleEditMode,
  updateFilter,
} = todoListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodoList = (state: RootState) => state.todoList.items;
export const selectFilter = (state: RootState) => state.todoList.filter;

export default todoListSlice.reducer;
