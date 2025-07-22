import { useRouter } from "next/router";

export default function Invite() {
  const router = useRouter();
  const { invite } = router.query;

  return <h1>code {invite}</h1>;
}
