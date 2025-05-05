"use client";
import { ForgetPassword } from "@/components/login/forgetPassword";
import { Step1 } from "@/components/login/step1";
import { Step2 } from "@/components/login/step2";
import { Step3 } from "@/components/login/step3";
import { Verify } from "@/components/login/verify";
import { useState } from "react";
export type StepType = {
  step: number;
  setStep: (value: number) => void;
  values: DataType;
  setValues: React.Dispatch<React.SetStateAction<DataType>>;
};

export type DataType = {
  email: string;
  password: string;
  confirmPassword: string;
  forgetPassword: string;
};
export default function Home() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<DataType>({
    email: "",
    password: "",
    confirmPassword: "",
    forgetPassword: "",
  });
  const handelStep = (value: number) => {
    const LimitedValue = Math.max(1, Math.min(5, value));
    setStep(LimitedValue);
  };

  return (
    <div className="border-4 w-screen min-h-500 flex justify-center ">
      <div className="w-[1440px] h-screen border-4 border-black flex gap-12 items-center">
        {step === 1 && (
          <Step1
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 2 && (
          <Step2
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 3 && (
          <Step3
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 4 && (
          <ForgetPassword
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
          />
        )}
        {step === 5 && (
          <Verify
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
          />
        )}
        <img
          className="w-[856px] h-[calc(100%-40px)] m-5"
          src="/images/z.png"
        ></img>
      </div>
    </div>
  );
}
