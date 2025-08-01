import InviteLink from "@/components/InviteLink";
import ChartDisplay from "@/components/HolidayView/ChartDisplay";

type FormResultsProps = {
  inviteToken: string;
};

export default function FormResults({ inviteToken }: FormResultsProps) {
  return (
    <div className="h-full max-w-[720px] px-4 pb-4 mx-auto">
      <div className="flex justify-between my-4 items-center">
        <h2 className="text-xl font-bold">Form Results</h2>
        <InviteLink token={inviteToken} />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
          <div className="border-1 border-neutral-300 rounded-sm shadow-xs">
            <h2 className="text-sm text-center p-2">
              Who feels like driving ?
            </h2>
            <div className="p-4">
              <ChartDisplay type="bar" />
            </div>
          </div>

          <div className="border-1 p-2 border-neutral-300 rounded-sm shadow-xs">
            <ChartDisplay type="pie" />
          </div>

          <div className="border-1 p-2 border-neutral-300 rounded-sm shadow-xs">
            <ChartDisplay type="line" />
          </div>
        </div>
      </div>
    </div>
  );
}
