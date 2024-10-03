import { RootState } from '@/app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types/Task';

const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    taskAdded(state, action: PayloadAction<Task>) {
      state.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        subTasks: action.payload.subTasks,
        boardId: action.payload.boardId,
        boardStatusId: action.payload.boardStatusId,
      });
    },
  },
});

export const selectTasksByBoardId = createSelector(
  [(state: RootState) => state.tasks, (_, boardId: string | null) => boardId],
  (tasks: Task[], boardId: string | null) => {
    if (!boardId) return [];
    return tasks.filter((task) => task.boardId === boardId);
  },
);

export const { taskAdded } = tasksSlice.actions;
export default tasksSlice.reducer;
