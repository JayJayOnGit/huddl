import { Router, useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();

  return (
    <div>
      <form className="flex flex-col gap-8 mx-auto max-w-[480px]">
        <input
          className="bg-white px-4 py-2 border-2"
          type="text"
          placeholder="@username"
        />
        <input
          className="bg-white px-4 py-2 border-2"
          type="password"
          placeholder="password"
        />
        <button className="bg-white px-4 py-2 border-2" type="submit">
          Log In
        </button>
      </form>
      <small className="text-slate-600">
        here to{" "}
        <span
          className="text-brand cursor-pointer"
          onClick={() => router.push("/auth/register")}
        >
          Register
        </span>
      </small>
    </div>
  );
}
