import { Api } from "./Api";
import { useContext } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFemale, faMale } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const result = useContext(Api);
  const [stats, setstats] = useState([]);
  const [finaldata, setfinaldata] = useState("");
  //district list
  const dist_lowercase = [
    "Achham",
    "Arghakhanchi",
    "Baglung",
    "Baitadi",
    "Bajhang",
    "Bajura",
    "Banke",
    "Bara",
    "Bardiya",
    "Bhaktapur",
    "Bhojpur",
    "Chitawan",
    "Dadeldhura",
    "Dailekh",
    "Dang",
    "Darchula",
    "Dhading",
    "Dhankuta",
    "Dhanusa",
    "Dolakha",
    "Dolpa",
    "Doti",
    "Gorkha",
    "Gulmi",
    "Humla",
    "Ilam",
    "Jajarkot",
    "Jhapa",
    "Jumla",
    "Kailali",
    "Kalikot",
    "Kanchanpur",
    "Kapilbastu",
    "Kaski",
    "Kathmandu",
    "Kavrepalanchok",
    "Khotang",
    "Lalitpur",
    "Lamjung",
    "Mahottari",
    "Makwanpur",
    "Manang",
    "Morang",
    "Mugu",
    "Mustang",
    "Myagdi",
    "Nawalparasi West",
    "Nuwakot",
    "Okhaldhunga",
    "Palpa",
    "Panchthar",
    "Parbat",
    "Parsa",
    "Pyuthan",
    "Ramechhap",
    "Rasuwa",
    "Rautahat",
    "Rolpa",
    "Rukum East",
    "Rukum West",
    "Rupandehi",
    "Salyan",
    "Sankhuwasabha",
    "Saptari",
    "Sarlahi",
    "Sindhuli",
    "Sindhupalchok",
    "Siraha",
    "Solukhumbu",
    "Sunsari",
    "Surkhet",
    "Syangja",
    "Tanahu",
    "Taplejung",
    "Terhathum",
    "Udayapur"
  ];
  const district = dist_lowercase.map((name) => name.toUpperCase());

  //storing the required data

  const dist_data = [];
  for (let i = 0; i < district.length; i++) {
    let currentTotal = 0;
    let tmale = 0;
    let tfemale = 0;
    for (let j = 0; j < result.length; j++) {
      if (district[i] === result[j]["District"].replace(/^[\s\d]+/, "")) {
        currentTotal += parseInt(result[j]["Value"], 10);
        if (result[j]["Sex"] === "Male") {
          tmale += parseInt(result[j]["Value"], 10);
        }
        if (result[j]["Sex"] === "Female") {
          tfemale += parseInt(result[j]["Value"], 10);
        }
      }
    }
    if (currentTotal) {
      dist_data.push({
        name: district[i],
        total: currentTotal,
        male: tmale,
        female: tfemale
      });
    }
  }

  //getting value from text box
  const get_from_box = (event) => {
    const text = event.target.value;
    if (district.includes(text)) {
      setfinaldata(text);
    }
  };

  //updating state of the obtained value from text box
  const clicked = () => {
    const dist_array = [];
    // dist_data_total=dist_data.find((x) => x.name === finaldata)
    // dist_data_male=dist_data_total.male
    const dist_data_total = dist_data.find((x) => x.name === finaldata).total;
    const dist_data_male = dist_data.find((x) => x.name === finaldata).male;
    const dist_data_female = dist_data.find((x) => x.name === finaldata).female;
    dist_array.push(dist_data_total, dist_data_male, dist_data_female);
    setstats(dist_array);
  };
  // console.log(stats)
  //creating chart for district chart

  const chart = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "New Infected",
        data: [stats[1], stats[2]],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)"
        ],
        hoverOffset: 4
      }
    ]
  };
  return (
    <div>
      {dist_data === 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <p className="h3">Search by District </p>
          <div className="district-box">
            <input
              type="text"
              className="list-district"
              list="list-district"
              onChange={get_from_box}
            />
            <datalist id="list-district">
              {district.map((dlist) => {
                return (
                  <option key={dlist} value={dlist}>
                    {dlist}
                  </option>
                );
              })}
            </datalist>
            <button className="search" onClick={clicked}>
              Submit
            </button>
          </div>
          <div className="result-box">
            {stats.length === 0 ? (
              <span></span>
            ) : (
              <div className="result-container">
                <div className="left-result">
                  <div className="card fullbox">
                    <div className="spaced">{finaldata}</div>
                    <div className="spaced">Total</div>
                    <div className="spaced">{stats[0]}</div>
                  </div>
                  <div className="card-cont">
                    <div className="card nospace">
                      <p>Male</p>
                      <div>
                        <FontAwesomeIcon icon={faMale} />
                      </div>
                      {stats[1]}{" "}
                    </div>
                    <div className="card nospace">
                      <p>Female</p>
                      <div>
                        <FontAwesomeIcon icon={faFemale} />
                      </div>
                      {stats[2]}{" "}
                    </div>
                  </div>
                </div>
                <div className="right-result">
                  <Pie data={chart} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
