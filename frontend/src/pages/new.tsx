import AuthRequired from "@/components/AuthRequired";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateGroup() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availabiltiyTracker, setAvailabiltiyTracker] = useState(false);
  const [budgetTracker, setBudgetTracker] = useState(false);

  const createGroup = () => {
    console.log(title, description, availabiltiyTracker, budgetTracker);

    axios
      .post("/api/groups", {
        title,
        description,
        availabiltiyTracker,
        budgetTracker,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  return (
    <AuthRequired>
      <div className="w-full h-full">
        <Header />
        <div className="h-full max-w-[720px] px-4 mx-auto">
          <div className="flex flex-col mt-8 mb-4 border-1 border-neutral-300 rounded-md">
            <input
              className="text-xl w-full p-2 border-b-1 border-neutral-300"
              type="text"
              placeholder="New Holiday"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="text-md w-full p-2 border-b-1 border-neutral-300 text-wrap"
              placeholder="Holiday description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="w-full grid grid-cols-2 p-4 gap-4">
              <label className="toggle-button h-12 shadow-xs">
                <input
                  type="checkbox"
                  onChange={(e) => setAvailabiltiyTracker(e.target.checked)}
                />
                <span className="toggle">Availability Tracker</span>
              </label>

              <label className="toggle-button h-12 shadow-xs">
                <input
                  type="checkbox"
                  onChange={(e) => setBudgetTracker(e.target.checked)}
                />
                <span className="toggle">Budget Tracker</span>
              </label>
            </div>
          </div>

          <button
            className="text-md py-1 px-2 bg-brand text-white border-1 rounded-sm border-brand-dark shadow-sm float-right"
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
