import { RootState } from '@/app/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubTask, Task } from './types/Task';
import { BoardStatus } from '../boards';

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
      const { id, boardStatusId, description, subTasks, title } =
        action.payload;
      const index = state.findIndex((task) => task.id === id);
      if (index === -1) {
        throw new Error('Task not found');
      }

      state[index] = {
        ...state[index],
        title,
        description,
        subTasks,
        boardStatusId,
      };
    },
    subTaskUpdated(state, action: PayloadAction<SubTask>) {
      console.log('subTaskUpdated');
      const { id, taskId, isCompleted, title } = action.payload;
      const task = state.find((task) => task.id === taskId);
      console.log(state);
      if (!task) throw new Error('task not found');
      const updateSubTask = task.subTasks.find((subTask) => subTask.id === id);
      if (!updateSubTask) throw new Error('updateSubTask not found');
      updateSubTask.isCompleted = isCompleted;
      updateSubTask.title = title;
    },
    tasksDeleted(state, action: PayloadAction<Task[]>) {
      const tasksToDelete = action.payload;
      const taskIdsToRemove = tasksToDelete.map((task) => task.id);
      return state.filter((task) => !taskIdsToRemove.includes(task.id));
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

export const selectColumnsCount = (
  state: RootState,
  boardColumns: BoardStatus[] | undefined,
): Record<string, { count: number }> => {
  if (!boardColumns) return {};
  return boardColumns.reduce(
    (acc, column) => {
      acc[column.name] = {
        count: state.tasks.reduce(
          (acc, task) => (task.boardStatusId === column.id ? (acc += 1) : acc),
          0,
        ),
      };
      return acc;
    },
    {} as Record<string, { count: number }>,
  );
};

export const { taskAdded, taskUpdated, subTaskUpdated, tasksDeleted } =
  tasksSlice.actions;
export default tasksSlice.reducer;
