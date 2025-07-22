export type Poll = {
  question: string;
  isMultipleChoice: boolean;
  options: string[];
};

export type GroupInfo = {
  title: string;
  description: string;
  availabiltiyTracker: boolean;
  budgetTracker: boolean;
  startDate: Date;
  endDate: Date;
  polls: Poll[];
};
