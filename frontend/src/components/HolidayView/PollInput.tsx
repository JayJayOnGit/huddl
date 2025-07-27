import { FormPoll } from "@/types";
import { useState } from "react";

type FormPollProps = {
  poll: FormPoll;
  onUpdate: (selected: number[], oldSelected: number[]) => void;
};

export default function PollInput({ poll, onUpdate }: FormPollProps) {
  const [selected, setSelected] = useState<number[]>([]);

  const haddleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.value);
    let updatedSelected: number[];

    if (poll.isMultipleChoice) {
      updatedSelected = [...selected];

      if (e.target.checked) {
        updatedSelected.push(id);
      } else {
        updatedSelected = updatedSelected.filter((val) => val !== id);
      }
    } else {
      updatedSelected = [id];
    }

    onUpdate(updatedSelected, selected);
    setSelected(updatedSelected);
  };

  return (
    <form className="flex flex-col p-4 gap-4 border-1 border-neutral-300 rounded-sm shadow-xs">
      <h2 className="text-xl">{poll.question}</h2>

      {Object.entries(poll.options).map(([id, option]) => (
        <div key={id}>
          <label className="flex gap-2">
            <input
              type={poll.isMultipleChoice ? "checkbox" : "radio"}
              name="poll"
              value={id}
              onChange={haddleChange}
            />
            <h3>{option}</h3>
          </label>
        </div>
      ))}
    </form>
  );
}
