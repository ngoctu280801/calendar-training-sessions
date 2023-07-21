import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";

const ContainerList = ({ weekDays = [] }) => {
  const sessions = useSelector((state) => state.sessions);
  return (
    <div className="flex gap-2 w-full justify-between">
      {weekDays?.length > 0 &&
        weekDays?.map((day) => {
          const curDay = sessions.filter((item) => item.date === day.dateStamp);

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
