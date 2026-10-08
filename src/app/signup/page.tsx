"use client";
import { createClient } from "@/lib/supabase/client";
import { InputField } from "../_common/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import FieldError from "../_common/FieldError";
import { useState } from "react";
import FormError from "../_common/FormError";
import FormSuccess from "../_common/FormSuccess";
import FormWarning from "../_common/FormWarning";
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Signup() {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      signUpNewUser(data.email, data.password);
    } else {
      setStatus("mismatch");
    }
  };

  const supabase = createClient();
  async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("success");
    console.log("User:", data.user);
    console.log("Session", data.session);
    console.log("Data:", data);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light   py-5 px-9 rounded-xl">
        <h1 className="text-center text-lg font-bold mt-4">Sign Up</h1>
        <form className="">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-w-50"
        >
          <InputField
            rhf={register("email", { required: "Email is required" })}
            fieldName="Email"
            id="email"
            type="text"
            rhfErrors={errors}
          />
          {errors.email?.type === "required" && (
            <FieldError message={errors.email.message} />
          )}
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
              <FormSuccess message="">
                <Link className="text-center font-semibold" href={"/signin"}>
                  Go to sign in
                </Link>
              </FormSuccess>
            ) : null}
            {status === "mismatch" ? (
              <FormWarning message="Please check if your password matches and try again." />
            ) : null}
          </div>
          <button className="mt-4 bg-primary-light rounded py-2 cursor-pointer">
            Sign up
          </button>
          <Link href={"/signin"} className="text-center text-gray-500 mt-4">
            Already with us? Sign in.
          </Link>
        </form>
      </div>
    </div>
  );
}
