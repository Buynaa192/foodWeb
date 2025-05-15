"use client";
import { api } from "@/axios";
import { Step1 } from "@/components/login/step1";
import { Step2 } from "@/components/login/step2";
import { Step3 } from "@/components/login/step3";
import { useAuth } from "@/components/userProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type StepType = {
  step: number;
  setStep: (value: number) => void;
  values: DataType;
  setValues: React.Dispatch<React.SetStateAction<DataType>>;
  addUser: () => Promise<void>;
};

export type DataType = {
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Home() {
  const [step, setStep] = useState(1);
  const { setUser } = useAuth();
  const [values, setValues] = useState<DataType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handelStep = (value: number) => {
    const LimitedValue = Math.max(1, Math.min(3, value));
    setStep(LimitedValue);
  };

  const Router = useRouter();

  const addUser = async () => {
    try {
      const { data } = await api.post("/user/post", {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
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
            addUser={addUser}
          />
        )}
        {step === 2 && (
          <Step2
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
            addUser={addUser}
          />
        )}
        {step === 3 && (
          <Step3
            step={step}
            setStep={handelStep}
            values={values}
            setValues={setValues}
            addUser={addUser}
          />
        )}
        {/* {step === 4 && (
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
        )} */}
        <img
          className="w-214 h-[calc(100%-40px)] m-5"
          src="/images/z.png"
        ></img>
      </div>
    </div>
  );
}
