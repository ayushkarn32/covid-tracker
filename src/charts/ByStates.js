import axios from "axios";
import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./charts.css";

export default function App(props) {
  console.log(props);
  const [result, setresult] = useState([]);
  const state = [
    "Province 1",
    "Province 2",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpaschim"
  ];

  const getdata = async () => {
    const response = await axios
      .get(
        `https://portal.edcd.gov.np/rest/api/fetch?filter=casesOfDay&type=dayByDay&eDate=2021-05-15&disease=COVID-19`
      )
      .catch((error) => console.log(error));
    setresult(response.data);
  };
  useEffect(() => {
    getdata();
  }, []);
  const province = [];
  for (let i = 0; i < state.length; i++) {
    let currentTotal = 0;
    for (let j = 0; j < result.length; j++) {
      if (state[i] === result[j]["Province"]) {
        currentTotal += parseInt(result[j]["Value"]);
      }
    }
    if (currentTotal) {
      province.push({
        x: state[i],
        total: currentTotal
      });
    }
  }
  const chart = {
    labels: state,
    datasets: [
      {
        label: "New Infected",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: province,
        parsing: {
          yAxisKey: "total"
        }
      }
    ]
  };
  return (
    <div className="box">
      <Bar data={chart} />
    </div>
  );
}
