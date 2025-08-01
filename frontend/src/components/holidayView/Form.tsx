import { useEffect, useState } from "react";
import { DayEventHandler, DayPicker } from "react-day-picker";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-day-picker/style.css";
import BudgetSlider from "@/components/holidayView/BudgetSlider";
import PollInput from "@/components/holidayView/PollInput";
import axios from "axios";
import { HolidayForm } from "@/types";
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
  const [holidayForm, setHolidayForm] = useState<HolidayForm>();
  const [availability, setAvailability] = useState<Date[] | undefined>([]);
  const [budget, setBudget] = useState(MAXIMUM_INCRAMENT_MULTIPLE * 0.5);
  const [choices, setChoices] = useState<number[]>([]);

  const handleSliderChange = (value: number) => {
    setBudget(value);
  };

  const handlePollUpdate = (selected: number[], oldSelected: number[]) => {
    // remove previous selected
    const filtered = [...choices].filter((id) => !oldSelected.includes(id));

    // add new options
    const newChoices = [...filtered, ...selected];

    setChoices(newChoices);
  };

  const handleDateUpdate = (dates: Date[] | undefined) => {
    setAvailability(dates);
  };

  const submitForm = () => {
    const budgetValue = budget * BUDGET_INCREMENT;

    const payload = {
      availability,
      budget: budgetValue,
      choiceIds: choices,
    };

    axios
      .post("/api/groups/" + inviteToken + "/responses", payload)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const monthDisplayCheck = () => {
    // check window is less 768px
    return window.innerWidth < 768 ? 1 : 2;
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (inviteToken) {
      axios
        .get("/api/groups/" + inviteToken)
        .then((res) => {
          setHolidayForm(res.data);
        })
        .catch((err) => {
          router.push("/");
        })
        .finally(() => setLoading(false));
    }
  }, [inviteToken]);

  useEffect(() => {
    setMonthDisplay(monthDisplayCheck());

    window.addEventListener("resize", () => {
      setMonthDisplay(monthDisplayCheck());
    });
  }, []);

  if (loading)
    return (
      <div className="flex flex-col gap-4 h-full max-w-[720px] px-4 pb-12 mt-4 mx-auto">
        <Skeleton height={32} />
        <Skeleton height={72} />
        <Skeleton height={64} />
        <Skeleton height={54} />
      </div>
    );

  return (
    <div className="h-full max-w-[720px] px-4 pb-12 mx-auto">
      <div className="flex justify-between my-4 items-center">
        <h2 className="text-xl font-bold">Holiday Form</h2>
        <InviteLink token={inviteToken} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="border-1 border-neutral-300 rounded-sm shadow-xs">
          <h2 className="p-4 border-b-1 border-neutral-300 text-2xl">
            {holidayForm?.title}
          </h2>

          <h3 className={"p-4 " + (!holidayForm && "hidden")}>
            {holidayForm?.description}
          </h3>
        </div>
        <div
          className={
            "p-2 border-1 border-neutral-300 rounded-sm shadow-xs" +
            (!holidayForm?.availabilityTracker && " hidden")
          }
        >
          <DayPicker
            className="w-fit mx-auto"
            animate
            mode="multiple"
            navLayout="around"
            numberOfMonths={monthDisplay}
            selected={availability}
            disabled={{ before: new Date() }}
            onSelect={handleDateUpdate}
          />
        </div>

        <BudgetSlider
          isActive={!holidayForm?.budgetTracker}
          value={budget}
          increment={BUDGET_INCREMENT}
          maxIncMultiple={MAXIMUM_INCRAMENT_MULTIPLE}
          onSlide={handleSliderChange}
        />

        {holidayForm?.polls.map((poll, index) => (
          <PollInput key={index} poll={poll} onUpdate={handlePollUpdate} />
        ))}

        <button
          className="text-md py-1 px-2 bg-brand text-white border-1 rounded-sm border-brand-dark shadow-sm"
          type="button"
          onClick={() => submitForm()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
