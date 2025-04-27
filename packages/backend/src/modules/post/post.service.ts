import { ConflictException, Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { prismaPostInclude, prismaPostOmit } from 'src/shared/constants';
import { MessegeResponseType, PostReturnType } from 'src/typings';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    content: string,
    userId: string,
  ): Promise<PostReturnType> {
    const post = await this.prismaService.post.create({
      data: {
        userId,
        content,
      },
      include: prismaPostInclude,
      omit: prismaPostOmit,
    });

    const { likes, ...returnPost } = post;
    return { ...returnPost, likes: post.likes.length };
  }

  public async findAll(): Promise<Array<PostReturnType>> {
    const posts = await this.prismaService.post.findMany({
      include: prismaPostInclude,
      omit: prismaPostOmit,
    });

    return posts.map((post) => ({ ...post, likes: post.likes.length }));
  }

  public async findAllByUserId(userId: string): Promise<Array<PostReturnType>> {
    const posts = await this.prismaService.post.findMany({
      where: {
        userId,
      },
      include: prismaPostInclude,
      omit: prismaPostOmit,
    });

    return posts.map((post) => ({ ...post, likes: post.likes.length }));
  }

  public async likePost(
    postId: string,
    userId: string,
  ): Promise<MessegeResponseType> {
    const post = await this.findPostById(postId);
    if (!post) throw new ConflictException('Post not found');

    const existingLike = await this.prismaService.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
    if (existingLike) {
      await this.prismaService.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { message: 'Like removed' };
    } else {
      await this.prismaService.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
    return { message: 'Like added' };
  }

  private async findPostById(id: string): Promise<Post | null> {
    return this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }
}
