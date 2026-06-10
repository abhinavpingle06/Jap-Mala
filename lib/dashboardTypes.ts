export type ViewMode = 'weekly' | 'monthly' | 'yearly';

export interface DailyJapaRecord {
  date: string; // ISO date
  count: number;
}

export interface MonthlyJapaRecord {
  year: number;
  month: number; // 1-12
  daily: DailyJapaRecord[];
}

export interface YearlyJapaRecord {
  year: number;
  months: MonthlyJapaRecord[];
}

export interface CalendarDay {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isFuture: boolean;
  count?: number; // japa count
}

export interface UserStatistics {
  todayCount: number;
  currentStreak: number;
  highestSingleDay: number;
  lifetimeCount: number;
  completedRounds: number;
  daysPracticed: number;
}

// TODO: Replace mock types with API models when backend available
