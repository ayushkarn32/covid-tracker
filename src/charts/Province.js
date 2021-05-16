import "./charts.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ByStates from "./ByStates";

export default function Province() {
  const [result, setresult] = useState([]);

  const getdata = async () => {
    const response = await axios
      .get(
        `https://portal.edcd.gov.np/rest/api/fetch?filter=casesBetween&type=aggregate&sDate=2021-05-14&eDate=2021-05-15&disease=COVID-19`
      )
      .catch((error) => console.log(error));
    setresult(response);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <div className="head-container">
        <p className="title">Stats by Province</p>
      </div>
      {result == 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <ByStates />
      )}
    </div>
  );
}
