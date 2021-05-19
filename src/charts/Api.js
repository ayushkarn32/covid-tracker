import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const Api = createContext();
export const DataProvider = (props) => {
  const [result, setresult] = useState([]);
  let date_ob = new Date();
  let hours = date_ob.getHours();
  let date = "";
  if (hours < 21) {
    date = parseInt(("0" + date_ob.getDate()).slice(-2), 10) - 1;
  } else {
    date = ("0" + date_ob.getDate()).slice(-2);
  }

  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();

  let fulldate = year + "-" + month + "-" + date;

  const getdata = async () => {
    const response = await axios
      .get(
        `https://portal.edcd.gov.np/rest/api/fetch?filter=casesOfDay&type=dayByDay&eDate=${fulldate}&disease=COVID-19`
      )
      .catch((error) => console.log(error));
    setresult(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  return <Api.Provider value={result}>{props.children}</Api.Provider>;
};
