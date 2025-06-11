import type { getChannelPosts, getPost } from '../components/api/postApi';
import type { getUser } from '../components/api/userApi';
import type { fetchChannel1 } from '../loader/channel.loader';
import type { fetchPostDetail } from '../loader/post.loader';
type ElementType<T> = T extends (infer U)[] ? U : T;

export type ChannelType = NonNullable<
  Awaited<ReturnType<typeof fetchChannel1>>
>; // 채널 타입 가져오기

export type PostsType = Awaited<ReturnType<typeof getChannelPosts>>;
export type PostType = ElementType<NonNullable<PostsType>>;

export type PostDetail = NonNullable<
  Awaited<ReturnType<typeof fetchPostDetail>>
>;
export type Post = NonNullable<Awaited<ReturnType<typeof getPost>>>;
export type User = Awaited<ReturnType<typeof getUser>>;
