import { uploadOrReplaceNormalizedToSupabase } from "@/lib/Images/imageNormalization";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  avatarImg: string;
};

export default function FileUpload({ avatarImg }: Props) {
  const [imgUrl, setImgUrl] = useState(avatarImg);
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (!file) return;
      try {
        if (!avatarImg) {
          const imageUrl = await uploadOrReplaceNormalizedToSupabase(
            file,
            "avatars",
          );
          setImgUrl(imageUrl);
        } else {
          const profilePhotoName =
            imgUrl.split("/")[imgUrl.split("/").length - 1];
          const imageUrl = await uploadOrReplaceNormalizedToSupabase(
            file,
            "avatars",
            profilePhotoName,
          );
          setImgUrl(imageUrl);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  }
  return (
    <div className="flex justify-center min-h-0 items-center flex-col">
      <div
        className={
          "rounded-full border-gray-500  border relative size-34 mb-2 overflow-hidden"
        }
      >
        {imgUrl && <Image fill src={imgUrl} alt="Profile photo" />}
      </div>
      <label
        htmlFor="imgProfileInput"
        className="bg-emerald-100 rounded px-2 py-2"
      >
        Click here to select a profile image
      </label>
      <input
        className="h-0"
        id="imgProfileInput"
        type="file"
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .webp"
      />
    </div>
  );
}
