import Image from "next/image";
import { TeamProps, TextButtonStatus } from "../../types";
import { useState } from "react";
import { MemberCard } from "./MemberCard";
import { TextButton } from "./TextButton";
import { EditTeamPopup } from "./EditTeam";
import { PopupEncloser } from "./PopupEncloser";
import { AddMemberPopup } from "./AddMemberPopup";

export const Team = ({ teamName, members }: TeamProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddMemberPopupIsOpen, setIsAddMemberPopupIsOpen] = useState(false);
  const [isEditTeamPopupOpen, setIsEditTeamPopupOpen] = useState(false);
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
              action={() => {}}
            />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-5 ml-[7px] h-fit px-4">
          {members
            .filter((member) => member?.role === "Leader")
            .map((head) => (
              <MemberCard key={`lead-${head?.id}`} {...head} />
            ))}
          <div className="flex gap-3 flex-wrap">
            {members
              .filter((member) => member?.role !== "Leader")
              .map((member) => (
                <MemberCard key={`member-${member?.id}`} {...member} />
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <PopupEncloser
        show={isEditTeamPopupOpen}
        close={() => setIsEditTeamPopupOpen(false)}>
        <EditTeamPopup />
      </PopupEncloser>
      <PopupEncloser
        show={isAddMemberPopupIsOpen}
        close={() => setIsAddMemberPopupIsOpen(false)}>
        <AddMemberPopup />
      </PopupEncloser>
    </div>
  );
};
