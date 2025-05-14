import { DataType, StepType } from "@/app/login/page";
import { ChevronLeft } from "@/assets/chevronleft";

export const Verify = ({ values, step, setStep }: StepType) => {
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
        <p className="text-[24px] font-bold">Reset your password </p>
        <div className="text-[#71717A] flex flex-wrap gap-1">
          We just sent an email to
          {/* <p className="text-black">{values.forgetPassword}</p> Click the link */}
          in the email to verify your account.
        </div>
      </div>

      <button className="h-9 border-1 rounded-md border-[#E4E4E7]">
        Resend email
      </button>
    </div>
  );
};
