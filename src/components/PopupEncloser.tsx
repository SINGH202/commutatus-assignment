import { PopupEncloserProps } from "../../types";

export const PopupEncloser = ({
  children,
  show,
  close,
}: PopupEncloserProps) => {
  return show ? (
    <div
      className="z-50 fixed left-0 right-0 top-0 bottom-0 grid place-items-center bg-black bg-opacity-75 inset-0"
      onClick={() => {
        close(false);
      }}>
      <div
        className="relative max-w-[480px] w-11/12 sm:w-full rounded-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <button
          onClick={() => close(false)}
          className={`place-self-end absolute top-5 right-5`}></button>
        {children}
      </div>
    </div>
  ) : null;
};
