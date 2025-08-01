import Form from "@/components/holidayView/Form";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import FormResults from "@/components/holidayView/FormResults";
import Plan from "@/components/holidayView/Plan";
import AuthRequired from "@/components/AuthRequired";

export default function Group() {
  const router = useRouter();
  const { group, view } = router.query;

  const handleStateChange = (state: string) => {
    router.push("/group/" + group + "?view=" + state, undefined, {
      shallow: true,
    });
  };

  return (
    <AuthRequired>
      <h1>
        <Header
          states={["Form", "Results", "Plan"]}
          onStateChance={(e) => handleStateChange(e)}
        />
        {view == "form" && <Form inviteToken={group as string} />}
        {view == "results" && <FormResults inviteToken={group as string} />}
        {view == "plan" && <Plan />}
      </h1>
    </AuthRequired>
  );
}
