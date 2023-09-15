import { useEffect, useState } from "react";
import { AddTeamPopupProps, TextButtonStatus } from "../../types";
import { TextButton } from "./TextButton";
import { InputWithLabel } from "./InputWithLabel";
import { useMembersContext } from "@/context/MembersContext";
import { isTeamAlreadyExists, isValidEmail } from "../../utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const { v4: uuidv4 } = require("uuid");

export const AddTeamPopup = ({ close, teamType }: AddTeamPopupProps) => {
  const { data, setData, arrangedData } = useMembersContext();
  const type = teamType?.toLocaleLowerCase() || "";
  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    phone: "",
    teamName: "",
    teamType: type,
    role: "Leader",
  });

  const isFormValid = () => {
    return (
      formData?.name !== "" &&
      formData?.teamName !== "" &&
      formData?.phone !== "" &&
      formData?.email !== "" &&
      isValidEmail(formData?.email) &&
      !isTeamAlreadyExists(formData?.teamName, arrangedData[type])
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
      <InputWithLabel
        label={"Team Name"}
        placeholder={"Enter Team Name"}
        type={"text"}
        onChange={(value) => {
          setFormData({ ...formData, teamName: value.target.value });
        }}
        isInvalid={isTeamAlreadyExists(formData?.teamName, arrangedData[type])}
        errorText="Team already exists"
        value={formData?.teamName}
      />
      <div className="border border-gray-400 w-full"></div>
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
