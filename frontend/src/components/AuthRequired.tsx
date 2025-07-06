import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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

    axios.defaults.headers.common = { Authorization: "Bearer " + token };
  }, []);

  return <>{children}</>;
}
