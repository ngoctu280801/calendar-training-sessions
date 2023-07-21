import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { SessionProvider } from "../../context/sessionContext";
import AddSessionModal from "../../components/modal/AddSessionModal";
import usePopup from "../../hooks/usePopup";

const ContainerList = ({ weekDays = [] }) => {
  const sessions = useSelector((state) => state.sessions);
  const { open, handleOpenPopup, handleClosePopup } = usePopup();

  return (
    <SessionProvider>
      <div className="flex gap-2 w-full justify-between">
        {weekDays?.length > 0 &&
          weekDays?.map((day) => {
            const curDay = sessions.filter(
              (item) => item.date === day.dateStamp
            );
            return (
              <Container
                key={Math.random()}
                day={day}
                data={curDay.length > 0 ? curDay[0] : {}}
                handleOpenAddSection={handleOpenPopup}
              />
            );
          })}
      </div>
      <AddSessionModal open={open} handleClose={handleClosePopup} />
    </SessionProvider>
  );
};

export default ContainerList;
