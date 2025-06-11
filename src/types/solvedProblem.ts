export interface SolvedProblem {
  count: number;
  items: Problem[];
}

export interface Problem {
  problemId: number;
  titleKo: string;
  titles: ProblemTitleTranslated[];
  isSolvable: boolean;
  isPartial: boolean;
  acceptedUserCount: number;
  level: number;
  votedUserCount: number;
  sprout: boolean;
  givesNoRating: boolean;
  isLevelLocked: boolean;
  averageTries: number;
  official: boolean;
  tags: ProblemTag[];
  metadata: null;
}

export interface ProblemTitleTranslated {
  language: string;
  languageDisplayName: string;
  title: string;
  isOriginal: boolean;
}

export interface ProblemTag {
  key: string;
  isMeta: boolean;
  bojTagId: number;
  problemCount: number;
  displayNames: ProblemTagNameTranslated[];
  aliases: ProblemTagAlias[];
}

export interface ProblemTagNameTranslated {
  language: string;
  name: string;
  short: string;
}

export interface ProblemTagAlias {
  alias: string;
}
