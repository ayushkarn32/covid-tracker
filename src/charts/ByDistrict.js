import { Api } from "./Api";
import { useContext } from "react";
// import { Pie } from "react-chartjs-2";
import "./charts.css";

export default function App(props) {
  const result = useContext(Api);
  const district = ["BARA"];
  console.log(district);
  // const chart = {
  //   labels: state,
  //   datasets: [
  //     {
  //       label: "New Infected",
  //       backgroundColor: "rgb(255, 99, 132)",
  //       borderColor: "rgb(255, 99, 132)",
  //       data: province,
  //       parsing: {
  //         yAxisKey: "total"
  //       }
  //     }
  //   ]
  // };
  return (
    <div className="box">
      {result.length === 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        // <Bar data={chart} />
        <div></div>
      )}
    </div>
  );
}
