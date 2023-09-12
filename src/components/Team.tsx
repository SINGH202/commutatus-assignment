import Image from "next/image";
import { TeamProps } from "../../types";
import { useState } from "react";
import { MemberCard } from "./MemberCard";

export const Team = ({ teamName, members }: TeamProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-2">
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
          {teamName}
        </span>
      </div>
      {isOpen ? (
        <div className="flex flex-col gap-5 ml-[7px] h-fit px-4">
          {members
            .filter((member) => member?.role === "Leader")
            .map((head) => (
              <MemberCard key={`head-${head?.id}`} {...head} />
            ))}
          <div className="flex gap-3 flex-wrap">
            {members
              .filter((member) => member?.role !== "Leader")
              .map((head) => (
                <MemberCard key={`head-${head?.id}`} {...head} />
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
