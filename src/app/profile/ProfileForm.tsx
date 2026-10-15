"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import { useEffect, useRef } from "react";
import ShowSuggestions from "../_common/ShowSuggestions";

type Inputs = {
  username: string;
  full_name: string;
  avatar_url: string;
  date_of_birth: string;
  country: string;
  native_language: string;
  learning_language: string;
  practice_schedule: string;
  email: string;
};

type Props = {
  profile: Inputs;
  email: string | undefined;
  countries: { country: any }[] | null;
  languages: { language: any }[] | null;
};

export default function ProfileForm({
  profile,
  email,
  countries,
  languages,
}: Props) {
  const countriesArray = useRef<string[]>([]);
  const languagesArray = useRef<string[]>([]);
  useEffect(() => {
    if (countries) {
      countriesArray.current = countries.map((country) => country.country);
    }
    if (languages) {
      languagesArray.current = languages.map((language) => language.language);
    }
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onTouched",
    defaultValues: { ...profile, email },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <InputField
        fieldName="Full name"
        id="full_name"
        rhf={register("full_name")}
        rhfErrors={errors}
        type="text"
      />
      {errors.full_name && <FieldError message={errors.full_name.message} />}
      <InputField
        fieldName="Username"
        id="username"
        rhf={register("username", { required: "Username is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.username && <FieldError message={errors.username.message} />}
      <InputField
        fieldName="Date of birth"
        id="age"
        rhf={register("date_of_birth", {
          required: "Date of birth is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      {errors.date_of_birth && (
        <FieldError message={errors.date_of_birth.message} />
      )}
      <InputField
        fieldName="Country"
        id="country"
        rhf={register("country", { required: "Country is required." })}
        rhfErrors={errors}
        type="text"
      />
      <ShowSuggestions
        data={countriesArray.current}
        query={watch("country")}
        setValue={setValue}
        field="country"
      />
      {errors.country && <FieldError message={errors.country.message} />}
      <InputField
        fieldName="Native language"
        id="native_language"
        rhf={register("native_language", {
          required: "Native language is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      <ShowSuggestions
        data={languagesArray.current}
        query={watch("native_language")}
        setValue={setValue}
        field="native_language"
      />
      {errors.native_language && (
        <FieldError message={errors.native_language.message} />
      )}
      <InputField
        fieldName="Learning language"
        id="learning_language"
        rhf={register("learning_language", {
          required: "Learning language is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      <ShowSuggestions
        data={languagesArray.current}
        query={watch("learning_language")}
        setValue={setValue}
        field="learning_language"
      />
      {errors.learning_language && (
        <FieldError message={errors.learning_language.message} />
      )}
      <InputField
        fieldName="Practice schedule"
        id="practice_schedule"
        rhf={register("practice_schedule")}
        rhfErrors={errors}
        type="text"
      />
      {errors.practice_schedule && (
        <FieldError message={errors.practice_schedule.message} />
      )}
      <InputField
        fieldName="
        Email"
        id="mail"
        rhf={register("email", { required: "Email is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.email && <FieldError message={errors.email.message} />}
    </form>
  );
}
