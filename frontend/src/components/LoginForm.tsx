import { Router, useRouter } from "next/router";

export default function LoginForm() {
  const router = useRouter();

  return (
    <div>
      <form className="flex flex-col gap-8 mx-auto w-full">
        <input
          className="bg-white px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="text"
          placeholder="@username"
        />
        <input
          className="bg-white px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="password"
          placeholder="password"
        />
        <button
          className="bg-brand text-white font-bold px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="submit"
        >
          Log In
        </button>
      </form>
      <small className="text-slate-600 pt-4 inline-block w-full text-center">
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
