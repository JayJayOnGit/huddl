import { useRouter } from "next/router";
import { useState } from "react";

type HeaderProps = {
  states: string[];
  onStateChance: (state: string) => void;
};

export default function Header({ states, onStateChance }: HeaderProps) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {" "}
      <header className="static flex w-full h-12 px-4 items-center border-b-1 border-neutral-200 shadow-2xs">
        <div className="flex justify-between w-full max-w-[1440px] mx-auto">
          <div className="flex gap-12 items-center">
            <h1
              className="text-2xl font-black text-brand cursor-pointer"
              onClick={() => router.push("/")}
            >
              HUDDL
            </h1>
            {states.map((state, index) => (
              <h2
                key={index}
                className="font-bold text-md text-brand-dark cursor-pointer hover:text-brand max-md:hidden"
                onClick={() => onStateChance(state.toLowerCase())}
              >
                {state}
              </h2>
            ))}
          </div>
          <img
            className="h-6 my-auto opacity-50 min-md:hidden hover:opacity-100 cursor cursor-pointer"
            src="/icons/hamburger.png"
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
        </div>
      </header>
      <div className={"flex flex-col min-md:hidden " + (!menuOpen && "hidden")}>
        {states.map((state, index) => (
          <h2
            key={index}
            className="py-2 font-bold text-center text-md text-brand-dark cursor-pointer hover:text-brand hover:bg-neutral-100 border-b-1 border-neutral-300"
            onClick={() => {
              setMenuOpen(false);
              onStateChance(state.toLowerCase());
            }}
          >
            {state}
          </h2>
        ))}
      </div>
    </div>
  );
}
