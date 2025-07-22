import Form from "@/components/HolidayView/Form";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormResults from "@/components/HolidayView/FormResults";
import Plan from "@/components/HolidayView/Plan";
import AuthRequired from "@/components/AuthRequired";

export default function Group() {
  const router = useRouter();
  const group = router.query.group as string;

  const [state, setState] = useState("form");

  const handleStateChange = (state: string) => {
    setState(state);
  };

  const renderPage = () => {
    switch (state) {
      case "form":
        return group ? <Form inviteToken={group} /> : <div></div>;
      case "results":
        return <FormResults />;
      case "plan":
        return <Plan />;
      default:
        return <Plan />;
    }
  };

  return (
    <AuthRequired>
      <h1>
        <Header
          states={["Form", "Results", "Plan"]}
          onStateChance={(e) => handleStateChange(e)}
        />
        {renderPage()}
      </h1>
    </AuthRequired>
  );
}
