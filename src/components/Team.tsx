import Image from "next/image";
import { MemberCardProps, TeamProps, TextButtonStatus } from "../../types";
import { useState } from "react";
import { MemberCard } from "./MemberCard";
import { TextButton } from "./TextButton";
import { EditTeamPopup } from "./EditTeam";
import { PopupEncloser } from "./PopupEncloser";
import { AddMemberPopup } from "./AddMemberPopup";
import { useMembersContext } from "@/context/MembersContext";

export const Team = ({ teamName, members, teamType }: TeamProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const [isAddMemberPopupIsOpen, setIsAddMemberPopupIsOpen] = useState(false);
  const [isEditTeamPopupOpen, setIsEditTeamPopupOpen] = useState(false);

  const { data, setData } = useMembersContext();

  let type = teamType?.toLowerCase() || "";
  const deleteTeam = () => {
    let remainingTeams = data[type].filter(
      (team: MemberCardProps) =>
        team.teamName !== teamName && team.role !== "Head"
    );

    let newData = {
      ...data,
      [type]: [...remainingTeams],
    };

    setData(newData);
    localStorage.setItem("members_data", JSON.stringify(newData));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <div
          className="flex items-center gap-2 pt-1 cursor-pointer pr-2"
          onClick={() => setIsOpen(!isOpen)}>
          <Image
            width={15}
            height={15}
            src={"/down-arrow.svg"}
            alt={"down-arrow"}
            className={isOpen ? `rotate-180` : ``}
          />
          <span className="text-lg font-bold font-serif" draggable={false}>
            {teamName}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-5">
          <div className="w-28">
            <TextButton
              status={TextButtonStatus.NEUTRAL}
              label={"Add member"}
              action={() => {
                setIsAddMemberPopupIsOpen(true);
              }}
            />
          </div>
          <div className="w-24">
            <TextButton
              status={TextButtonStatus.PRIMARY}
              label={"Edit"}
              action={() => {
                setIsEditTeamPopupOpen(true);
              }}
            />
          </div>
          <div className="w-24">
            <TextButton
              status={TextButtonStatus.SECONDARY}
              label={"Delete"}
              action={() => {
                deleteTeam();
              }}
            />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-5 ml-[7px] h-fit px-4">
          {members
            .filter((member) => member?.role === "Leader")
            .map((head) => (
              <MemberCard
                key={`lead-${head?.id}`}
                id={head?.id}
                name={head?.name}
                role={head?.role}
                email={head?.email}
                phone={head?.phone}
                teamName={head?.teamName}
                teamType={teamType || ""}
              />
            ))}
          <div className="flex gap-3 flex-wrap">
            {members
              .filter((member) => member?.role !== "Leader")
              .map((member) => (
                <MemberCard
                  key={`member-${member?.id}`}
                  id={member?.id}
                  name={member?.name}
                  role={member?.role}
                  email={member?.email}
                  phone={member?.phone}
                  teamName={member?.teamName}
                  teamType={teamType || ""}
                />
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <PopupEncloser
        show={isEditTeamPopupOpen}
        close={() => setIsEditTeamPopupOpen(false)}>
        <EditTeamPopup
          teamName={teamName}
          teamType={teamType}
          close={() => setIsEditTeamPopupOpen(false)}
        />
      </PopupEncloser>
      <PopupEncloser
        show={isAddMemberPopupIsOpen}
        close={() => setIsAddMemberPopupIsOpen(false)}>
        <AddMemberPopup
          close={() => setIsAddMemberPopupIsOpen(false)}
          teamName={teamName}
          teamType={teamType}
        />
      </PopupEncloser>
    </div>
  );
};
