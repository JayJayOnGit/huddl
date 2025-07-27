import { format } from "date-fns";
import { Preview } from "@/types";
import { useRouter } from "next/router";

export default function HolidayPreview({
  host,
  title,
  description,
  startDate,
  endDate,
  token,
}: Preview) {
  const router = useRouter();

  return (
    <div
      className="flex flex-col gap-y-2 p-3 rounded-sm border-1 border-neutral-200 shadow-xs hover:border-brand hover:shadow-sm transition-all cursor-pointer"
      onClick={() => {
        router.push("/group/" + token);
      }}
    >
      <div className="flex justify-between">
        <h3 className="text-xl">{title}</h3>
        <small className="w-min py-1 px-2 border-1 h-fit bg-pending border-pending-dark text-pending-dark rounded-xl">
          Pending
        </small>
      </div>
      <div className="flex gap-x-2">
        <p>{"Location, City"}</p>
        <p className={" " + (!startDate && "hidden")}>|</p>
        <p className={"text-brand-dark " + (!startDate && "hidden")}>
          {(startDate && format(startDate, "d MMM")) +
            " - " +
            (endDate && format(endDate, "d MMM"))}
        </p>
      </div>
      <p className="text-ellipsis text-nowrap overflow-hidden text-neutral-600">
        {description}
      </p>
      <small className="text-right text-neutral-600">Created by {host}</small>
    </div>
  );
}
