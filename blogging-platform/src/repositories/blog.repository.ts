import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/models/blog.entity';
import { AbstractRepository } from 'src/modules/database/abstract.repository';
import { EntityManager, Repository } from 'typeorm';

export class BlogRepository extends AbstractRepository<Blog> {
  protected readonly logger = new Logger(Blog.name);

  constructor(
    @InjectRepository(Blog)
    repository: Repository<Blog>,
    entityManager: EntityManager,
  ) {
    super(repository, entityManager);
  }
}
