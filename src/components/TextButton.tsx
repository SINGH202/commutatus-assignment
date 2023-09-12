import { TextButtonProps, TextButtonStatus } from "../../types";

export const statusClasses = ({
  status,
}: {
  status: TextButtonStatus;
}): string => {
  status = status;
  const classes: { [key in TextButtonStatus]: string } = {
    PRIMARY: `rounded-lg w-full py-1.5 bg-[#f0ad4e] cursor-pointer transition-all duration-1000 ease-in-out text-white`,
    SECONDARY: `rounded-lg w-full py-1.5 bg-[#b73c33] cursor-pointer transition-all duration-1000 ease-in-out  text-white`,
    DISABLED: `w-full py-1.5 cursor-pointer transition-all duration-1000 ease-in-out text-white`,
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
      className={`${classes} hover:scale-105 min-h-[36px] min-w-[36px] xs:min-h-[44px] xs:min-w-[44px] shadow-lg`}
      onClick={() => {
        action();
      }}>
      {label}
    </button>
  );
};
