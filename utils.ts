import { config } from "@/pages/api/config";
import { MemberCardProps } from "./types";

export const getData = () => {
  const data = localStorage.getItem("members_data");
  if (!data) {
    return;
  }
  return JSON.parse(data);
};

export const addData = () => {
  localStorage.setItem("members_data", JSON.stringify(config));
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
