import { ReactNode } from "react";

export type SearchBarProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export enum TeamTypes {
  HR = "hr",
  ENGINEERING = "engineering",
  DESIGN = "design",
}

export type MemberCardProps = {
  id?: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  teamType: string;
  teamName: string;
};

export type TeamTypeEncloserProps = {
  teamType?: string;
  teams: MemberCardProps[];
};

export type TeamProps = {
  teamName: string;
  teamType?: string;
  members: MemberCardProps[];
};

export enum TextButtonStatus {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  NEUTRAL = "NEUTRAL",
  DISABLED = "DISABLED",
}

export type TextButtonProps = {
  label: string;
  action: () => void;
  status?: TextButtonStatus;
};

export type PopupEncloserProps = {
  children: any;
  show: boolean;
  close: (Option: boolean) => void;
};

export type InputWithLabelProps = {
  label: string;
  placeholder: string;
  description?: string;
  isInvalid?: boolean;
  errorText?: string;
  isDisabled?: boolean;
  type: "text" | "number" | "date" | "password" | "email";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  handleKeyDown?: (value: any) => void;
};

export type MembersContextType = {
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
  data: any;
  setData: (data: any) => void;
};

export type MembersProviderProps = {
  children: ReactNode;
};

export type AddTeamPopupProps = {
  close: () => void;
  teamType?: string;
};
export type EditTeamPopupProps = {
  close: () => void;
  teamType?: string;
  teamName?: string;
};

export type EditMemberPopupProps = {
  close: () => void;
  teamType?: string;
  memberData: MemberCardProps;
};
export type AddMemberPopupProps = {
  close: () => void;
  teamType?: string;
  teamName?: string;
};

export type DropDownProps = {
  label?: string;
  selectedOption: string;
  setSelectedOption: (team: string) => void;
  availableOptions: string[];
};
