import { Preview } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HolidayPreview from "./HolidayPreview";
import Skeleton from "react-loading-skeleton";

export default function HolidayPreviewList() {
  const router = useRouter();

  const [holidayPreviews, setHolidayPreviews] = useState<Preview[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/groups")
      .then((res) => {
        setHolidayPreviews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        router.push("/");
      })
      .finally(() => setLoading(false));
  }, []);

  const Loading = () => {
    return (
      <div className="h-full max-w-[1280px] px-4 mx-auto">
        {" "}
        <div className="flex flex-col gap-2 pt-2">
          <Skeleton height={32} />
          <Skeleton height={152} />
          <Skeleton height={152} />
        </div>
      </div>
    );
  };

  if (loading) return <Loading />;

  return (
    <div className="h-full max-w-[1280px] px-4 mx-auto">
      <div className="flex justify-between my-3 items-center">
        <h2 className="text-xl font-bold">All Your Holidays</h2>
        <button
          className="text-md py-1 px-2 bg-brand hover:bg-brand-dark text-white border-1 rounded-sm border-brand-dark shadow-sm cursor-pointer"
          type="button"
          onClick={() => router.push("/new")}
        >
          New Holiday
        </button>
      </div>
      <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-4">
        {holidayPreviews.map((preview, index) => (
          <HolidayPreview
            key={index}
            host={preview.host}
            title={preview.title}
            description={preview.description}
            startDate={preview.startDate}
            endDate={preview.endDate}
            token={preview.token}
          />
        ))}
      </div>
    </div>
  );
}
