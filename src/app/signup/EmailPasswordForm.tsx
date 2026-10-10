import { createClient } from "@/lib/supabase/client";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import FormWarning from "../_common/FormWarning";
import FormSuccess from "../_common/FormSuccess";
import FormError from "../_common/FormError";
import Link from "next/link";
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  formData: RefObject<{}>;
};
export default function EmailPasswordForm({ step, setStep, formData }: Props) {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      // signUpNewUser(data.email, data.password);
      formData.current = {
        credentials: { email: data.email, password: data.confirmPassword },
      };
      setStep(2);
    } else {
      setStatus("mismatch");
    }
  };

  // const supabase = createClient();
  // async function signUpNewUser(email: string, password: string) {
  //   const { data, error } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   });
  //   if (error) {
  //     console.error(error);
  //     setStatus("error");
  //     return;
  //   }
  //   setStatus("success");
  //   console.log("User:", data.user);
  //   console.log("Session", data.session);
  //   console.log("Data:", data);
  // }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${step === 1 ? "flex" : "hidden"}   flex-col max-w-50`}
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
      <button className="mt-4 bg-emerald-100 border border-primary-light rounded py-2 cursor-pointer hover:bg-emerald-50">
        Next
      </button>
      <Link href={"/signin"} className="text-center text-gray-500 mt-4">
        Already with us? Sign in.
      </Link>
    </form>
  );
}
