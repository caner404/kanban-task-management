import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BoardOverview } from './BoardOverview';
import { boardsSlice, Boardstate } from './boardsSlice';

// A super-simple mock of a redux store
const Mockstore = ({
  boardState,
  children,
}: {
  boardState: Boardstate;
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        boards: createSlice({
          name: 'boards',
          initialState: boardState,
          reducers: boardsSlice.caseReducers,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  title: 'boards/BoardOverview',
  component: BoardOverview,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  excludeStories: /.*MockedState$/,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BoardOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (story) => (
      <Mockstore
        boardState={{
          board: [
            {
              id: '1',
              name: 'Moonlight Sun',
              columns: ['Todo', 'Doing', 'Done'],
            },
          ],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const NoProject: Story = {
  decorators: [
    (story) => (
      <Mockstore
        boardState={{
          board: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
