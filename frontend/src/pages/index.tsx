import AuthRequired from "@/components/AuthRequired";

export default function Home() {
  return (
    <AuthRequired>
      <h1>Welcome</h1>
    </AuthRequired>
  );
}
