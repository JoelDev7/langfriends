import { Dispatch, SetStateAction } from "react";

type Props = { setStep: Dispatch<SetStateAction<number>>; step: number };
export default function Progress({ step, setStep }: Props) {
  return (
    <div className="flex mt-4 justify-center gap-4">
      <button
        onClick={() => setStep(1)}
        className="bg-emerald-100 border cursor-pointer border-primary-light   flex justify-center items-center rounded-full px-3 py-1 text-sm hover:bg-emerald-50"
      >
        Credentials
      </button>
      <button
        onClick={() => setStep(2)}
        className={`${step === 2 ? "bg-emerald-100" : ""} border cursor-pointer border-primary-light   flex justify-center items-center rounded-full px-3 py-1 text-sm hover:bg-emerald-50`}
      >
        Profile info
      </button>
    </div>
  );
}
