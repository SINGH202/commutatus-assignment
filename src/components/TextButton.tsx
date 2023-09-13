import { TextButtonProps, TextButtonStatus } from "../../types";

export const statusClasses = ({
  status,
}: {
  status: TextButtonStatus;
}): string => {
  status = status;
  const classes: { [key in TextButtonStatus]: string } = {
    PRIMARY: `bg-[#f0ad4e] cursor-pointer transition-all duration-1000 ease-in-out text-white`,
    SECONDARY: `bg-[#b73c33] cursor-pointer transition-all duration-1000 ease-in-out text-white`,
    NEUTRAL: `cursor-pointer transition-all duration-1000 ease-in-out text-black bg-white`,
    DISABLED: `cursor-not-allowed transition-all duration-1000 ease-in-out text-white bg-gray-400`,
  };
  return classes[status];
};

export const TextButton = ({
  label,
  action,
  status = TextButtonStatus.PRIMARY,
}: TextButtonProps) => {
  const classes = statusClasses({ status });
  return (
    <button
      className={`${classes} rounded-md w-full py-1.5 hover:scale-105 min-h-[36px] min-w-[36px] xs:min-h-[44px] xs:min-w-[44px] shadow-lg`}
      onClick={() => {
        action();
      }}>
      {label}
    </button>
  );
};
