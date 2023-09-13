import { useRef } from "react";
import { InputWithLabelProps } from "../../types";

export const InputWithLabel = ({
  label,
  placeholder,
  description,
  onChange,
  type = "text",
  isInvalid = false,
  errorText = "Please check the data you entered",
  value,
  isDisabled = false,
  handleKeyDown,
}: InputWithLabelProps) => {
  const inputRef = useRef<any>();

  const classes = () => {
    if (!isInvalid)
      return `border-[#7792A0] placeholder:text-[#5E605E] text-[#5E605E] focus:outline-none`;
    return ` placeholder:text-[#FF0000] text-[#FF0000]`;
  };

  return (
    <div className="flex flex-col text-xs space-y-1 w-full max-w-[620px]">
      {label && (
        <div className="flex gap-2.5">
          <span className={`text-black text-sm`}>{label}</span>{" "}
        </div>
      )}
      <div className="w-full relative flex items-center">
        <div className="w-full relative flex items-center">
          <input
            type={type}
            ref={inputRef}
            min={0}
            onWheel={() => inputRef?.current?.blur()}
            value={value}
            placeholder={placeholder}
            disabled={isDisabled}
            className={`px-4 text-sm sm:text-base placeholder-overflow bg-white py-3  w-full rounded-lg ${classes()}`}
            onChange={(e) => {
              onChange(e);
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {isInvalid && (
        <span className={`w-full text-[#FF0000] text-[12px] px-2 py-1`}>
          {errorText}
        </span>
      )}
      {description && (
        <span className={`text-sm text-[#5E605E] px-3 py-2`}>
          {description}
        </span>
      )}
    </div>
  );
};
