import "./charts.css";
import { DataProvider } from "./Api";
import ByStates from "./ByStates";
import ByDistrict from "./ByDistrict";

export default function Province() {
  return (
    <div className="App">
      <div className="head-container">
        <p className="title">Stats by Province</p>
      </div>

      <DataProvider>
        <div>
          <ByStates />
        </div>
        <div>
          <ByDistrict />
        </div>
      </DataProvider>
    </div>
  );
}
