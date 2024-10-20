import { RootState } from '@/app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubTask, Task } from './types/Task';

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
    taskUpdated(state, action: PayloadAction<Task>) {
      const { id, boardId, boardStatusId, description, subTasks, title } =
        action.payload;
      const updateTask = state.find((task) => task.id === id);
      if (!updateTask) throw new Error('Task not found');
      (updateTask.boardId = boardId),
        (updateTask.boardStatusId = boardStatusId);
      updateTask.description = description;
      (updateTask.subTasks = subTasks), (updateTask.title = title);
    },
    subTaskUpdated(state, action: PayloadAction<SubTask>) {
      const { id, taskId, isCompleted, title } = action.payload;
      const task = state.find((task) => task.id === taskId);
      if (!task) throw new Error('task not found');
      const updateSubTask = task.subTasks.find((subTask) => subTask.id === id);
      if (!updateSubTask) throw new Error('updateSubTask not found');
      updateSubTask.isCompleted = isCompleted;
      updateSubTask.title = title;
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

export const selectSubTasksCompleted = createSelector(
  [(state: RootState) => state.tasks, (_, taskId: string | null) => taskId],
  (tasks: Task[], taskId: string | null) => {
    if (!taskId) return [];
    const task = tasks.find((task) => task.id === taskId);
    if (!task) throw new Error('task not found');
    return task.subTasks.filter((subTask) => subTask.isCompleted);
  },
);

export const { taskAdded, taskUpdated, subTaskUpdated } = tasksSlice.actions;
export default tasksSlice.reducer;
