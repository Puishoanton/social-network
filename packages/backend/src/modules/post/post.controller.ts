import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { POST_ROUTE_KEYS } from 'src/shared/routes';
import { UserReturnType } from 'src/typings';
import { Auth } from '../auth/decorator/auth.decorator';
import { User } from '../auth/decorator/user.decorator';
import { PostService } from './post.service';

@Controller(POST_ROUTE_KEYS.MAIN)
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Auth()
  @Post(POST_ROUTE_KEYS.CREATE)
  public async create(
    @Body('content') content: string,
    @User() user: UserReturnType,
  ) {
    return this.postService.create(content, user.id);
  }

  @Get(POST_ROUTE_KEYS.GET_ALL)
  public async getAll() {
    return this.postService.findAll();
  }

  @Auth()
  @Get(POST_ROUTE_KEYS.GET_ALL_BY_USER_ID)
  public async getAllByUserId(@User() user: UserReturnType) {
    return this.postService.findAllByUserId(user.id);
  }

  @Auth()
  @Post(POST_ROUTE_KEYS.LIKE_POST)
  public async likePost(
    @Param('postId') postId: string,
    @User() user: UserReturnType,
  ) {
    return this.postService.likePost(postId, user.id);
  }

  @Get(POST_ROUTE_KEYS.ID)
  public async getPostByID(
    @Param('id') postId: string,
  ) {
    return this.postService.getPostById(postId,);
  }
}
