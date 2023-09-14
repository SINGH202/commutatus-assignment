import Image from "next/image";
import { TeamTypeEncloserProps } from "../../types";
import { MemberCard } from "./MemberCard";
import { useState } from "react";
import { Team } from "./Team";

export const Teams = ({ teams, teamType }: TeamTypeEncloserProps) => {
  const getTeamNames = () => {
    const teamNamesSet = new Set();

    for (const team of teams) {
      if (team.teamName !== "") {
        teamNamesSet.add(team.teamName);
      }
    }

    return Array.from(teamNamesSet);
  };

  const teamNames: any[] = getTeamNames();

  return (
    <div className="flex flex-col gap-5 ml-[7px] px-4 ">
      {teams
        .filter((member) => member?.role === "Head")
        .map((head) => (
          <MemberCard
            key={`head-${head?.id}`}
            id={head?.id}
            name={head?.name}
            role={head?.role}
            email={head?.email}
            phone={head?.phone}
            teamName={head?.teamName}
            teamType={teamType}
          />
        ))}
      <div className="flex flex-col gap-5 ml-14">
        {teamNames.map((teamName, index) => (
          <Team
            key={`team-${index}`}
            teamName={teamName}
            teamType={teamType}
            members={teams.filter(
              (team) => teamName === team.teamName && team?.role !== "Head"
            )}
          />
        ))}
      </div>
    </div>
  );
};
