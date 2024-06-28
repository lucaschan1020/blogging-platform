import { AbstractEntity } from 'src/modules/database/abstract.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Blog extends AbstractEntity<Blog> {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, (user) => user.blogs, {
    cascade: ['insert', 'update'],
  })
  createdBy: User;

  @RelationId((blog: Blog) => blog.createdBy)
  @Column({ type: 'integer' })
  createdById: number;
}
