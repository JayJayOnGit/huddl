import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

type HeaderProps = {
  states: string[];
  onStateChance: (state: string) => void;
};

export default function Header({ states, onStateChance }: HeaderProps) {
  const router = useRouter();
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setMenuOpen(false);
    });
  }, []);

  return (
    <div>
      <header className="relative z-10 flex w-full h-12 px-4 items-center border-b-1 bg-white border-neutral-200 shadow-xs">
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
          <div className="flex gap-4">
            <img className="h-6 my-auto" src="/icons/user.png" />
            <img
              className={
                "h-6 my-auto opacity-50 min-md:hidden hover:opacity-100 cursor cursor-pointer " +
                (states.length == 0 && "hidden")
              }
              src="/icons/hamburger.png"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            />
          </div>
        </div>
      </header>
      <div
        className={
          "absolute w-full bg-white shadow-sm flex flex-col min-md:hidden " +
          (menuOpen ? "translate-y-0" : "translate-y-[-100%]")
        }
      >
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
