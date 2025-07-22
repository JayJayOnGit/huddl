import AuthRequired from "@/components/AuthRequired";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Invite() {
  const router = useRouter();
  const { invite } = router.query;

  useEffect(() => {
    if (invite) {
      axios
        .get("/api/invite/" + invite)
        .then((res) => {
          router.push("/group/" + invite);
        })
        .catch((err) => {
          router.push("/");
        });
    }
  }, [invite]);

  return (
    <AuthRequired>
      <div></div>
    </AuthRequired>
  );
}
