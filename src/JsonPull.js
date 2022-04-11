import React from "react";
import axios from "axios";

function JsonPull({ location, setFilteredData, filteredData }) {
  const [allData, setAllData] = React.useState([]);
  // const [filteredData, setFilteredData] = React.useState(allData);

  React.useEffect(() => {
    axios.get("mock_data.json").then((response) => {
      // console.log(response.data);
      console.log(location);
      setAllData(response.data);
      let matchingData = [];
      // let chosenState = "AZ";
      let chosenState = location;
      matchingData = response.data.filter((data) => {
        // console.log(data.state);
        if (!chosenState) return data.state;
        return data.state === chosenState;
      });

      setFilteredData(matchingData);
      // setFilteredData(response.data);
    });
  }, [location, setFilteredData]);

  // if (!post) return null;

  return (
    <div className="Json-pull">
      <div className="App-json-output">
        <div className="json-output">
          {/* <p>This is the json pull</p> */}
          {filteredData.map((value, index) => {
            return (
              <div
                style={{
                  border: "1px white solid",
                  margin: "10px",
                  padding: "5px",
                }}
                key={value.id}
              >
                <img src={value.biz_thumbnail} alt={value.business_name} />
                <p>{value.business_name}</p>
                <p>{value.address}</p>
                <p>
                  {value.city}, {value.state}
                </p>
                <p>{value.user_handle}</p>
                <p>{value.phone}</p>
                <p>{value.url}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default JsonPull;

// make this take location as prop
// rename all state stuff as location
// set a default state?
// export state from dropdown
// pass down state to here
// set a filter like this for the location https://www.codegrepper.com/code-examples/javascript/how+to+use+axios+filter
