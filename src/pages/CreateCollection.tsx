import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import UploadImageButton from "../components/imageUploader/ImageUploader";
import Input from "../components/Input";
import { useFormProvider } from "../contexts/FormProvider";
import FileUploader from "../components/FileUploader";
import { LSP4DigitalAssetMetadata, LSPFactory } from "@lukso/lsp-factory.js";
// import { LSP4MetadataUrlForEncoding } from "@lukso/lsp-factory.js/build/main/src/lib/interfaces/lsp4-digital-asset";

const fields = [
  { name: "name", label: "Name", placeholder: "Enter collection name" },
  { name: "drop", label: "Drop", placeholder: "Enter collection drop" },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter collection description",
  },
  { name: "price", label: "Price", placeholder: "Enter collection Price" },
];
const provider = "https://rpc.testnet.lukso.network";

const lspFactory = new LSPFactory(provider, {
  ipfsGateway: {
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization:
        "2Wgut1S2M2RBGOfL1Uu1SJT2Tax:cef5db41ab91adb96c4af5d2bbdfa09d",
    },
    // ipld: {ke},
  },
});

function CreateCollection() {
  const [uploading, setUploading] = useState<boolean>(false);
  const [response, setResponse] = useState<any | undefined>();
  const {
    images,
    setImages,
    deleteItem,
    deleteAsset,
    assets,
    addAsset,
    onChange,
    newAsset,
    formValues,
  } = useFormProvider();
  //   console.log(formValues);

  const uploadTOIPFS = async () => {
    setUploading(true);
    try {
      const filteredImages: any[] = images.filter((image) => image != null);
      const filteredAssets: any[] = assets.filter((asset) => asset != null);
      const res = await LSP4DigitalAssetMetadata.uploadMetadata({
        images: filteredImages,
        description: formValues?.description ?? "",
        assets: filteredAssets,
        ...formValues,
      });
      console.log(res);
      setResponse(res);
    } catch (error) {
      setResponse(undefined);
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="font-tusker text-center text-6xl">Create Collection</div>
      <div className="w-full md:w-1/3 mx-auto font-ibm">
        <div>
          <div className="flex flex-wrap gap-5">
            {images.map((image, id) => (
              <UploadImageButton
                className="w-[45%] text-center lg:w-[30%]"
                isSelect={false}
                onDelete={() => deleteItem(id)}
                selectedImage={image}
                setSelectedImage={(file: File | null) => {
                  setImages((prev) => {
                    let placeholder = [...prev];
                    placeholder[id] = file;
                    return placeholder;
                  });
                }}
                id={id}
                key={id}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setImages((images) => [...images, null]);
            }}
            className="flex items-center gap-2 py-1 px-2 mt-2 text-sm bg-black rounded-full text-white"
          >
            <AiOutlinePlus /> Add Image
          </button>
        </div>
        <div>
          {assets.map((asset, id) => (
            <FileUploader
              onDelete={() => {
                deleteAsset(id);
              }}
              selectedFile={asset}
              setSelectedFile={(file: File | null) => {
                addAsset(file, id);
              }}
              id={id}
              key={`file ${id}`}
            />
          ))}
          <button
            onClick={() => {
              newAsset();
            }}
            className="flex items-center gap-2 py-1 px-2 mt-2 text-sm bg-black rounded-full text-white"
          >
            <AiOutlinePlus /> Add Asset
          </button>
        </div>
        {fields.map(({ name, label, placeholder }) => (
          <Input
            label={label}
            name={name}
            value={formValues[name]}
            onChange={onChange}
            placeholder={placeholder}
          />
        ))}
        <button
          onClick={uploadTOIPFS}
          className="block text-center w-full mt-5 text-white bg-black rounded-full py-2"
        >
          {uploading ? "Uploading ..." : "Upload To IPFS"}
        </button>
        {/* <button className="block text-center w-full mt-5 text-white bg-black rounded-full py-2">
          Deploy
        </button> */}
        {response && (
          <div className="break-words mt-5">
            Successfully uploaded at {response.url}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateCollection;
