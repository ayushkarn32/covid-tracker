export default function Cards(props) {
  
  const {
    today_death,
    today_recovered,
    today_newcase,
    deaths,
    extra5,
    extra7
  } = props;
  return (
    <div className="main-card">
      <p className="h3">Last 24hr Update</p>
      <div className="card-cont">
        <div className="card card-new">
          <p>New</p>
          {today_newcase}
        </div>
        <div className="card card-recover">
          <p>Recovered</p>
          {today_recovered}
        </div>
        <div className="card card-death">
          <p>Death</p>
          {today_death}
        </div>
      </div>

      <p className="h3">Overall Update</p>
      <div className="card-cont">
        <div className="card card-new">
          <p>Total Infected</p>
          {extra5}
        </div>
        <div className="card card-recover">
          <p>Total Recovered</p>
          {extra7}
        </div>
        <div className="card card-death">
          <p>Total Death</p>
          {deaths}
        </div>
      </div>
    </div>
  );
}
