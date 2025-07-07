"use client";
import { FoodMenu } from "@/components/admin/menu";
import { Navigation } from "@/components/admin/navigation";
import { Orders } from "@/components/admin/orders";
import { useAuth } from "@/components/userProvider";
import { useState } from "react";
export type StepType = {
  step: number;
  setStep: (value: number) => void;
};
export default function Home() {
  const [step, setStep] = useState(2);
  const { user } = useAuth();
  const handelStep = (value: number) => {
    const LimitedValue = Math.max(1, Math.min(2, value));
    setStep(LimitedValue);
  };
  if (!user) {
    return;
  }
  if (user.role !== "admin") {
    return;
  }

  return (
    <div className=" w-screen min-h-300 flex justify-center ">
      <div className="min-w-[1440px] min-h-screen  flex ">
        <Navigation step={step} setStep={handelStep} />
        <div className="bg-[#F4F4F5]">
          {step === 1 && <Orders />}
          {step === 2 && <FoodMenu />}
        </div>
      </div>
    </div>
  );
}
