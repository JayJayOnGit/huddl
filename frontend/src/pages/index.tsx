import AuthRequired from "@/components/AuthRequired";
import Header from "@/components/Header";
import HolidayPreviewList from "@/components/HomeView/HolidayPreviewList";
import { Preview } from "@/types";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  return (
    <AuthRequired>
      <div className="w-full h-full">
        <Header states={[]} onStateChance={() => {}} />
        <HolidayPreviewList />
      </div>
    </AuthRequired>
  );
}
