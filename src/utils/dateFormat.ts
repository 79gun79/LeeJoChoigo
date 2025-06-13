import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function dateFormat(create_at: string) {
  const now = new Date();
  const createDate = new Date(create_at);
  const diffDay = now.getTime() - createDate.getTime();

  const oneDayMs = 24 * 60 * 60 * 1000;
  if (diffDay < 60 * 1000) {
    return '방금 전';
  } else if (diffDay > oneDayMs) {
    return format(createDate, 'yyyy-MM-dd');
  } else {
    return formatDistanceToNow(createDate, {
      addSuffix: true,
      locale: ko,
    }).replace('약 ', '');
  }
}
