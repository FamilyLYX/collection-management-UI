import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import "./style.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ className, label, ...props }: InputProps) => {
  return (
    <div className="mt-5">
      {label && <div className=" mb-1">{label}</div>}
      <input
        className={`block p-5 border-0 bg-[grey]/30 rounded-lg h-[10px] w-full ${className}`}
        {...props}
      ></input>
    </div>
  );
};

export default Input;
