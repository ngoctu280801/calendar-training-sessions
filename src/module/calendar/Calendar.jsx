import moment from "moment";
import React from "react";

const Calendar = ({
  goToPreviousWeek = () => {},
  goToNextWeek = () => {},
  goToToday = () => {},
  startDate,
}) => {
  const formattedDate = moment(startDate).format(" MMMM, YYYY");
  return (
    <div className="flex mb-4 items-center justify-center gap-4">
      <div className="flex gap-2 ">
        <Item onClick={goToPreviousWeek}>Previous week</Item>
        <Item onClick={goToToday}>Current week</Item>
        <Item onClick={goToNextWeek}>Next week</Item>
      </div>
      <div className="text-xl font-semibold ">{formattedDate}</div>
    </div>
  );
};
const Item = ({ children, onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="rounded-md border border-gray-100 p-2 cursor-pointer hover:bg-gray-100"
    >
      {children}
    </div>
  );
};

export default Calendar;
