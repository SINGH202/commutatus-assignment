import { membersData } from "@/pages/api/config";
import { MemberCardProps } from "./types";

export const getData = () => {
  const data = localStorage.getItem("members_data");
  if (!data) {
    return;
  }
  return JSON.parse(data);
};

export const addData = () => {
  localStorage.setItem("members_data", JSON.stringify(membersData));
};

export function debounce(
  func: Function,
  delay: number,
  options?: DebounceOptions
): Function {
  let timer: any | undefined;
  let lastCall: Date | undefined;

  const debounced = (...args: any) => {
    if (timer !== undefined) {
      clearTimeout(timer);
    }

    lastCall = new Date();
    timer = setTimeout(
      () => {
        func(...args);
      },
      delay,
      options
    );
  };

  return debounced;
}

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export const isValidEmail = (email: string) => {
  if (email === "") {
    return true;
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isTeamAlreadyExists = (name: string, teams: MemberCardProps[]) => {
  const teamNamesSet = new Set();

  for (const team of teams) {
    teamNamesSet.add(team.teamName.toLocaleLowerCase());
  }
  if (teamNamesSet.has(name.toLocaleLowerCase())) {
    return true;
  }
  return false;
};

export const getTeamNames = (teams: MemberCardProps[]) => {
  const getTeamNamesSet = () => {
    const teamNamesSet = new Set();

    for (const team of teams) {
      if (team.teamName !== "") {
        teamNamesSet.add(team.teamName);
      }
    }

    return Array.from(teamNamesSet);
  };

  const teamNames: any[] = getTeamNamesSet();

  return teamNames;
};

export const groupObjectsByTeamType = (
  data: MemberCardProps[]
): Record<string, MemberCardProps[]> => {
  const result: Record<string, MemberCardProps[]> = {};
  if (!data) return {};
  data.forEach((item) => {
    const { teamType } = item;
    if (!result[teamType]) {
      result[teamType] = [];
    }
    result[teamType].push(item);
  });

  return result;
};

export function searchObjects(
  data: MemberCardProps[],
  searchText: string
): MemberCardProps[] {
  return data.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.phone.includes(searchText) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });
}
