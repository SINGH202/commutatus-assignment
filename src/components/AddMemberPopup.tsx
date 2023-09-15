import { useState } from "react";
import { AddMemberPopupProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidEmail } from "../../utils";
import { InputWithLabel } from "./InputWithLabel";
import { useMembersContext } from "@/context/MembersContext";
const { v4: uuidv4 } = require("uuid");

export const AddMemberPopup = ({
  teamName,
  teamType,
  close,
}: AddMemberPopupProps) => {
  const { data, setData } = useMembersContext();
  const type = teamType?.toLocaleLowerCase() || "";

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
    teamName: teamName,
    teamType: type,
    role: "Member",
  });

  const isFormValid = () => {
    return (
      formData?.name !== "" &&
      formData?.phone !== "" &&
      formData?.email !== "" &&
      isValidEmail(formData?.email)
    );
  };

  const handleAddData = () => {
    const newData = [...data, formData];

    setData(newData);
    localStorage.setItem("members_data", JSON.stringify(newData));
    close();
  };

  return (
    <div className="flex flex-col items-center p-10 gap-5 popup opacity-90 text-black">
      <div className="flex text-black w-full gap-2">
        <span>Team Name : </span>
        <span className="font-semibold font-mono">{teamName}</span>
      </div>

      <div className="border border-gray-400 w-full"></div>
      <InputWithLabel
        label={"Name"}
        placeholder={"Enter Team Member Name"}
        type={"text"}
        onChange={(value) => {
          setFormData({ ...formData, name: value.target.value });
        }}
        value={formData?.name}
      />
      <InputWithLabel
        label={"Email"}
        placeholder={"Enter Team Member Email"}
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
          action={() => {}}
        />
        <TextButton
          status={
            isFormValid() ? TextButtonStatus.PRIMARY : TextButtonStatus.DISABLED
          }
          label={"Add"}
          action={() => {
            isFormValid() && handleAddData();
          }}
        />
      </div>
    </div>
  );
};
