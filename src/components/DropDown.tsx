import Image from "next/image";
import { useState } from "react";
import { DropDownProps } from "../../types";

export const DropDown = ({
  label,
  selectedOption,
  setSelectedOption,
  availableOptions,
}: DropDownProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  return (
    <div className="flex flex-col text-xs space-y-1 w-full max-w-[620px]">
      {label && (
        <div className="flex gap-2.5">
          <span className={`text-black text-sm`}>{label}</span>{" "}
        </div>
      )}
      <div
        className="relative px-4 text-sm sm:text-base bg-white py-3 w-full rounded-lg flex justify-between items-center text-[#5E605E] cursor-pointer"
        onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
        <span className="font-sans">{selectedOption}</span>
        <Image width={24} height={24} src={"/down-arrow-hollow.svg"} alt={""} />
        {isDropDownOpen && (
          <div className="flex flex-col w-full absolute top-14 right-0 max-h-20 z-10 bg-white rounded-lg text-[#5E605E] overflow-y-scroll ">
            {availableOptions ? (
              availableOptions.map((option, index) => (
                <div
                  key={`option-${index}`}
                  onClick={() => {
                    setSelectedOption(option);
                  }}
                  className="p-2 rounded-lg hover:bg-[#5E605E] hover:text-white">
                  {option}
                </div>
              ))
            ) : (
              <p className="flex justify-center items-center h-full">
                No options available
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
