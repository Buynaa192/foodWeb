// "use client";
// import { StepType } from "@/app/login/page";
// import { ChevronLeft } from "@/assets/chevronleft";
// import { SetStateAction, useState } from "react";

// export const ForgetPassword = ({
//   step,
//   setStep,
//   setValues,
//   values,
// }: StepType) => {
//   const [error, setError] = useState("");

//   const isValidEmail = (email: string) => {
//     const emailRegex =
//       /[a-zA-Z]+[(a-zA-Z0-9-\\_\\.!\\D)]*[(a-zA-Z0-9)]+@[(a-zA-Z)]+\.[(a-zA-Z)]{2,3}/;
//     return emailRegex.test(email);
//   };

//   const handleCheck = () => {
//     if (!values.forgetPassword) {
//       setError("email is required.");
//       return;
//     }
//     if (!isValidEmail(values.forgetPassword)) {
//       setError("please enter a valid email address");
//       return;
//     }
//     setError("");
//     setStep(step + 1);
//   };

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({ ...values, forgetPassword: e.target.value });
//   };

//   return (
//     <div className=" w-104 h-80 flex ml-25 gap-6 flex-col">
//       <button
//         onClick={() => {
//           setStep(1);
//         }}
//         className="flex items-center justify-center  w-9 h-9 rounded-md border-1 border-[#E4E4E7]"
//       >
//         <ChevronLeft />
//       </button>
//       <div className=" flex flex-col gap-1">
//         <p className="text-[24px] font-bold">Reset your password </p>
//         <p className="text-[#71717A]">
//           Enter your email to receive a password reset link.
//         </p>
//       </div>
//       <div className="w-full flex flex-col gap-2">
//         <input
//           type="email"
//           placeholder="Enter your email address"
//           className="border-1 border-[#E4E4E7] w-full h-9 rounded-md"
//           onChange={handleEmailChange}
//         ></input>
//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//       <button
//         onClick={() => handleCheck()}
//         className="h-9 border-1 rounded-md border-[#E4E4E7]"
//       >
//         Send link
//       </button>
//       <div className=" h-6 flex justify-center items-center gap-3">
//         <p className="text-[#71717A]">Don’t have an account?</p>
//         <p
//           onClick={() => {
//             setStep(1);
//           }}
//           className="text-[#2563EB]"
//         >
//           Sign up
//         </p>
//       </div>
//     </div>
//   );
// };
