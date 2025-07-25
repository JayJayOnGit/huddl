import AuthRequired from "@/components/AuthRequired";
import Header from "@/components/Header";
import HolidayPreview from "@/components/HolidayPreview";
import { Preview } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [holidayPreviews, setHolidayPreviews] = useState<Preview[]>([]);

  useEffect(() => {
    axios
      .get("/api/groups")
      .then((res) => {
        setHolidayPreviews(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        router.push("/");
      });
  }, []);

  return (
    <AuthRequired>
      <div className="w-full h-full">
        <Header states={[]} onStateChance={() => {}} />
        <div className="h-full max-w-[1280px] px-4 mx-auto">
          <div className="flex justify-between my-4 items-center">
            <h2 className="text-xl">All Your Holidays</h2>
            <button
              className="text-md py-1 px-2 bg-brand text-white border-1 rounded-sm border-brand-dark shadow-sm"
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
      </div>
    </AuthRequired>
  );
}
