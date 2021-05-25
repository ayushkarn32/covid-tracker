import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";
import Charts from "./charts/Charts";

export default function App() {
  const [result, setresult] = useState([]);

  const getdata = async () => {
    const response = await axios
      .get(`https://covid19.mohp.gov.np/covid/api/confirmedcases`)
      .catch((error) => console.log(error));
    setresult(response.data.nepal);
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="App">
      <div className="head-container">
        <img src="/img/corona.svg" alt="corona-logo" className="virus" />
        <p className="title">Covid Tracker Nepal</p>
      </div>
      {result.length === 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="body-container">
          <div className="update-box">
            <Cards props={result} {...result} />
          </div>
          <div className="card nospace">
            <div>Emergency Contact</div>
            <div className="contact-box">
              <div>1133 (24 Hours)</div>
              <div>1115 (06:00 AM - 10:00 PM)</div>
              <div> 9851-255-834 | 9851-255-837 (08:00 AM - 08:00 PM)</div>
            </div>
          </div>
        </div>
      )}
      <Charts />
    </div>
  );
}
