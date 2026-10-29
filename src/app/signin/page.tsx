"use client";
import Link from "next/link";
import { InputField } from "../_common/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase/client";
import FieldError from "../_common/FieldError";
import FormButton from "../_common/FormButton";
type Inputs = {
  email: string;
  password: string;
};
export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn(data.email, data.password);
  };
  const supabase = createClient();
  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("There was sign in error", error);
      return;
    }
    window.location.href = "/profile";
    console.log("Signed in as:", data.user.email);
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light py-5 px-9 rounded-xl">
        <h1 className="text-center mt-4 text-lg font-bold">
          Sign in to your account
        </h1>
        <form className="">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col max-w-50"
        >
          <InputField
            type="text"
            rhfErrors={errors}
            rhf={register("email", { required: "Email is required" })}
            fieldName="Email"
            id="email"
          />
          {errors.email?.type === "required" && (
            <FieldError message={errors.email.message} />
          )}
          <InputField
            type="password"
            rhfErrors={errors}
            rhf={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password is at leats 6 characters long",
              },
            })}
            fieldName="Password"
            id="password"
          />
          {errors.password && <FieldError message={errors.password.message} />}
          <Link
            className="text-sm mt-2 text-cyan-600 text-end"
            href={"/forgot-password"}
          >
            Forgot password?
          </Link>
          <FormButton text="Sign in" styles="mt-4" />
          <Link href={"/signup"} className="text-center text-gray-500 mt-4">
            New here? Sign up!
          </Link>
        </form>
      </div>
    </div>
  );
}
