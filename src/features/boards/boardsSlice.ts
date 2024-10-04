import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from './types/Board';

const initialState: Board[] = [];

export const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {
    boardAdded(state, action: PayloadAction<Board>) {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        status: action.payload.status,
      });
    },
  },
});

export const selectBoardById = (state: RootState, boardId: string) => {
  const board = state.boards.find((board) => board.id === boardId);
  if (!board) return null;
  return board;
};

export const { boardAdded } = boardsSlice.actions;
export default boardsSlice.reducer;
