import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class TaskList {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  header: string;

  @Column()
  description: string;

  @Column()
  isDone: number;
}
