"use client";
import { createClient } from "@/lib/supabase/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import FormButton from "../_common/FormButton";
type Input = {
  email: string;
};
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Input> = (data) => {
    sendResetEmail(data.email);
  };
  const supabase = createClient();
  async function sendResetEmail(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/reset-password",
    });
    if (error) {
      console.log(error);
      return;
    }
    console.log("Check your email");
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light py-5 px-9 rounded-xl">
        <h1 className="text-center mt-4 text-lg font-bold">Forgot passsword</h1>
        <form className="">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col">
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
          <FormButton text="Send reset email" />
        </form>
      </div>
    </div>
  );
}
