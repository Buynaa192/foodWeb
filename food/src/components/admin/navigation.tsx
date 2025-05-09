"use client";
import { StepType } from "@/app/admin/page";
import { Car } from "@/assets/car";
import { Dash } from "@/assets/dash";
import { Gear } from "@/assets/gear";
import { Logo } from "@/assets/logo";
import Link from "next/link";
import { useState } from "react";

export const Navigation = ({ step, setStep }: StepType) => {
  return (
    <div className=" w-[205px] h-full flex flex-col gap-10 items-center">
      <Link href={"/"}>
        <div className="flex  gap-3 w-[165px] h-11 mt-9">
          <Logo />
          <div className="flex  flex-col">
            <div className="flex">
              <p>Nom</p>
              <p className="text-red-500">Nom</p>
            </div>
            <p className="flex">Swift delivery</p>
          </div>
        </div>
      </Link>
      <div className=" w-[165px] h-[168px] grid grid-rows-3 gap-6">
        <div
          onClick={() => {
            setStep(2);
          }}
          className={
            step == 2
              ? "rounded-full bg-black text-white flex items-center justify-center gap-[10px]"
              : "rounded-full bg-white  flex items-center justify-center gap-[10px]"
          }
        >
          <Dash step={step} />
          <p>Food menu</p>
        </div>
        <div
          onClick={() => {
            setStep(1);
          }}
          className={
            step == 1
              ? "rounded-full bg-black text-white flex items-center justify-center gap-[10px]"
              : "rounded-full bg-white  flex items-center justify-center gap-[10px]"
          }
        >
          <Car step={step} />
          <p>Orders</p>
        </div>
        <div className=" rounded-full  flex items-center justify-center gap-[10px]">
          <Gear />
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};
// rounded-full border-2 flex items-center justify-center gap-[10px]
