import { useMembersContext } from "@/context/MembersContext";
import {
  EditTeamPopupProps,
  MemberCardProps,
  TextButtonStatus,
} from "../../types";
import { TextButton } from "./TextButton";
import { useState } from "react";
import { InputWithLabel } from "./InputWithLabel";

export const EditTeamPopup = ({
  close,
  teamName,
  teamType,
}: EditTeamPopupProps) => {
  const { data, setData } = useMembersContext();

  const [newTeamName, setNewTeamName] = useState("");

  let type = teamType?.toLowerCase() || "";
  const updateTeamName = () => {
    let teamWithChanges = data[type].filter(
      (team: MemberCardProps) =>
        team.teamName === teamName && team.role !== "Head"
    );
    let teamWithoutChanges = data[type].filter(
      (team: MemberCardProps) =>
        team.teamName !== teamName && team.role !== "Head"
    );
    teamWithChanges.forEach((team: MemberCardProps) => {
      team.teamName = newTeamName;
    });
    const newData = {
      ...data,
      type: [...teamWithoutChanges, ...teamWithChanges],
    };
    setData(newData);
    localStorage.setItem("members_data", JSON.stringify(newData));
    close();
  };

  return (
    <div className="flex flex-col p-10 gap-5 popup opacity-90 text-black">
      <span className="text-black">Old Team Name: {teamName}</span>
      <InputWithLabel
        label={"Update team name"}
        placeholder={teamName || ""}
        type={"text"}
        onChange={(e) => {
          setNewTeamName(e.target.value);
        }}
        value={newTeamName}
      />
      <div className="flex gap-5 items-center justify-end w-full">
        <TextButton
          status={TextButtonStatus.SECONDARY}
          label={"Close"}
          action={() => {
            close();
          }}
        />
        <TextButton
          label={"Complete"}
          action={() => {
            updateTeamName();
          }}
        />
      </div>
    </div>
  );
};
