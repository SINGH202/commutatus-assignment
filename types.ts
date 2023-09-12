export type SearchBarProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export type MemberCardProps = {
  id?: string;
  name: string;
  role: string;
  email: string;
  phone: number;
  teamType?: string;
  teamName: string;
};

export type TeamTypeEncloserProps = {
  teamType?: string;
  teams: MemberCardProps[];
};

export type TeamProps = {
  teamName: string;
  members: MemberCardProps[];
};

export enum TextButtonStatus {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  DISABLED = "DISABLED",
}

export type TextButtonProps = {
  label: string;
  action: () => void;
  status?: TextButtonStatus;
};
