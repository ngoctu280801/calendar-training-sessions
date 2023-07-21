import React from "react";
import Container from "./Container";

const ContainerList = ({ weekDays = [], data = [] }) => {
  return (
    <div className="flex gap-2 w-full justify-between">
      {weekDays?.length > 0 &&
        weekDays?.map((day) => {
          const curDay = data.filter((item) => item.date === day.dateStamp);

          return (
            <Container
              key={Math.random()}
              day={day}
              data={curDay.length > 0 ? curDay[0] : {}}
            />
          );
        })}
    </div>
  );
};

export default ContainerList;
