import { useRouter } from "next/router";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function Auth() {
  const router = useRouter();
  const { mode } = router.query;

  return (
    <div className="flex flex-col items-center h-full w-full p-4 text-xl bg-brand">
      <div className="flex flex-col justify-center w-full max-w-[520px] m-auto px-12 py-6 border-1 border-slate-400 rounded-xl shadow-sm bg-white">
        <div className="w-full text-center text-[104px] font-black text-brand">
          HUDDL
        </div>
        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
