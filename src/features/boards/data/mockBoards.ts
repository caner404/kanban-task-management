import { Board, BoardStatus } from '../types';

export const testBoardStatuses: BoardStatus[] = [
  { id: 'status-1', name: 'To Do', boardId: 'board-1' },
  { id: 'status-2', name: 'In Progress', boardId: 'board-1' },
  { id: 'status-3', name: 'Done', boardId: 'board-1' },
  { id: 'status-4', name: 'To Do', boardId: 'board-2' },
  { id: 'status-5', name: 'In Progress', boardId: 'board-2' },
  { id: 'status-6', name: 'Done', boardId: 'board-2' },
  { id: 'status-7', name: 'To Do', boardId: 'board-3' },
  { id: 'status-8', name: 'Working on', boardId: 'board-3' },
  { id: 'status-9', name: 'Finished', boardId: 'board-3' },
];

export const testBoards: Board[] = [
  {
    id: 'board-1',
    name: 'Personal Projects',
    status: testBoardStatuses.filter((status) => status.boardId === 'board-1'),
  },
  {
    id: 'board-2',
    name: 'Work Projects',
    status: testBoardStatuses.filter((status) => status.boardId === 'board-2'),
  },
  {
    id: 'board-3',
    name: 'Roadmap',
    status: testBoardStatuses.filter((status) => status.boardId === 'board-3'),
  },
];
