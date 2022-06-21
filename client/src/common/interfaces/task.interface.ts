import { Base } from './base.interface';

export interface Task extends Base {
  _id: string;
  isDone: 1 | 0;
  header: string;
  description: string;
}
