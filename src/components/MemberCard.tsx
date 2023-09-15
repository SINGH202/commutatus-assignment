import { useState } from "react";
import { MemberCardProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { PopupEncloser } from "./PopupEncloser";
import { EditMemberPopup } from "./EditMemberPopup";
import { useMembersContext } from "@/context/MembersContext";

export const MemberCard = ({
  id,
  name,
  role,
  phone,
  email,
  teamType,
  teamName,
}: MemberCardProps) => {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

  const { data, setData } = useMembersContext();

  const deleteMember = (id: string) => {
    let teamsAfterDeletion = data.filter(
      (item: MemberCardProps) => item.id !== id
    );

    setData(teamsAfterDeletion);
    localStorage.setItem("members_data", JSON.stringify(teamsAfterDeletion));
  };
  return (
    <div className="flex flex-col gap-1.5 shadow-lg border bg-white w-[270px] px-4 py-2 rounded-md">
      <span className="text-lg font-medium">{name}</span>
      <span className="text-lg font-semibold font-mono">{role}</span>
      <span>{email}</span>
      <span>{phone}</span>
      <div className="flex items-center justify-between gap-3">
        {role !== "CEO" && (
          <TextButton
            label={"Edit"}
            status={TextButtonStatus.PRIMARY}
            action={() => setIsEditMenuOpen(true)}
          />
        )}
        {role === "Member" && (
          <TextButton
            label={"Delete"}
            status={TextButtonStatus.SECONDARY}
            action={() => {
              deleteMember(id);
            }}
          />
        )}
      </div>
      <PopupEncloser
        show={isEditMenuOpen}
        close={() => setIsEditMenuOpen(false)}>
        <EditMemberPopup
          close={() => setIsEditMenuOpen(false)}
          teamType={teamType}
          memberData={{
            id,
            name,
            role,
            phone,
            email,
            teamType,
            teamName,
          }}
        />
      </PopupEncloser>
    </div>
  );
};
