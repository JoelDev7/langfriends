"use client";

import { useRef, useState } from "react";
import EmailPasswordForm from "./EmailPasswordForm";
import Progress from "./Progress";
import ProfileInfoForm from "./ProfileInfoForm";

export default function Signup() {
  const [step, setStep] = useState(1);
  const formData = useRef({});
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light   py-5 px-9 rounded-xl">
        <h1 className="text-center text-lg font-bold mt-4">Sign Up</h1>
        <Progress step={step} setStep={setStep} />
        <form className="">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>

        <EmailPasswordForm formData={formData} step={step} setStep={setStep} />

        <ProfileInfoForm formData={formData} step={step} setStep={setStep} />
      </div>
    </div>
  );
}
