import { RootState } from '@/app/store';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Board, BoardStatus } from './types/Board';
import { taskAdded } from '../tasks';

interface BoardsState {
  boards: Board[];
  loading: boolean;
  error?: string;
}

const initialState: BoardsState = {
  boards: [],
  loading: false,
};

type BoardJSONData = {
  name: string;
  columns: ColumnJSONData[];
};

type ColumnJSONData = {
  name: string;
  tasks: TaskJSONData[];
};
type TaskJSONData = {
  title: string;
  description: string;
  status: string;
  subtasks: SubtaskJSONData[];
};
type SubtaskJSONData = {
  title: string;
  isCompleted: boolean;
};

export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    const response = await fetch('/data.json');
    if (!response.ok) throw new Error('Failed to load data.json');
    const data = await response.json();
    const boards: Board[] = data.boards.map((boardData: BoardJSONData) => {
      const boardId = nanoid();

      const statuses: BoardStatus[] = boardData.columns.map(
        (column: ColumnJSONData) => ({
          id: nanoid(),
          name: column.name,
          boardId: boardId,
        }),
      );

      // Dispatch the tasks to the tasksSlice
      boardData.columns.forEach((column: ColumnJSONData) => {
        const boardStatusId =
          statuses.find((status) => status.name === column.name)?.id || '';
        column.tasks.forEach((taskData: TaskJSONData) => {
          const taskId = nanoid();
          thunkAPI.dispatch(
            taskAdded({
              id: taskId,
              title: taskData.title,
              description: taskData.description || '',
              boardId: boardId,
              boardStatusId: boardStatusId,
              subTasks: taskData.subtasks.map((subtask: SubtaskJSONData) => ({
                id: nanoid(),
                title: subtask.title,
                isCompleted: subtask.isCompleted,
                taskId: taskId,
              })),
            }),
          );
        });
      });

      return { id: boardId, name: boardData.name, status: statuses };
    });

    return {
      boards,
    };
  },
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {
    boardAdded(state, action: PayloadAction<Board>) {
      state.boards.push({
        id: action.payload.id,
        name: action.payload.name,
        status: action.payload.status,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(
        fetchBoards.fulfilled,
        (state, action: PayloadAction<{ boards: Board[] }>) => {
          state.boards = action.payload.boards;
          console.log(state.boards);
          state.loading = false;
        },
      )
      .addCase(fetchBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectBoardById = (state: RootState, boardId: string) => {
  const board = state.boards.boards.find((board) => board.id === boardId);
  if (!board) return null;
  return board;
};

export const { boardAdded } = boardsSlice.actions;
export default boardsSlice.reducer;
