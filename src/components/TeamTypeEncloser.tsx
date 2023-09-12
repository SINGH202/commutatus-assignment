import Image from "next/image";
import { MemberCardProps, TeamTypeEncloserProps } from "../../types";
import { useEffect, useState } from "react";
import { MemberCard } from "./MemberCard";
import { Teams } from "./Teams";

export const TeamTypeEncloser = ({
  teams,
  teamType,
}: TeamTypeEncloserProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-fit ml-14 mt-5 ">
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
      {isOpen ? <Teams teams={teams} /> : <></>}
    </div>
  );
};
