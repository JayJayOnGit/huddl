import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";

type HeaderProps = {
  states: string[];
  onStateChance: (state: string) => void;
};

export default function Header({ states, onStateChance }: HeaderProps) {
  const router = useRouter();
  const { username } = useUser();

  const [stateMenuOpen, setStateMenuOpen] = useState(false);
  const [userstateMenuOpen, setUserstateMenuOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      setStateMenuOpen(false);
      setUserstateMenuOpen(false);
    });
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <div>
      <header className="relative z-10 flex w-full h-12 px-4 items-center border-b-1 bg-white border-neutral-200">
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
          <div className="relative flex gap-4">
            <img
              className="h-6 my-auto"
              src="/icons/user.png"
              onClick={() => {
                setUserstateMenuOpen(!userstateMenuOpen);
              }}
            />

            {/** user menu*/}
            <div
              className={
                "z-50 absolute right-4 top-8 text-sm text-nowrap text-neutral-600 min-w-64 bg-white border-1 border-neutral-300 rounded-sm shadow-sm flex flex-col " +
                (userstateMenuOpen ? "" : "scale-80 opacity-0")
              }
            >
              <div className="p-2 border-b-1 border-neutral-300">
                <h3 className="text-black">JasonTheHuddler</h3>
                <h2>{"@" + username}</h2>
              </div>

              <div className="p-2 cursor-pointer">
                <h2 onClick={() => handleLogOut()}>Log out</h2>
              </div>
            </div>

            <img
              className={
                "h-6 my-auto opacity-50 min-md:hidden hover:opacity-100 cursor cursor-pointer " +
                (states.length == 0 && "hidden")
              }
              src="/icons/hamburger.png"
              onClick={() => {
                setStateMenuOpen(!stateMenuOpen);
              }}
            />
          </div>
        </div>
      </header>

      {/** state menu*/}
      <div
        className={
          "absolute w-full bg-white shadow-sm flex flex-col min-md:hidden " +
          (stateMenuOpen ? "translate-y-0" : "translate-y-[-100%]")
        }
      >
        {states.map((state, index) => (
          <h2
            key={index}
            className="py-2 font-bold text-center text-md text-brand-dark cursor-pointer hover:text-brand hover:bg-neutral-100 border-b-1 border-neutral-300"
            onClick={() => {
              setStateMenuOpen(false);
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
