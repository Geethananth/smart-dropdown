import React, { useState } from "react";
import SmartDropdown from "../../lib/DropDown";

const Home = () => {
  const [selectedValuesArr, setSelectedValuesArr] = useState([]); // to hold the multi select array values
  const [selectedValues, setSelectedValues] = useState(""); // to hold the single select value

  const multipleOptions = [
    { title: "React", id: "react" },
    { title: "Angular", id: "angular" },
    { title: "Vue", id: "vue" },
    { title: "Ember", id: "ember" },
  ];

  const singleOptions = ["red", "blue", "yellow", "green"];

  return (
    <div className="app">
      <section>
        <h1>Smart dropdown examples</h1>
        <SmartDropdown
          key={"multi-dropdown"}
          items={multipleOptions}
          isMultiSelect
          isShowSearch={false}
          onSelect={(item) => {
            setSelectedValuesArr((_)=> ([...[], ...item]));
          }}
        />
        <SmartDropdown
          key="single-dropdown"
          items={singleOptions}
          onSelect={(item) => setSelectedValues((_)=> item)}
        />

        <div className="dropdown-result">
          <table>
            <tbody>
              <tr>
                <td>Selected values: </td>
                {(selectedValues.length > 0)&& <td>{selectedValues}</td>}
              </tr>
              <tr>
                <td>Selected multi select values: </td>

                {(selectedValuesArr.length > 0) && <td>{selectedValuesArr.join(", ")}</td>}
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Home;
