import { useRouter } from "next/router";
import LoginForm from "@/components/AuthView/LoginForm";
import RegisterForm from "@/components/AuthView/RegisterForm";

export default function Auth() {
  const router = useRouter();
  const { mode } = router.query;

  return (
    <div className="flex flex-col items-center h-full w-full p-4 text-xl bg-white">
      <div className="flex flex-col justify-center w-full max-w-[340px] m-auto p-6">
        <div className="w-full text-center text-[72px] font-black text-brand">
          HUDDL
        </div>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
