import type { fetchChannel1 } from '../loader/channel.loader';

export type ChannelType = NonNullable<
  Awaited<ReturnType<typeof fetchChannel1>>
>; // 채널 타입 가져오기
