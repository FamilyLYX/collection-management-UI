import { useState } from "react";
import PlusButton from "../../assets/PlusCircle.png";
import CloseButton from "../../assets/close.png";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    padding: "3px",
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320, minHeight: "63px" },
  delete: {
    cursor: "pointer",
    background: "black",
    color: "white",
    border: "none",
    padding: "3px",
  },
};

const UploadImageButton = ({
  className,
  isSelect,
  id,
  action,
  onDelete,
  selectedImage,
  setSelectedImage,
}: {
  className?: string;
  isSelect?: boolean;
  id?: number;
  onDelete: () => void;
  setSelectedImage: (file: File | null) => void;
  selectedImage: File | null;
  action?: (id: number, value: string) => void;
}) => {
  //   const [selectedImage, setSelectedImage] = useState<any>();
  // This function will be triggered when the file field change
  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = (e: any) => {
    e.preventDefault();
    console.log(e);

    setSelectedImage(null);
  };

  return (
    <>
      <div
        style={styles.container as React.CSSProperties}
        className={`relative mt-5 bg-[grey]/30 rounded-lg border-[1px] border-[grey] cursor-pointer ${className}`}
      >
        <AiFillCloseCircle
          onClick={onDelete}
          className="absolute top-0 right-0 z-10 text-red-600"
        />
        <input
          accept="image/*"
          type="file"
          onChange={imageChange}
          id={`upload-${id}`}
          hidden
          className="w-full h-full"
        />
        <label
          htmlFor={`upload-${id}`}
          className="w-full flex justify-center items-center"
        >
          {selectedImage ? (
            <div
              style={styles.preview as React.CSSProperties}
              className="relative w-full"
            >
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
                className="w-full block "
              />
              <button
                onClick={removeSelectedImage}
                style={styles.delete}
                className="absolute top-0"
              >
                <img src={CloseButton} alt="closeBtn" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1 py-2 items-center">
              <img
                src={PlusButton}
                alt="plusButton"
                className="w-10 h-10 cursor-pointer"
              />
              <div>Upload Image</div>
            </div>
          )}
        </label>
      </div>
    </>
  );
};

export default UploadImageButton;
