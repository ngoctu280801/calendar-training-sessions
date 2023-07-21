import React, { useEffect, useState } from "react";
import TrainingContainer from "./TrainingContainer";
import moment from "moment";

const Container = ({ day = {}, data = {} }) => {
  const weekDayName = day?.weekDayName.slice(0, 3) || "";
  const date = day?.date;
  const currentDate = moment();
  const startOfDay = currentDate.startOf("day");
  const timestamp = startOfDay.valueOf();

  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const { sessions } = data;
      setSessionList(sessions);
      console.log(
        "🚀 ~ file: Container.jsx:18 ~ useEffect ~ sessions:",
        sessions
      );
    }
  }, [data]);

  return (
    <div className="w-full ">
      <div className="uppercase mb-2 text-[12px] font-semibold text-gray-500 shadow-sm">
        {weekDayName}
      </div>
      <div className="bg-gray-50 rounded-lg p-2 h-[calc(100vh-160px)] shadow-md">
        <p
          className={`text-sm text-gray-500 font-semibold ${
            timestamp === day.dateStamp && "text-purple-600"
          }`}
        >
          {date}
        </p>
        <div className="flex flex-col gap-2">
          {sessionList?.length > 0 &&
            sessionList.map((session) => (
              <TrainingContainer key={session.id} session={session} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Container;
