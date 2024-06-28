import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UserContext } from 'src/decorators/user-context.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenContent } from 'src/types/token-content.type';
import { BlogService } from './blog.service';
import { CreateBlogBodyDto } from './dtos/create-blog.dto';
import { DeleteBlogParamDto } from './dtos/delete-blog.dto';
import { GetBlogParamDto } from './dtos/get-blog.dto';
import { UpdateBlogBodyDto, UpdateBlogParamDto } from './dtos/update-blog.dto';

@Controller('blog')
@ApiBearerAuth('jwt-token')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs() {
    return await this.blogService.getBlogs();
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  @Get('/:id')
  async getBlog(@Param() param: GetBlogParamDto) {
    return await this.blogService.getBlog({
      id: param.id,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async createBlog(
    @Body() body: CreateBlogBodyDto,
    @UserContext() userContext: TokenContent,
  ) {
    return await this.blogService.createBlog(
      {
        data: {
          title: body.title,
          content: body.content,
        },
      },
      userContext,
    );
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateBlog(
    @Param() param: UpdateBlogParamDto,
    @Body() body: UpdateBlogBodyDto,
    @UserContext() userContext: TokenContent,
  ) {
    return await this.blogService.updateBlog(
      {
        id: param.id,
        data: {
          title: body.title,
          content: body.content,
        },
      },
      userContext,
    );
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteBlog(
    @Param() param: DeleteBlogParamDto,
    @UserContext() userContext: TokenContent,
  ) {
    return await this.blogService.deleteBlog(
      {
        id: param.id,
      },
      userContext,
    );
  }
}
