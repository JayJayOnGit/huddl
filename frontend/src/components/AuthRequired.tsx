import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
