import { useState } from "react";
import { MemberCardProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { PopupEncloser } from "./PopupEncloser";
import { EditMemberPopup } from "./EditMemberPopup";

export const MemberCard = ({ name, role, phone, email }: MemberCardProps) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1.5 shadow-lg border bg-white w-[270px] px-4 py-2 rounded-md">
      <span className="text-lg font-medium">{name}</span>
      <span className="text-lg font-semibold font-mono">{role}</span>
      <span>{email}</span>
      <span>{phone}</span>
      <div className="flex items-center justify-between gap-3">
        <TextButton
          label={"Edit"}
          status={TextButtonStatus.PRIMARY}
          action={() => setIsEditMenuOpen(true)}
        />
        {role === "Member" && (
          <TextButton
            label={"Delete"}
            status={TextButtonStatus.SECONDARY}
            action={() => {}}
          />
        )}
      </div>
      <PopupEncloser
        show={isEditMenuOpen}
        close={() => setIsEditMenuOpen(false)}>
        <EditMemberPopup />
      </PopupEncloser>
    </div>
  );
};
