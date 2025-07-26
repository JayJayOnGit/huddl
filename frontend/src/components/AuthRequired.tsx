import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function AuthRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const isTokenExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) return true;
      const now = Date.now() / 1000;

      return decoded.exp < now;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      router.push("/auth/login");
    } else {
      axios.defaults.headers.common = { Authorization: "Bearer " + token };
    }
  }, []);

  return <>{children}</>;
}
