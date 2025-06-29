import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AuthRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (true) {
      router.push("/auth/login");
    }
  }, []);

  return <>{children}</>;
}
