import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const FileUploader = ({
  className,
  isSelect,
  id,
  action,
  onDelete,
  selectedFile,
  setSelectedFile,
}: {
  className?: string;
  isSelect?: boolean;
  id?: number;
  onDelete: () => void;
  setSelectedFile: (file: File | null) => void;
  selectedFile: File | null;
  action?: (id: number, value: string) => void;
}) => {
  const imageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    }
  };
  return (
    <div className="flex items-center">
      <input
        // accept="image/*"
        type="file"
        onChange={imageChange}
        id={`asset-${id}`}
        // value={selectedFile!.name ?? ""}
        className="w-full h-full mt-2"
      />
      <AiOutlineClose
        onClick={onDelete}
        className="text-red-600 cursor-pointer"
      />
    </div>
  );
};

export default FileUploader;
