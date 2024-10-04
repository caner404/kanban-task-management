export type BoardStatus = {
  id: string;
  name: string;
  boardId: string;
};
export type Board = {
  id: string;
  name: string;
  status: BoardStatus[];
};
