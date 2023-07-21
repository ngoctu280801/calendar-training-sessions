import React from "react";

const Calendar = () => {
  return (
    <div className="flex gap-2 mb-4 ">
      <Item>Tuần trước</Item>
      <Item>Tuần này</Item>
      <Item>Tuần sau</Item>
    </div>
  );
};
const Item = ({ children }) => {
  return (
    <div className="rounded-md border border-gray-100 p-2 cursor-pointer hover:bg-gray-100">
      {children}
    </div>
  );
};

export default Calendar;
