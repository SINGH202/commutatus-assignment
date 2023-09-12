import { MemberCardProps } from "../../types";

export const MemberCard = ({ name, role, phone, email }: MemberCardProps) => {
  return (
    <div className="flex flex-col gap-1.5 shadow-lg border bg-white max-w-xs px-4 py-1 rounded-md">
      <span className="text-lg font-medium">name</span>
      <span className="text-lg font-semibold">Position</span>
      <span>mail</span>
      <span>Phone no.</span>
    </div>
  );
};
