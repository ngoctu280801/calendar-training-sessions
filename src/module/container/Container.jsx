import React, { useEffect, useState } from "react";
import TrainingContainer from "./TrainingContainer";
import moment from "moment";
import usePopup from "../../hooks/usePopup";
import AddExcModal from "../../components/modal/AddExcModal";
import BasicModal from "../../components/modal/BasicModal";
import { SessionProvider, useSession } from "../../context/sessionContext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { changeSessionInDay } from "../../redux-toolkit/sessionSlice";
import uuid from "react-uuid";
import { DND_TYPE } from "../../common/constant";
const Container = ({
  day = {},
  data = {},
  handleOpenAddSection = () => {},
}) => {
  const weekDayName = day?.weekDayName.slice(0, 3) || "";
  const date = day?.date;
  const currentDate = moment();
  const startOfDay = currentDate.startOf("day");
  const timestamp = startOfDay.valueOf();
  const { setSessionInfo } = useSession();
  const [sessionList, setSessionList] = useState([]);
  const { open, handleOpenPopup, handleClosePopup } = usePopup();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const { sessions } = data;
      setSessionList(sessions);
    }
  }, [data]);

  return (
    <>
      <AddExcModal open={open} handleClose={handleClosePopup} />
      <div className="w-full ">
        <div className="flex items-center justify-between  mb-2">
          <div className="uppercase text-[12px] font-semibold text-gray-500 shadow-sm">
            {weekDayName}
          </div>
          <div
            className="text-right mr-4"
            onClick={() => {
              setSessionInfo({ date: day.dateStamp });
              handleOpenAddSection();
            }}
          >
            <AddCircleIcon className="text-gray-400 !h-5 cursor-pointer hover:opacity-75" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-2  shadow-md">
          <p
            className={`text-sm text-gray-500 font-semibold ${
              timestamp === day.dateStamp && "text-purple-600 !font-bold"
            }`}
          >
            {date}
          </p>
          <Droppable
            type={DND_TYPE.SESSIONS}
            droppableId={`${day.dateStamp}`}
            key={`${day.dateStamp}`}
          >
            {(provided, snapshot) => (
              <div
                className="flex flex-col gap-2 min-h-[calc(100vh-160px)]"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "",
                }}
              >
                {sessionList?.length > 0 &&
                  sessionList.map((session, index) => (
                    <Draggable
                      key={`session${session.id}`}
                      draggableId={`session${session.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TrainingContainer
                          session={session}
                          date={data.date}
                          handleOpenExcModal={handleOpenPopup}
                          provided={provided}
                          snapshot={snapshot}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </>
  );
};

export default Container;
