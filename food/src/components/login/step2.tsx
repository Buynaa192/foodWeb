"use client";
import { StepType } from "@/app/login/page";
import { ChevronLeft } from "@/assets/chevronleft";
import { useState } from "react";

export const Step2 = ({ step, setStep, setValues, values }: StepType) => {
  // const [password, setPassword] = useState("");
  // const [confirmPass, setConfirmPass] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [show, setShow] = useState(false);
  const handleCheck = () => {
    if (!values.password || !values.confirmPassword) {
      setErrorPass("please fill in both password fields");
      return;
    }
    if (values.password.length < 8) {
      setErrorPass("password bogino baina 8s deesh heregtei");
      return;
    }
    const hasLetter = /[A-Za-z]/.test(values.password);
    const hasNumber = /[0-9]/.test(values.password);
    if (!hasLetter || !hasNumber) {
      setErrorPass("useg too holioroi");
      return;
    }
    if (values.password !== values.confirmPassword) {
      setErrorPass("password taarahgui baina");
      return;
    }
    setErrorPass("");
    setStep(step + 1);
  };
  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: e.target.value });
  };
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, confirmPassword: e.target.value });
  };

  return (
    <div className=" w-104 h-100 flex ml-25 gap-6 flex-col">
      <button
        onClick={() => {
          setStep(step - 1);
        }}
        className="flex items-center justify-center  w-9 h-9 rounded-md border-1 border-[#E4E4E7]"
      >
        <ChevronLeft />
      </button>
      <div className=" flex flex-col gap-1">
        <p className="text-[24px] font-bold">Create a strong password</p>
        <p className="text-[#71717A]">
          Create a strong password with letters, numbers.
        </p>
      </div>

      <input
        type={show ? "text" : "password"}
        placeholder="    Password"
        className="border-1 border-[#E4E4E7] rounded-md"
        onChange={handlePass}
        value={values.password}
      ></input>
      <div className="flex flex-col gap-2">
        <input
          type={show ? "text" : "password"}
          placeholder="    Confirm password"
          className="border-1 border-[#E4E4E7] rounded-md"
          onChange={handleConfirm}
          value={values.confirmPassword}
        ></input>
        {errorPass && <p className="text-red-500 text-sm">{errorPass}</p>}
      </div>
      <div className=" h-4 flex gap-2  items-center">
        <input
          type="checkbox"
          checked={show}
          onChange={() => setShow(!show)}
        ></input>
        <p className="text-[#71717A] text-[14px]">Show password</p>
      </div>
      <button
        onClick={() => handleCheck()}
        className="h-9 border-1 rounded-md border-[#E4E4E7]"
      >
        Let's Go
      </button>
      <div className=" h-6 flex justify-center items-center gap-3">
        <p className="text-[#71717A]">Already have an account?</p>
        <p className="text-[#2563EB]">Log in </p>
      </div>
    </div>
  );
};
