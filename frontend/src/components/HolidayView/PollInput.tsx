import { Poll } from "@/types";

export default function PollInput({ poll }: { poll: Poll }) {
  return (
    <form className="flex flex-col gap-4 px-2 py-4 border-1 border-neutral-300 rounded-sm shadow-xs">
      <h2 className="text-xl">{poll.question}</h2>

      {poll.options.map((option, index) => (
        <div key={index}>
          <label className="flex gap-2">
            <input
              type={poll.isMultipleChoice ? "checkbox" : "radio"}
              name="poll"
              value="option1"
            />
            <h3>{option}</h3>
          </label>
        </div>
      ))}
    </form>
  );
}
