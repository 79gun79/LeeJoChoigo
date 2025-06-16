export const  getChannelPath = (channelId: number, postId?: number): string => {
  const channelPath = (() => {
    switch (channelId) {
      case 1:
        return '/problems/coding';
      case 2:
        return '/problems/job';
      case 3:
        return '/solutions/coding';
      case 4:
        return '/solutions/job';
      case 5:
        return '/questions';
      default:
        return '/';
    }
  })();

  return postId ? `${channelPath}/${postId}` : channelPath;
};
