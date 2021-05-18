import { Bar } from "react-chartjs-2";
import { Api } from "./Api";
import { useContext } from "react";
import "./charts.css";

export default function App() {
  const result = useContext(Api);
  const state = [
    "Province 1",
    "Province 2",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpaschim"
  ];

  const province = [];
  for (let i = 0; i < state.length; i++) {
    let currentTotal = 0;
    for (let j = 0; j < result.length; j++) {
      if (state[i] === result[j]["Province"]) {
        currentTotal += parseInt(result[j]["Value"], 10);
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
      {result.length === 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Bar data={chart} />
      )}
    </div>
  );
}
