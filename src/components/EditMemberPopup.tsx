import { useEffect, useState } from "react";
import {
  EditMemberPopupProps,
  MemberCardProps,
  TextButtonStatus,
} from "../../types";
import { TextButton } from "./TextButton";
import { InputWithLabel } from "./InputWithLabel";
import { isValidEmail } from "../../utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMembersContext } from "@/context/MembersContext";

export const EditMemberPopup = ({
  teamType,
  close,
  memberData,
}: EditMemberPopupProps) => {
  const { data, setData } = useMembersContext();
  const type = teamType?.toLocaleLowerCase() || "";

  const [formData, setFormData] = useState({
    id: memberData?.id,
    name: memberData?.name,
    email: memberData?.email,
    phone: memberData?.phone,
    teamName: memberData?.teamName,
    role: memberData?.role,
  });

  const updateMemberData = () => {
    const membersData = data[type];
    let memberWithChange = membersData.find(
      (member: MemberCardProps) => member?.id === memberData?.id
    );
    // console.log(memberWithChange);
    const remainingMembers = membersData.filter(
      (member: MemberCardProps) => member?.id !== memberData?.id
    );
    const newData = { ...data, [type]: [...remainingMembers, formData] };
    setData(newData);
    localStorage.setItem("members_data", JSON.stringify(newData));
    close();
  };
  useEffect(() => {
    console.log(memberData?.role);
    // updateMemberData();
  }, []);
  return (
    <div className="flex flex-col items-center p-10 gap-5 popup opacity-90 text-black">
      {/* <InputWithLabel
        label={"Team Name"}
        placeholder={"Enter Team Name"}
        type={"text"}
        onChange={(value) => {
          setFormData({ ...formData, teamName: value.target.value });
        }}
        // isInvalid={isTeamAlreadyExists(formData?.teamName, data[type])}
        errorText="Team already exists"
        value={formData?.teamName}
      /> */}
      {/* <div className="border border-gray-400 w-full"></div> */}
      <InputWithLabel
        label={"Name"}
        placeholder={"Enter Team Lead Name"}
        type={"text"}
        onChange={(value) => {
          setFormData({ ...formData, name: value.target.value });
        }}
        value={formData?.name}
      />
      <InputWithLabel
        label={"Email"}
        placeholder={"Enter Team Lead Email"}
        type={"email"}
        onChange={(value) => {
          setFormData({ ...formData, email: value.target.value });
        }}
        isInvalid={!isValidEmail(formData?.email)}
        errorText="Please check the email"
        value={formData?.email}
      />
      <PhoneInput
        country={"in"}
        value={formData?.phone}
        onChange={(phone) => setFormData({ ...formData, phone: phone })}
        inputStyle={{
          color: "black",
          width: "100%",
        }}
      />
      <div className="flex gap-5 items-center justify-end text-white w-full">
        <TextButton
          status={TextButtonStatus.SECONDARY}
          label={"Close"}
          action={() => {
            close();
          }}
        />
        <TextButton
          label={"Complete"}
          action={() => {
            updateMemberData();
          }}
        />
      </div>
    </div>
  );
};
