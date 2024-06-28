import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetBlogParamDto {
  @IsNumber()
  @Type(() => Number)
  id: number;
}
