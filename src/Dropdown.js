import React from "react";
import axios from "axios";

const Dropdown = ({ setLocation }) => {
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value);
    setLocation(event.target.value);
  };

  const [stateList, setStateList] = React.useState(null);

  React.useEffect(() => {
    axios.get("states.json").then((response) => {
      //   console.log(response.data);
      setStateList(response.data);
    });
  }, []);

  if (!stateList) return null;

  return (
    <div>
      <label>
        Select your state
        <br />
        <select value={value} onChange={handleChange}>
          {stateList.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      {/* <p>Current state: {value}!</p> */}
    </div>
  );
};

export default Dropdown;
