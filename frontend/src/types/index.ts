export type Poll = {
  question: string;
  isMultipleChoice: boolean;
  options: string[];
};

export type HolidayPoll = {
  title: string;
  description: string;
  availabiltiyTracker: boolean;
  budgetTracker: boolean;
  startDate: Date;
  endDate: Date;
  polls: Poll[];
};

export type Preview = {
  host: string;
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  token: string;
};
