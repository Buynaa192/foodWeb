"use client";
import { StepType } from "@/app/login/page";
import { ChevronLeft } from "@/assets/chevronleft";

import { useState } from "react";
import { useAuth } from "../userProvider";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/axios";

export const Step3 = ({ setStep }: StepType) => {
  const [eemail, setEemail] = useState("");
  const [paasword, setPaasword] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  const signIn = async () => {
    try {
      const { data } = await api.post("/auth/signin", {
        email: eemail,
        password: paasword,
      });
      console.log(data);

      localStorage.setItem("token", data.token);
      console.log(data.token);

      setUser(data.user);
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("failed to sign in");
    }
  };

  return (
    <div className=" w-104 h-100 flex ml-25 gap-6 flex-col">
      <button
        onClick={() => {
          setStep(1);
        }}
        className="flex items-center justify-center  w-9 h-9 rounded-md border-1 border-[#E4E4E7]"
      >
        <ChevronLeft />
      </button>
      <div className=" flex flex-col gap-1">
        <p className="text-[24px] font-bold">Log in </p>
        <p className="text-[#71717A]">Log in to enjoy your favorite dishes.</p>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your Email address"
          className="border-1 border-[#E4E4E7] rounded-md"
          onChange={(e) => {
            setEemail(e.target.value);
          }}
        ></input>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            placeholder="Password"
            className="border-1 border-[#E4E4E7] rounded-md"
            onChange={(e) => {
              setPaasword(e.target.value);
            }}
          ></input>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </div>
      </div>
      <div className=" h-4 flex gap-2  items-center">
        <p
          onClick={() => {
            setStep(4);
          }}
          className="text-[#71717A] text-[14px]"
        >
          Forgot password ?
        </p>
      </div>

      <button onClick={() => signIn()} className="h-9 w-full border-1 rounded-md border-[#E4E4E7]">
        Let s Go
      </button>

      <div className=" h-6 flex justify-center items-center gap-3">
        <p className="text-[#71717A]">Don’t have an account?</p>
        <p
          onClick={() => {
            setStep(1);
          }}
          className="text-[#2563EB]"
        >
          Sign up{" "}
        </p>
      </div>
    </div>
  );
};
