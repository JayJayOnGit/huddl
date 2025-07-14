import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="static flex w-full h-12 px-4 items-center border-b-1 border-neutral-200 shadow-2xs"
      onClick={() => router.push("/")}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <h1 className="text-2xl font-black text-brand cursor-pointer">HUDDL</h1>
      </div>
    </header>
  );
}
