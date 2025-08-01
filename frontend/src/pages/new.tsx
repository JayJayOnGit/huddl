import AuthRequired from "@/components/AuthRequired";
import Header from "@/components/Header";
import { useState } from "react";
import axios from "axios";
import PollBuilder from "@/components/newHolidayView/PollBuilder";
import { Poll } from "@/types";
import router from "next/router";

export default function CreateGroup() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availabilityTracker, setAvailabilityTracker] = useState(false);
  const [budgetTracker, setBudgetTracker] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const emptyPoll = {
    question: "",
    isMultipleChoice: false,
    options: [""],
  };

  const [polls, setPolls] = useState<Poll[]>([]);

  const handlePollChange = (index: number, poll: Poll) => {
    const updatedPolls = [...polls];
    updatedPolls[index] = poll;

    setPolls(updatedPolls);
  };

  const handleRemovePoll = (index: number) => {
    const updatedPolls = polls.filter((_, i) => i !== index);
    setPolls(updatedPolls);
  };

  const addPoll = () => {
    const updatedPolls = [...polls];
    updatedPolls.push(emptyPoll);

    setPolls(updatedPolls);
  };

  const createGroup = () => {
    if (!validate()) return;

    const cleanedPolls = polls.map((poll) => ({
      ...poll,
      options: [...poll.options],
    }));

    for (const p of cleanedPolls) {
      p.options = p.options.filter((option) => option.trim() !== "");
    }

    if (availabilityTracker) {
      setStartDate(null);
      setEndDate(null);
    }

    const payload = {
      title,
      description,
      availabilityTracker,
      budgetTracker,
      startDate,
      endDate,
      polls: cleanedPolls,
    };

    axios
      .post("/api/groups", payload)
      .then((res) => {
        router.replace("/group/" + res.data.token);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  const validate = () => {
    if (title == "") return false;

    for (const poll of polls) {
      if (!validatePoll(poll)) return false;
    }

    if (!availabilityTracker) {
      if (endDate == null || startDate == null) return false;

      if (new Date(startDate) > new Date(endDate)) return false;
    }

    return true;
  };

  const validatePoll = (poll: Poll) => {
    if (poll.question == "") return false;

    if (poll.options.length < 2) return false;

    for (const option of poll.options.slice(0, -1))
      if (option == "") return false;

    return true;
  };

  return (
    <AuthRequired>
      <div className="w-full h-full">
        <Header states={[]} onStateChance={() => {}} />
        <div className="h-full max-w-[720px] px-4 mx-auto">
          <h2 className="my-4 text-xl font-bold">Plan New Holiday</h2>
          <div className="flex flex-col mb-4 border-1 border-neutral-300 rounded-md shadow-2xs">
            <input
              className="text-xl w-full p-4 border-b-1 border-neutral-300"
              type="text"
              placeholder="New Holiday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="text-md h-auto w-full p-4 border-b-1 border-neutral-300 text-wrap"
              placeholder="Holiday description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="w-full grid grid-cols-2 p-4 gap-4">
              <label className="toggle-button h-12 shadow-xs cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => setAvailabilityTracker(e.target.checked)}
                />
                <span className="toggle max-sm:text-sm">
                  Availability Tracker
                </span>
              </label>

              <label className="toggle-button h-12 shadow-xs cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => setBudgetTracker(e.target.checked)}
                />
                <span className="toggle max-sm:text-sm">Budget Tracker</span>
              </label>
            </div>

            <div
              className={
                "w-full grid grid-cols-2 p-2 border-t-1 border-neutral-300 " +
                (availabilityTracker && "hidden")
              }
            >
              <div className="px-4 flex justify-between items-center gap-4 border-r-1 border-neutral-300">
                <label className="text-neutral-500 max-sm:hidden">Depart</label>
                <input
                  className="flex-grow p-2"
                  type="date"
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>
              <div className="px-4 flex justify-between items-center gap-4">
                <label className="text-neutral-500 max-sm:hidden">Return</label>
                <input
                  className="flex-grow p-2"
                  type="date"
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>

            {polls.map((poll, index) => (
              <div className="p-4 border-t-1 border-neutral-300" key={index}>
                <PollBuilder
                  pollIndex={index}
                  question={poll.question}
                  isMultipleChoice={poll.isMultipleChoice}
                  options={poll.options}
                  onUpdate={handlePollChange}
                  onRemove={handleRemovePoll}
                />
              </div>
            ))}

            <div className="p-2 border-t-1 border-neutral-300">
              <button
                className="w-full p-2 border-1 border-neutral-300 hover:border-brand rounded-sm shadow-xs cursor-pointer"
                onClick={addPoll}
              >
                Add Poll
              </button>
            </div>
          </div>

          <button
            className="text-md py-1 px-2 bg-brand hover:bg-brand-dark text-white border-1 rounded-sm border-brand-dark shadow-sm float-right cursor-pointer"
            type="button"
            onClick={() => createGroup()}
          >
            Create Holiday Group
          </button>
        </div>
      </div>
    </AuthRequired>
  );
}
