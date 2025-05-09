"use client";
import { StepType } from "@/app/login/page";
import { ChevronLeft } from "@/assets/chevronleft";
import { SetStateAction, useState } from "react";
import { useAuth } from "../userProvider";

export const Step1 = ({ step, setStep, setValues, values }: StepType) => {
  const [error, setError] = useState("");
  const { user } = useAuth();
  const isValidEmail = (email: string) => {
    const emailRegex =
      /[a-zA-Z]+[(a-zA-Z0-9-\\_\\.!\\D)]*[(a-zA-Z0-9)]+@[(a-zA-Z)]+\.[(a-zA-Z)]{2,3}/;
    return emailRegex.test(email);
  };

  const handleCheck = () => {
    if (!values.email) {
      setError("email is required.");
      return;
    }
    if (!isValidEmail(values.email)) {
      setError("please enter a valid email address");
      return;
    }

    setError("");
    setStep(step + 1);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: e.target.value });
  };

  return (
    <div className=" w-104 h-80 flex ml-25 gap-6 flex-col">
      <button
        onClick={() => {
          setStep(step - 1);
        }}
        className="flex items-center justify-center  w-9 h-9 rounded-md border-1 border-[#E4E4E7]"
      >
        <ChevronLeft />
      </button>
      <div className=" flex flex-col gap-1">
        <p className="text-[24px] font-bold">Create your account</p>
        <p className="text-[#71717A]">
          Sign up to explore your favorite dishes.
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        <input
          onChange={handleEmailChange}
          type="email"
          value={values.email}
          placeholder="Enter your email address"
          className="border-1 border-[#E4E4E7] w-full rounded-md"
        ></input>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <button
        onClick={() => handleCheck()}
        className="h-9 border-1 rounded-md border-[#E4E4E7]"
      >
        Let's Go
      </button>
      <div className=" h-6 flex justify-center items-center gap-3">
        <p className="text-[#71717A]">Already have an account?</p>
        <p
          onClick={() => {
            setStep(3);
          }}
          className="text-[#2563EB]"
        >
          Log in
        </p>
      </div>
    </div>
  );
};
