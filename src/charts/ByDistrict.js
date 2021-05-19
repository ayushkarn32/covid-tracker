import { Api } from "./Api";
import { useContext } from "react";
import { useState } from "react";
// import { Bar, Pie } from "react-chartjs-2";

export default function App() {
  const result = useContext(Api);
  const [stats, setstats] = useState([]);
  const [finaldata, setfinaldata] = useState("");
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

  const get_from_box = (event) => {
    const text = event.target.value;
    if (district.includes(text)) {
      setfinaldata(text);
    }
  };

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

  return (
    <div>
      {dist_data === 0 ? (
        <div className="container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="district-box">
          <p className="h3">District Wise Satistics </p>
          <div>
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
              <div>
                <span>Total:{stats[0]} </span>
                <span>Male :{stats[1]} </span>
                <span>Female :{stats[2]} </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
