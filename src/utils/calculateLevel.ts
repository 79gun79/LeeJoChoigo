const BRONZE = '🐻 브론즈 ';
const SILVER = '🪙 실버 ';
const GOLD = '👑 골드 ';
const PLATINUM = '🧌 플래티넘 ';
const DIAMOND = '💠 다이아몬드 ';
const RUBY = '🐦‍🔥 루비 ';

export const calculateLevel = (solved_problem_level: number): string => {
  switch (solved_problem_level) {
    case 1:
      return BRONZE + '5';

    case 2:
      return BRONZE + '4';

    case 3:
      return BRONZE + '3';

    case 4:
      return BRONZE + '2';

    case 5:
      return BRONZE + '1';

    case 6:
      return SILVER + '5';

    case 7:
      return SILVER + '4';

    case 8:
      return SILVER + '3';

    case 9:
      return SILVER + '2';

    case 10:
      return SILVER + '1';

    case 11:
      return GOLD + '5';

    case 12:
      return GOLD + '4';

    case 13:
      return GOLD + '3';

    case 14:
      return GOLD + '2';

    case 15:
      return GOLD + '1';

    case 16:
      return PLATINUM + '5';

    case 17:
      return PLATINUM + '4';

    case 18:
      return PLATINUM + '3';

    case 19:
      return PLATINUM + '2';

    case 20:
      return PLATINUM + '1';

    case 21:
      return DIAMOND + '5';

    case 22:
      return DIAMOND + '4';

    case 23:
      return DIAMOND + '3';

    case 24:
      return DIAMOND + '2';

    case 25:
      return DIAMOND + '1';

    case 26:
      return RUBY + '5';

    case 27:
      return RUBY + '4';

    case 28:
      return RUBY + '3';

    case 29:
      return RUBY + '2';

    case 30:
      return RUBY + '1';

    default:
      return '레벨 없음';
  }
};
