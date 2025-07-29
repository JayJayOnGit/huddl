import Form from "@/components/HolidayView/Form";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormResults from "@/components/HolidayView/FormResults";
import Plan from "@/components/HolidayView/Plan";
import AuthRequired from "@/components/AuthRequired";

export default function Group() {
  const router = useRouter();
  const { group, view } = router.query;

  const handleStateChange = (state: string) => {
    router.push("/group/" + group + "?view=" + state, undefined, {
      shallow: true,
    });
  };

  const renderPage = () => {
    if (group) {
      switch (view) {
        case "form":
          return <Form inviteToken={group as string} />;
        case "results":
          return <FormResults inviteToken={group as string} />;
        case "plan":
          return <Plan />;
        default:
          return <div></div>;
      }
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
