"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import Link from "next/link";
import FieldError from "../_common/FieldError";
import FormError from "../_common/FormError";
import FormSuccess from "../_common/FormSuccess";
import FormWarning from "../_common/FormWarning";
import FormButton from "../_common/FormButton";
type Inputs = {
  password: string;
  confirmPassword: string;
};
export default function resetPassword() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      updatePassword(data.password);
    } else {
      setStatus("mismatch");
    }
  };
  const supabase = createClient();
  async function updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.log(error);
      setStatus("error");
      return;
    }
    setStatus("success");
  }
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light py-5 px-9 rounded-xl">
        <h1 className="text-center mt-4 text-lg font-bold">Reset password</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-50  flex-col"
        >
          <InputField
            rhf={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            fieldName="Password"
            id="password"
            type="password"
            rhfErrors={errors}
          />
          {errors.password && <FieldError message={errors.password.message} />}
          <InputField
            rhf={register("confirmPassword", {
              required: "Password confirmation is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            fieldName="Confirm password"
            id="confirmPassword"
            type="password"
            rhfErrors={errors}
          />
          {errors.confirmPassword && (
            <FieldError message={errors.confirmPassword.message} />
          )}
          <div className=" mt-4">
            {status === "error" ? (
              <FormError message="There was a problem, please try again later." />
            ) : null}
            {status === "success" ? (
              <FormSuccess message="Password updated successfully">
                <Link className="text-center font-semibold" href={"/signin"}>
                  Go Back to sign in
                </Link>
              </FormSuccess>
            ) : null}
            {status === "mismatch" ? (
              <FormWarning message="Please check if your password matches and try again." />
            ) : null}
          </div>
          <FormButton text="Reset" styles="mt-4" />
        </form>
      </div>
    </div>
  );
}
