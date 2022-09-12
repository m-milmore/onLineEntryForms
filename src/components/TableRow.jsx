import React, { useState, useEffect } from "react";
import RegSelect from "./RegSelect";
import Division from "./Division";
import { levels, ages, smooth, rhythm, ballroom, latin } from "../constants";
import { appEmitter } from "../App";

const TableRow = ({ syllabus }) => {
  const [comps, setComps] = useState({
    level: "",
    age: "",
    categories: [],
  });

  useEffect(() => {
    const onUpdateComps = ({dance, danceStyle, syllabus, newSelect: select}) => {
      const comp = {
        dance,
        danceStyle,
        syllabus,
      };

      const categories = select
        ? [...comps.categories, comp]
        : comps.categories.filter(
            (obj) =>
              !(
                obj.dance === comp.dance &&
                obj.danceStyle === comp.danceStyle &&
                obj.syllabus === comp.syllabus
              )
          );
					console.log(categories)

      setComps((prev) => ({
        ...prev,
        categories: categories,
      }));
    };

    const compListener = appEmitter.addListener("comp", onUpdateComps);

    return () => {
      compListener.remove();
    };
  }, [setComps, comps.categories]);

  const dances = comps.categories.length;

  return (
    <tr>
      <td style={{ border: "1px solid black" }}>
        <RegSelect options={levels} setState={setComps} name="level" />
      </td>
      <td style={{ border: "1px solid black" }}>
        <RegSelect options={ages} setState={setComps} name="age" />
      </td>
      <Division division={smooth} syllabus={syllabus} danceStyle="smooth" />
      <Division division={rhythm} syllabus={syllabus} danceStyle="rhythm" />
      <Division division={ballroom} syllabus={syllabus} danceStyle="ballroom" />
      <Division division={latin} syllabus={syllabus} danceStyle="latin" />
      <td style={{ border: "1px solid black" }}>{dances}</td>
    </tr>
  );
};

export default TableRow;
