import { ForbiddenError } from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Blog } from 'src/models';
import {
  AppActions,
  CaslAbilityFactory,
} from 'src/modules/casl/casl-ability.factory';
import { BlogRepository } from 'src/repositories';
import { TokenContent } from 'src/types/token-content.type';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  getBlogs = async () => {
    const blogs = await this.blogRepository.find({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return blogs;
  };

  getBlog = async (args: { id: number }) => {
    const blog = await this.blogRepository.findOne({
      where: { id: args.id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return blog;
  };

  createBlog = async (
    args: { data: { title: string; content: string } },
    userContext: TokenContent,
  ) => {
    let blog = new Blog({
      title: args.data.title,
      content: args.data.content,
      createdById: userContext.userId,
    });

    blog = await this.blogRepository.save(blog);

    return blog;
  };

  updateBlog = async (
    args: { id: number; data: { title: string; content: string } },
    userContext: TokenContent,
  ) => {
    let blog = await this.blogRepository.findOne({
      where: { id: args.id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const ability = this.caslAbilityFactory.createForUser(userContext);
    ForbiddenError.from(ability).throwUnlessCan(AppActions.Update, blog);

    blog.title = args.data.title;
    blog.content = args.data.content;

    blog = await this.blogRepository.save(blog);

    return blog;
  };

  deleteBlog = async (args: { id: number }, userContext: TokenContent) => {
    let blog = await this.blogRepository.findOne({
      where: { id: args.id },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    const ability = this.caslAbilityFactory.createForUser(userContext);
    ForbiddenError.from(ability).throwUnlessCan(AppActions.Delete, blog);

    await this.blogRepository.remove(blog);

    return blog;
  };
}
