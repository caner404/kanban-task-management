import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { Board, boardsSlice } from '../features/boards';
import { Task, tasksSlice } from '../features/tasks';
import { DarkModeProvider } from '@/context';

export const KanbanMockStore = ({
  state,
  children,
}: {
  state: {
    boardState: {
      boards: Board[];
      loading: boolean;
      error?: string;
      activeBoard: Board;
    };
    taskState: Task[];
  };
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        boards: createSlice({
          name: 'boards',
          initialState: state.boardState,
          reducers: boardsSlice.caseReducers,
        }).reducer,
        tasks: createSlice({
          name: 'tasks',
          initialState: state.taskState,
          reducers: tasksSlice.caseReducers,
        }).reducer,
      },
    })}
  >
    <DarkModeProvider>{children}</DarkModeProvider>
  </Provider>
);
