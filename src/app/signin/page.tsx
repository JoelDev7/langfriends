import Link from "next/link";
import { InputField } from "../common/InputField";

export default function SignIn() {
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-emerald-500   py-5 px-9 rounded-xl">
        <h1 className="text-center text-lg font-bold my-3">
          Sign in to your account
        </h1>
        <form action="" className="mt-4">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>
        <form action="" className="flex mt-4 flex-col">
          <InputField fieldName="Email" id="email" />
          <InputField fieldName="Password" id="password" />
          <Link className="text-sm text-cyan-600 text-end" href={"./"}>
            Forgot password?
          </Link>
          <button className="mt-2 bg-teal-500 rounded py-2">Sign in</button>
          <Link href={"/signup"} className="text-center text-gray-500 mt-2">
            New here? Sign up!
          </Link>
        </form>
      </div>
    </div>
  );
}
