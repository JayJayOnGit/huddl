import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    console.log(username, password);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    //return JWT token
    console.log("response was:", res);
    return res;
  };

  return (
    <div>
      <form className="flex flex-col gap-8 mx-auto w-full">
        <input
          className="bg-white px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="text"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-white px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-brand text-white font-bold px-8 py-4 border-1 border-slate-400 rounded-md shadow-sm"
          type="button"
          onClick={() => registerUser()}
        >
          Register
        </button>
      </form>
      <small className="text-slate-600 pt-4 inline-block w-full text-center">
        here to{" "}
        <span
          className="text-brand cursor-pointer"
          onClick={() => router.push("/auth/login")}
        >
          Login
        </span>
      </small>
    </div>
  );
}
