import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="static flex w-full h-12 px-4 items-center border-b-1 border-neutral-200 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <h1 className="text-2xl font-bold text-brand">HUDDL</h1>
    </header>
  );
}
