import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import BudgetSlider from "@/components/BudgetSlider";
import PollInput from "@/components/HolidayView/PollInput";
import axios from "axios";
import { HolidayPoll } from "@/types";
import router from "next/router";
import InviteLink from "@/components/InviteLink";

type FormProps = {
  inviteToken: string;
};

export default function Form({ inviteToken }: FormProps) {
  const BUDGET_INCREMENT = 50;
  const MAXIMUM_INCRAMENT_MULTIPLE = 40;

  const [monthDisplay, setMonthDisplay] = useState(0);

  // set budget slider to half
  const [budget, setBudget] = useState(MAXIMUM_INCRAMENT_MULTIPLE * 0.5);

  const [holidayPoll, setHolidayPoll] = useState<HolidayPoll>();

  const handleSliderChange = (value: number) => {
    setBudget(value);
  };

  const monthDisplayCheck = () => {
    // check window is less 768px
    return window.innerWidth < 768 ? 1 : 2;
  };

  useEffect(() => {
    if (inviteToken) {
      axios
        .get("/api/groups/" + inviteToken)
        .then((res) => {
          setHolidayPoll(res.data);
        })
        .catch((err) => {
          router.push("/");
        });
    }
  }, [inviteToken]);

  useEffect(() => {
    setMonthDisplay(monthDisplayCheck());

    window.addEventListener("resize", () => {
      setMonthDisplay(monthDisplayCheck());
    });
  }, []);

  return (
    <div className="h-full max-w-[720px] px-4 pb-4 mx-auto">
      <div className="flex justify-between my-4 items-center">
        <h2 className="text-xl font-bold">Holiday Form</h2>
        <InviteLink token={inviteToken} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border-1 border-neutral-300 rounded-sm shadow-xs">
          <h2 className="p-4 border-b-1 border-neutral-300 text-2xl">
            {holidayPoll?.title}
          </h2>

          <h3 className={"p-4 " + (!holidayPoll && "hidden")}>
            {holidayPoll?.description}
          </h3>
        </div>
        <div
          className={
            "p-2 border-1 border-neutral-300 rounded-sm shadow-xs" +
            (!holidayPoll?.availabiltiyTracker && " hidden")
          }
        >
          <DayPicker
            className="w-fit mx-auto"
            animate
            mode="multiple"
            navLayout="around"
            numberOfMonths={monthDisplay}
          />
        </div>

        <BudgetSlider
          isActive={!holidayPoll?.budgetTracker}
          value={budget}
          increment={BUDGET_INCREMENT}
          maxIncMultiple={MAXIMUM_INCRAMENT_MULTIPLE}
          onSlide={handleSliderChange}
        />

        {holidayPoll?.polls.map((poll, index) => (
          <PollInput key={index} poll={poll} />
        ))}

        <button
          className="text-md py-1 px-2 bg-brand text-white border-1 rounded-sm border-brand-dark shadow-sm"
          type="button"
          onClick={() => {}}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
