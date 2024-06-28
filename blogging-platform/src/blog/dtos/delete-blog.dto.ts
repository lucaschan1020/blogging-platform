import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteBlogParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
