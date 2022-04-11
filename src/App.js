import React from "react";
import "./App.css";
import Dropdown from "./Dropdown";
import JsonPull from "./JsonPull";
import Carousel3 from "./Carousel3";

function App() {
  const [location, setLocation] = React.useState("");
  const [filteredData, setFilteredData] = React.useState([]);
  const [selectedBusiness, setSelectedBusiness] = React.useState();
  let classSelectedBusiness;
  const classSelectBusiness = (data) => {
    classSelectedBusiness = data;
    console.log("chosen business is:");
    console.log(classSelectedBusiness);
    setSelectedBusiness(classSelectedBusiness);
  };

  return (
    <div className="App">
      <h1>Business list</h1>
      <h3>
        selected business:{" "}
        {selectedBusiness ? selectedBusiness.business_name : ""}
      </h3>
      <Carousel3
        classSelectBusiness={classSelectBusiness}
        filteredData={filteredData}
      />
      <Dropdown setLocation={setLocation} />
      <p>Current state: {location || "All states"}!</p>
      <JsonPull
        location={location}
        setFilteredData={setFilteredData}
        filteredData={filteredData}
      />
    </div>
  );
}

export default App;
