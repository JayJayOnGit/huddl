import { useState } from "react";
import PollOption from "@/components/newHolidayView/PollOption";
import { Poll } from "@/types";

type PollBuilderProps = {
  pollIndex: number;
  question: string;
  isMultipleChoice: boolean;
  options: string[];
  onUpdate: (index: number, poll: Poll) => void;
  onRemove: (index: number) => void;
};

export default function PollBuilder({
  pollIndex,
  question,
  isMultipleChoice,
  options,
  onUpdate,
  onRemove,
}: PollBuilderProps) {
  const [poll, setPoll] = useState({ question, isMultipleChoice, options });

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...poll.options];
    updatedOptions[index] = value;

    if (index == poll.options.length - 1) {
      updatedOptions.push("");
    }

    const newPoll = { ...poll, options: updatedOptions };

    setPoll(newPoll);
    onUpdate(pollIndex, newPoll);
  };

  const handleRemoveOption = (index: number) => {
    if (poll.options.length > 1 && index !== poll.options.length - 1) {
      const updatedOptions = poll.options.filter((_, i) => i !== index);
      const newPoll = { ...poll, options: updatedOptions };

      setPoll(newPoll);
      onUpdate(pollIndex, newPoll);
    }
  };

  const validatePoll = () => {
    if (poll.question == "") return false;

    if (poll.options.length < 3) return false;

    for (const option of poll.options.slice(0, -1))
      if (option == "") return false;

    return true;
  };

  return (
    <div>
      <div className="flex max-sm:flex-col justify-between gap-4">
        <div className="flex w-full gap-4">
          <img
            className="h-6 m-auto opacity-50 hover:opacity-100 cursor cursor-pointer"
            src="/icons/delete.png"
            onClick={() => onRemove(pollIndex)}
          />
          <input
            className="flex-grow h-fit w-full p-2 border-b-1 border-neutral-300"
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) => {
              const newPoll = { ...poll, question: e.target.value };
              setPoll(newPoll);
              onUpdate(pollIndex, newPoll);
            }}
          />
        </div>

        <label className="flex p-2 gap-2 w-fit border-1 border-neutral-300 rounded-sm whitespace-nowrap">
          <input
            className="accent-brand-dark"
            type="checkbox"
            checked={isMultipleChoice}
            onChange={(e) => {
              const newPoll = { ...poll, isMultipleChoice: e.target.checked };
              setPoll(newPoll);
              onUpdate(pollIndex, newPoll);
            }}
          ></input>
          Multiple Choice
        </label>
      </div>

      <div className="flex flex-col gap-2 my-4">
        {options.map((option, index) => (
          <PollOption
            key={index}
            index={index}
            value={option}
            onChange={handleOptionChange}
            onRemove={handleRemoveOption}
          />
        ))}
      </div>
    </div>
  );
}
