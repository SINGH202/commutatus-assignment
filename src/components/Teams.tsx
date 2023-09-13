import Image from "next/image";
import { TeamTypeEncloserProps } from "../../types";
import { MemberCard } from "./MemberCard";
import { useState } from "react";
import { Team } from "./Team";

export const Teams = ({ teams }: TeamTypeEncloserProps) => {
  const getTeamNames = () => {
    const teamNamesSet = new Set();

    for (const team of teams) {
      teamNamesSet.add(team.teamName);
    }

    return Array.from(teamNamesSet);
  };

  const teamNames: any[] = getTeamNames();

  return (
    <div className="flex flex-col gap-5 ml-[7px] px-4 ">
      {teams
        .filter((member) => member?.role === "Head")
        .map((head) => (
          <MemberCard key={`head-${head?.id}`} {...head} />
        ))}
      <div className="flex flex-col gap-5 ml-14">
        {teamNames.map((teamName, index) => (
          <Team
            key={`team-${index}`}
            teamName={teamName}
            members={teams.filter(
              (team) => teamName === team.teamName && team?.role !== "Head"
            )}
          />
        ))}
      </div>
    </div>
  );
};
