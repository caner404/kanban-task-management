import { Task } from '../../tasks/types/Task';

export type Column = {
  title: string;
  tasks: Task[];
};
export type Board = {
  id: string;
  name: string;
  columns: Column[];
};
