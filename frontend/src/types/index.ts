export type Poll = {
  question: string;
  isMultipleChoice: boolean;
  options: string[];
};

export type FormPoll = {
  question: string;
  isMultipleChoice: boolean;
  options: { [key: number]: string };
};

export type HolidayForm = {
  title: string;
  description: string;
  availabilityTracker: boolean;
  budgetTracker: boolean;
  startDate: Date;
  endDate: Date;
  polls: FormPoll[];
};

export type Preview = {
  host: string;
  title: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  token: string;
};
