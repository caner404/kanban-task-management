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
  activeBoard: Board | null;
  loading: boolean;
  error?: string;
}

const initialState: BoardsState = {
  boards: [],
  activeBoard: null,
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
      const newBoard = {
        id: action.payload.id,
        name: action.payload.name,
        status: action.payload.status,
      };
      state.boards.push(newBoard);
      state.activeBoard = newBoard;
    },
    boardUpdated(state, action: PayloadAction<Board>) {
      const { id, name, status } = action.payload;
      const updateBoard = state.boards.find((board) => board.id === id);
      if (!updateBoard) throw new Error('Board not found');
      updateBoard.name = name ?? updateBoard.name;
      updateBoard.status = status ?? updateBoard.status;
    },
    boarddDeleted(state, action: PayloadAction<Board>) {
      const { id } = action.payload;
      const boards = state.boards.filter((board) => board.id !== id);
      state.boards = boards;
      state.activeBoard = state.boards.length > 1 ? boards[0] : null!;
    },
    updateActiveBoard(state, action: PayloadAction<Board>) {
      const { id } = action.payload;
      const board = state.boards.find((board) => board.id === id);
      if (board === undefined) throw new Error('Board not found');
      state.activeBoard = board;
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
          state.activeBoard = action.payload.boards[0];
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

export const { boardAdded, boardUpdated, boarddDeleted, updateActiveBoard } =
  boardsSlice.actions;
export default boardsSlice.reducer;
