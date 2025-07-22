import AuthRequired from "@/components/AuthRequired";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

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
          <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-8">
            <div className="flex flex-col p-3 rounded-sm border-1 border-neutral-200 shadow-xs hover:border-neutral-400 hover:shadow-md transition-all">
              <div className="flex justify-between">
                <h3 className="text-xl">Costa Blanca '25</h3>
                <small className="w-min py-1 px-2 border-1 bg-pending border-pending-dark text-pending-dark rounded-2xl">
                  Pending
                </small>
              </div>
              <div className="flex gap-x-2 pb-2">
                <p>Calpe, Spain</p>
                <p>|</p>
                <p className="text-neutral-600">Sep 29 - Oct 05</p>
              </div>
              <small className="text-right text-neutral-600">
                Created by Jason
              </small>
            </div>
          </div>
        </div>
      </div>
    </AuthRequired>
  );
}
