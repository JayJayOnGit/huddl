import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { groupCode } = router.query;

  return <h1>Group code {groupCode}</h1>;
}
