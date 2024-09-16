import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from './types/Board';

export interface Boardstate {
  board: Board[];
}
const initialState: Boardstate = {
  board: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState: initialState,
  reducers: {
    boardAdded(state, action: PayloadAction<Board>) {
      state.board.push({
        id: action.payload.id,
        name: action.payload.name,
        columns: action.payload.columns,
      });
    },
  },
});

export const { boardAdded } = boardsSlice.actions;
export default boardsSlice.reducer;
