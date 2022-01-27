import { PartialType } from '@nestjs/mapped-types';

import { CreateBlogPostDto } from '../../blog/dto/create-blog-post.dto';

export class NewBlgPostDto extends PartialType(CreateBlogPostDto) {}
