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
    return res.json();
  };

  return (
    <div>
      <form className="flex flex-col gap-8 mx-auto max-w-[480px]">
        <input
          className="bg-white px-4 py-2 border-2"
          type="text"
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-white px-4 py-2 border-2"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-white px-4 py-2 border-2"
          type="button"
          onClick={() => registerUser()}
        >
          Register
        </button>
      </form>
      <small className="text-slate-600">
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
