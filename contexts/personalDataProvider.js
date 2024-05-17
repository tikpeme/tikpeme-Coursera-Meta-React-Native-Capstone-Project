import React, { Children, useState } from "react";

import { createContext } from "react";

const personalDataContext = createContext();

const PersonalDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("Tete");
  const [email, setEmail] = useState("");
  const [onBoardingStatus, setOnBoardingStatus] = useState(false);
  const [image, setImage] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <personalDataContext.Provider
      value={{
        isLoading,
        setIsLoading,
        firstName,
        setFirstName,
        email,
        setEmail,
        onBoardingStatus,
        setOnBoardingStatus,
        image,
        setImage,
        lastName,
        setLastName,
      }}
    >
      {children}
    </personalDataContext.Provider>
  );
};

export { PersonalDataProvider, personalDataContext };
