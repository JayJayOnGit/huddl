import AuthRequired from "@/components/AuthRequired";

export default function Home() {
  return (
    <AuthRequired>
      <div className="w-full h-full">
        <header className="static flex w-full h-12 px-4 items-center border-b-1 border-neutral-200">
          <h1 className="text-2xl font-bold text-brand">HUDDL</h1>
        </header>
        <div className="h-full max-w-[1280px] px-4 mx-auto">
          <h2 className="text-xl my-6">All Your Holidays</h2>
          <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-8">
            <div className="flex flex-col p-3 rounded-md border-1 border-neutral-200 shadow-xs hover:border-neutral-400 hover:shadow-md transition-all">
              <div className="flex justify-between">
                <h3 className="text-xl">Costa Blanca '25</h3>
                <small className="w-min py-1 px-2 border-1 bg-amber-100 border-amber-400 text-amber-400 rounded-4xl">
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
