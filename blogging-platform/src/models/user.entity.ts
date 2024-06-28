import { AbstractEntity } from 'src/modules/database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @OneToMany(() => Blog, (user) => user.createdBy, {
    cascade: true,
  })
  blogs?: Blog[];
}
