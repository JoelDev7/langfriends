import Image from "next/image";
import { ChangeEvent, useState } from "react";

export default function FileUpload() {
  const [imgUrl, setImgUrl] = useState("");
  function getFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const path = URL.createObjectURL(file);
      setImgUrl(path);
    }
  }
  return (
    <div className="flex justify-center items-center flex-col">
      {imgUrl === "" ? null : (
        <div
          className={
            "rounded-full border-gray-500  border relative size-34 mb-2 overflow-hidden"
          }
        >
          <Image fill src={imgUrl} alt="" />
        </div>
      )}
      <input type="file" onChange={getFile} accept=".jpg, .jpeg, .png, .webp" />
    </div>
  );
}
