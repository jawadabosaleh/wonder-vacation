import React, { useContext, useEffect } from "react";
import getVacations from "../../api/vacation/allVacations";

import CanvasJSReact from "../../utils/canvasjs.react";
import { tokenContext, VacationContext } from "../../shared/context";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = () => {
  const { vacations, setVacations } = useContext(VacationContext);
  const { token } = useContext(tokenContext);

  useEffect(() => {
    getVacations(token).then((res) => {
      setVacations(res.data);
    });
  }, [setVacations, token]);

  var data = [];
  if (vacations) {
    vacations.map((item) => {
      if (item.followers > 0) {
        return data.push({
          label: item.description,
          y: item.followers,
        });
      }
      return data;
    });
  }
  const options = {
    height: 260,
    width: 1000,
    title: {
      text: "Basic Column Chart in React",
    },
    data: [
      {
        type: "column",
        dataPoints: data,
      },
    ],
  };
  return (
    <div className="container">
      <div className="row" style={{ padding: "5em" }}>
        <div className="center">
          <CanvasJSChart options={options} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
