import React from "react";
import TrainingContainer from "./TrainingContainer";
import moment from "moment";

const Container = ({ day = {} }) => {
  const weekDayName = day?.weekDayName.slice(0, 3) || "";
  const date = day?.date;

  const currentDate = moment();
  const startOfDay = currentDate.startOf("day");
  const timestamp = startOfDay.valueOf();

  return (
    <div className="w-full">
      <div className="uppercase mb-2 text-[12px] font-semibold text-gray-500">
        {weekDayName}
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <p
          className={`text-sm text-gray-500 font-semibold ${
            timestamp === day.dateStamp && "text-purple-600"
          }`}
        >
          {date}
        </p>
        <div className="flex flex-col gap-2">
          <TrainingContainer />
          <TrainingContainer />
        </div>
      </div>
    </div>
  );
};

export default Container;
