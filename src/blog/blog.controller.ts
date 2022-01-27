import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Image } from '../common/classes/Image';
import { BodyWithImage } from '../common/decorators/body-with-image.decorator';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './schemas/blog-post.schema';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.blogService.findAll();
  }

  @Get('active')
  findAllActive(): Promise<BlogPost[]> {
    return this.blogService.findAllActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findOne(id);
  }

  @Get('active/:id')
  findOneActive(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.findOneActive(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogService.create(createBlogPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogService.update(id, updateBlogPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  toggle(@Param('id') id: string): Promise<BlogPost> {
    return this.blogService.toggle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.blogService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post(':id/image/:paragraph-id')
  createImage(
    @Param('id') id: string,
    @Param('paragraph-id') paragraphId: string,
    @BodyWithImage(new ValidationPipe({ validateCustomDecorators: true }))
    image: Image,
  ): Promise<BlogPost> {
    return this.blogService.addParagraphImage(id, paragraphId, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/image/:paragraph-id/:image-id')
  removeImage(
    @Param('id') id: string,
    @Param('paragraph-id') paragraphId: string,
    @Param('image-id') imageId: string,
  ): Promise<void> {
    return this.blogService.removeParagraphImage(id, paragraphId, imageId);
  }
}
