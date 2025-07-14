import { Router, useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    console.log(username, password);

    axios
      .post("/api/auth/login", { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/");

        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  return (
    <div>
      <form className="flex flex-col gap-4 mx-auto w-full">
        <input
          className="bg-white px-4 py-2 border-1 border-neutral-200 rounded-sm shadow-xs"
          type="text"
          placeholder="@username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-white px-4 py-2 border-1 border-neutral-200 rounded-sm shadow-xs"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-brand text-white font-bold px-4 py-2 border-1 border-brand-dark rounded-sm shadow-xs hover:shadow-md hover:bg-brand-dark"
          type="button"
          onClick={() => loginUser()}
        >
          Log In
        </button>
      </form>
      <small className="text-gray-600 pt-4 inline-block w-full text-center">
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
