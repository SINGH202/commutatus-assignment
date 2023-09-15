import Image from "next/image";
import { TeamTypeEncloserProps, TextButtonStatus } from "../../types";
import { useState } from "react";
import { Teams } from "./Teams";
import { TextButton } from "./TextButton";
import { AddTeamPopup } from "./AddTeamPopup";
import { PopupEncloser } from "./PopupEncloser";

export const TeamTypeEncloser = ({
  teams,
  teamType,
}: TeamTypeEncloserProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 ml-14 mt-5">
      <div className="flex items-center gap-5">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
          <Image
            width={15}
            height={15}
            src={"/down-arrow.svg"}
            alt={"down-arrow"}
            className={isOpen ? `rotate-180` : ``}
          />
          <span className="text-lg font-bold font-serif" draggable={false}>
            {teamType}
          </span>
        </div>
        <div className="w-32">
          <TextButton
            label={"Add team"}
            status={TextButtonStatus.NEUTRAL}
            action={() => {
              setIsAddTeamPopupOpen(true);
            }}
          />
        </div>
      </div>
      {isOpen && Boolean(teams) ? (
        <Teams teams={teams} teamType={teamType} />
      ) : (
        <></>
      )}
      <PopupEncloser
        show={isAddTeamPopupOpen}
        close={() => {
          setIsAddTeamPopupOpen(false);
        }}>
        <AddTeamPopup
          close={() => {
            setIsAddTeamPopupOpen(false);
          }}
          teamType={teamType?.toLocaleLowerCase()}
        />
        ;
      </PopupEncloser>
    </div>
  );
};
