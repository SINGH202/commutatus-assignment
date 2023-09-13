import { createContext, useContext, useState } from "react";
import { MembersProviderProps, MembersContextType } from "../../types";

const MembersContext: any = createContext<MembersContextType>(
  {} as MembersContextType
);

export const useMembersContext = () => {
  return useContext<MembersContextType>(MembersContext);
};

export const MembersProvider = (props: MembersProviderProps) => {
  const { children } = props;

  const [data, setData] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const defaultContext: MembersContextType = {
    ...props,
    data,
    setData,
    isLoading,
    setIsLoading,
  };
  return (
    <MembersContext.Provider value={defaultContext}>
      {children}
    </MembersContext.Provider>
  );
};
