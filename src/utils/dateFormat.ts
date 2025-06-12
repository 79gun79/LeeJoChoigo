import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function dateFormat(create_at: string) {
  const now = new Date();
  const diffDay = now.getTime() - new Date(create_at).getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  if (diffDay < 60 * 1) {
    return '방금 전';
  } else if (diffDay > oneDayMs) {
    return format(create_at, 'yyyy-MM-dd');
  } else {
    return formatDistanceToNow(create_at, {
      addSuffix: true,
      locale: ko,
    }).split('약 ')[1];
  }
}
