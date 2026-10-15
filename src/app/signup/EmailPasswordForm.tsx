import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import FormWarning from "../_common/FormWarning";
import Link from "next/link";
import { EmailPassword, emailPasswordSchema } from "@/lib/validation/signup";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  formData: RefObject<{ email: string; password: string }>;
};
export default function EmailPasswordForm({ step, setStep, formData }: Props) {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailPassword>({
    mode: "onTouched",
    resolver: zodResolver(emailPasswordSchema),
  });
  const onSubmit: SubmitHandler<EmailPassword> = (data) => {
    if (data.password === data.confirmPassword) {
      formData.current = { email: data.email, password: data.confirmPassword };

      setStep(2);
    } else {
      setStatus("mismatch");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${step === 1 ? "flex" : "hidden"}   flex-col max-w-50`}
    >
      <InputField
        rhf={register("email")}
        fieldName="Email"
        id="email"
        type="text"
        rhfErrors={errors}
      />
      {errors.email && <FieldError message={errors.email.message} />}
      <InputField
        rhf={register("password")}
        fieldName="Password"
        id="password"
        type="password"
        rhfErrors={errors}
      />
      {errors.password && <FieldError message={errors.password.message} />}
      <InputField
        rhf={register("confirmPassword")}
        fieldName="Confirm password"
        id="confirmPassword"
        type="password"
        rhfErrors={errors}
      />
      {errors.confirmPassword && (
        <FieldError message={errors.confirmPassword.message} />
      )}
      <div className=" mt-4">
        {/* {status === "error" ? (
          <FormError message="There was a problem, please try again later." />
        ) : null}
        {status === "success" ? (
          <FormSuccess message="">
            <Link className="text-center font-semibold" href={"/signin"}>
              Go to sign in
            </Link>
          </FormSuccess>
        ) : null} */}
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
