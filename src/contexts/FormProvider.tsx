import React, {
  ChangeEvent,
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

type setImage = React.Dispatch<React.SetStateAction<(File | null)[]>>;

interface Form {
  images: (File | null)[];
  deleteItem: (id: number) => void;
  setImages: setImage;
  assets: (File | null)[];
  deleteAsset: (id: number) => void;
  addAsset: (file: File | null, id: number) => void;
  newAsset: () => void;
  formValues: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormContext = createContext<Form>({
  images: [null],
  deleteItem: () => {},
  setImages: () => {},
  assets: [null],
  addAsset: () => {},
  deleteAsset: () => {},
  newAsset: () => {},
  formValues: {},
  onChange: () => {},
});

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<(File | null)[]>([null]);
  const [assets, setAssets] = useState<(File | null)[]>([null]);
  const [formValues, setFormValues] = useState<any>({});

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormValues((form: any) => ({ ...form, [name]: value }));
  };
  const deleteItem = (id: number) => {
    setImages((prev) => {
      console.log(prev);
      let placeholder = [...prev];
      placeholder.splice(id, 1);
      console.log(placeholder);
      return [...placeholder];
    });
  };

  const deleteAsset = (id: number) => {
    setAssets((prev) => {
      console.log(prev);
      let placeholder = [...prev];
      placeholder.splice(id, 1);
      console.log(placeholder);
      return [...placeholder];
    });
  };

  const addAsset = (file: File | null, id: number) => {
    setAssets((prev) => {
      let placeholder = [...prev];
      placeholder[id] = file;
      return placeholder;
    });
  };

  const newAsset = () => {
    setAssets((assets) => [...assets, null]);
  };

  const values = useMemo(
    () => ({
      images,
      setImages,
      deleteItem,
      assets,
      addAsset,
      deleteAsset,
      newAsset,
      formValues,
      onChange,
    }),
    [
      images,
      setImages,
      deleteItem,
      assets,
      addAsset,
      deleteAsset,
      newAsset,
      formValues,
      onChange,
    ]
  );
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

export default FormProvider;
export const useFormProvider = () => useContext(FormContext);
