import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DataContext } from "./DataContext";

export const DataProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState({
    personal: {
      name: "",
      title: "",
      contact: { place: "", email: "", phone: "", websites: [] },
    },
    profile: [],
    technologies: {},
    experience: [],
    educationT: [],
    skillsT: [],
    languages: [],
    labels: {},
  });

  useEffect(() => {
    const allData = t("cv", { returnObjects: true });
    setData(allData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
