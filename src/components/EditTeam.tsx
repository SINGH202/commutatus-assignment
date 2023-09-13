import { TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";

export const EditTeamPopup = () => {
  return (
    <div className="flex flex-col items-center p-10 gap-5 popup opacity-90 text-black">
      <div className="flex gap-5 items-center justify-end text-white w-full">
        <TextButton
          status={TextButtonStatus.SECONDARY}
          label={"Close"}
          action={() => {}}
        />
        <TextButton label={"Complete"} action={() => {}} />
      </div>
    </div>
  );
};
