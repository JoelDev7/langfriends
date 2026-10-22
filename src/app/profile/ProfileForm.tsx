"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import { useEffect, useRef, useState } from "react";
import ShowSuggestions from "../_common/ShowSuggestions";
import { ProfileData, profileDataSchema } from "@/lib/validation/profile";
import { createClient } from "@/lib/supabase/client";
import FormButton from "../_common/FormButton";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "../_common/TextField";
import Popover from "../_common/Popover";

type Props = {
  profile: ProfileData;
  email: string | undefined;
  countries: { country: any }[] | null;
  languages: { language: any }[] | null;
};

type Popover = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info" | "";
  durationMils: number;
};

export default function ProfileForm({
  profile,
  email,
  countries,
  languages,
}: Props) {
  const countriesArray = useRef<string[]>([]);
  const languagesArray = useRef<string[]>([]);
  const [popover, setPopover] = useState<Popover>({
    show: false,
    message: "",
    type: "",
    durationMils: 0,
  });
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
  } = useForm<ProfileData>({
    mode: "onTouched",
    resolver: zodResolver(profileDataSchema),
    defaultValues: { ...profile, email },
  });
  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    await updateProfile(data);
  };
  async function updateProfile(data: ProfileData) {
    const { email, ...profileUpdates } = data;
    try {
      const supabase = createClient();
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !currentUser) {
        setPopover({
          durationMils: 4500,
          message:
            "Your session may have expired or there was a network issue, please try again",
          show: true,
          type: "error",
        });
        return { data: null, error: authError ?? new Error("Unauthenticated") };
      }
      const { data: updatedProfile, error } = await supabase
        .from("profiles")
        .update(profileUpdates)
        .eq("id", currentUser?.id)
        .select()
        .single();
      if (error) {
        setPopover({
          durationMils: 3500,
          message: "There was a problem saving changes",
          show: true,
          type: "error",
        });
        return { data: null, error };
      } else {
        setPopover({
          message: "Profile updated successfully",
          durationMils: 3000,
          show: true,
          type: "success",
        });
        return { data: updatedProfile, error: null };
      }
    } catch (error) {
      console.log("Unexpected profile update error:", error);
    }
  }
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <TextField
          rhfErrors={errors}
          fieldName="Biography"
          id="biography"
          rhf={register("biography")}
        />
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
          rhf={register("username")}
          rhfErrors={errors}
          type="text"
        />
        {errors.username && <FieldError message={errors.username.message} />}
        <InputField
          fieldName="Date of birth"
          id="age"
          rhf={register("date_of_birth")}
          rhfErrors={errors}
          type="text"
        />
        Format:yyyy-mm-dd <br /> Example 2000-09-02
        {errors.date_of_birth && (
          <FieldError message={errors.date_of_birth.message} />
        )}
        <InputField
          fieldName="Country"
          id="country"
          rhf={register("country")}
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
          rhf={register("native_language")}
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
          rhf={register("learning_language")}
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
          rhf={register("email")}
          rhfErrors={errors}
          type="text"
          readOnly={true}
        />
        {errors.email && <FieldError message={errors.email.message} />}
        <FormButton text="Save changes" />
      </form>
      <Popover
        onClose={() =>
          setPopover({
            message: "",
            show: false,
            type: "",
            durationMils: 0,
          })
        }
        durationMils={popover.durationMils}
        message={popover.message}
        showPopover={popover.show}
        type={popover.type}
      />
    </main>
  );
}
