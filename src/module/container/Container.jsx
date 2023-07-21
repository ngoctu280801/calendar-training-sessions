import React, { useEffect, useState } from "react";
import TrainingContainer from "./TrainingContainer";
import moment from "moment";
import usePopup from "../../hooks/usePopup";
import AddExcModal from "../../components/modal/AddExcModal";
import BasicModal from "../../components/modal/BasicModal";
import { SessionProvider } from "../../context/sessionContext";

const Container = ({ day = {}, data = {} }) => {
  const weekDayName = day?.weekDayName.slice(0, 3) || "";
  const date = day?.date;
  const currentDate = moment();
  const startOfDay = currentDate.startOf("day");
  const timestamp = startOfDay.valueOf();

  const [sessionList, setSessionList] = useState([]);
  const { open, handleOpenPopup, handleClosePopup } = usePopup();
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const { sessions } = data;
      setSessionList(sessions);
    }
  }, [data]);

  return (
    <SessionProvider>
      <AddExcModal open={open} handleClose={handleClosePopup} />
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
                <TrainingContainer
                  key={session.id}
                  session={session}
                  date={data.date}
                  handleOpenExcModal={handleOpenPopup}
                />
              ))}
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default Container;
