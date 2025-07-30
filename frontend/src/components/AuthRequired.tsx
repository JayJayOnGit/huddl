import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { UserProvider } from "@/contexts/UserContext";

export default function AuthRequired({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
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
      router.replace("/auth/login");
    } else {
      axios.defaults.headers.common = { Authorization: "Bearer " + token };
      setLoading(false);
    }
  }, []);

  if (loading) return <div></div>;

  return <UserProvider>{children}</UserProvider>;
}
