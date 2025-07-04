import type { getChannelPosts, getPost } from '../api/postApi';
import type { getUser } from '../api/userApi';
import type { fetchChannel1 } from '../loader/channel.loader';
import type { fetchPostDetail, getPostDetail } from '../loader/post.loader';
import type { fetchBjProblems } from '../utils/fetchBjProblems';
type ElementType<T> = T extends (infer U)[] ? U : T;

export type ChannelType = NonNullable<
  Awaited<ReturnType<typeof fetchChannel1>>
>; // 채널 타입 가져오기

export type PostsType = Awaited<ReturnType<typeof getChannelPosts>>;
export type PostType = ElementType<NonNullable<PostsType>>;

export type PostDetailType = NonNullable<
  Awaited<ReturnType<typeof getPostDetail>>
>;
export type CommentType = ElementType<NonNullable<CommentsType>>;

export type PostDetail = NonNullable<
  Awaited<ReturnType<typeof fetchPostDetail>>
>;
export type Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;
export type User = Awaited<ReturnType<typeof getUser>>;

export type BJPostType = ElementType<
  NonNullable<Awaited<ReturnType<typeof fetchBjProblems>>>
>;
