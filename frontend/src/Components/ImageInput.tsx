import { ChangeEvent, useRef, useState } from "react";
import { IMAGE_PATH } from "../utils/helper";

export default function ImageInput({
  imageName,
  onChange,
}: {
  imageName: string | undefined;
  onChange: (imageURL: string) => void;
}) {
  const [temporaryImageURL, setTemporayImageURL] = useState("");

  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const openImageInput = () => {
    console.log("click");
    imageInputRef.current?.click();
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageBlob = e.target.files[0];
    const imageURL = URL.createObjectURL(imageBlob);
    setTemporayImageURL(imageURL);
    onChange(imageURL);
  };
  const imageFromStorage = imageName && `${IMAGE_PATH}/${imageName}`;

  const imageSource = temporaryImageURL || imageFromStorage;

  return (
    <div
      className="relative rounded-md overflow-hidden group max-h-[40rem]"
      onClick={openImageInput}
    >
      {/* <div className="overflow-hidden h-full"> */}
      <p className="absolute bg-black/30 inset-0 text-body text-medium flex items-center gap-2 justify-center  transition-all opacity-0 cursor-pointer group-hover:opacity-100 duration-200">
        <i className="bx bx-edit"></i>
        <p className="text-medium">Edit Image</p>
      </p>
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept=".png, .jpg, .jpeg"
        onChange={onChangeImage}
      />
      {imageSource ? (
        <img
          src={temporaryImageURL || imageFromStorage}
          className="h-full w-full object-cover rounded-md max-w-[100%] min-h-0 block min-w-0 "
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-medium h-full bg-light/60 gap-2">
          <i className="bx bx-camera text-white text-large"></i>
          <p className="text-white">Add Image</p>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
