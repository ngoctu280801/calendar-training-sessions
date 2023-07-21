import React from "react";
import Container from "./Container";

const ContainerList = ({ weekDays = [] }) => {
  return (
    <div className="flex gap-2 w-full justify-between">
      {weekDays?.length > 0 &&
        weekDays?.map((day) => <Container key={Math.random()} day={day} />)}
    </div>
  );
};

export default ContainerList;
