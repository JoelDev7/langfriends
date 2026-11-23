import { useProfile } from "@/hooks/useProfile";
import { uploadOrReplaceNormalizedToSupabase } from "@/lib/Images/imageNormalization";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import Popover from "./Popover";
import { usePopover } from "@/hooks/usePopover";

type Props = {
  avatarImg: string;
  full_name: string;
};

export default function FileUpload({ avatarImg, full_name }: Props) {
  const [imgUrl, setImgUrl] = useState(avatarImg);
  const { setProfile } = useProfile();
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
          setProfile({ avatar_url: imageUrl, full_name });
          triggerPopover(
            "Profile photo updated successfully!",
            "success",
            3500,
          );
        } else {
          const profilePhotoName =
            imgUrl.split("/")[imgUrl.split("/").length - 1];
          const imageUrl = await uploadOrReplaceNormalizedToSupabase(
            file,
            "avatars",
            profilePhotoName,
          );
          setImgUrl(imageUrl);
          setProfile({ avatar_url: imageUrl, full_name });
          triggerPopover(
            "Profile photo updated successfully!",
            "success",
            3500,
          );
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  }
  const { triggerPopover } = usePopover();
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
