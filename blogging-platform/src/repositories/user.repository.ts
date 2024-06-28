import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { AbstractRepository } from 'src/modules/database/abstract.repository';
import { EntityManager, Repository } from 'typeorm';

export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(User.name);

  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(repository, entityManager);
  }
}
