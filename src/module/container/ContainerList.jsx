import React from "react";
import Container from "./Container";
import { useSelector } from "react-redux";
import { SessionProvider } from "../../context/sessionContext";
import AddSessionModal from "../../components/modal/AddSessionModal";
import usePopup from "../../hooks/usePopup";
import { DragDropContext } from "react-beautiful-dnd";
import {
  cutElementAt,
  insertElementAt,
  swapElements,
} from "../../utils/fileHelper";
import { useDispatch } from "react-redux";
import { changeSession } from "../../redux-toolkit/sessionSlice";

const ContainerList = ({ weekDays = [] }) => {
  const sessions = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const { open, handleOpenPopup, handleClosePopup } = usePopup();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const destinationDrop = Number(result.destination.droppableId);
    const sourceDrop = Number(result.source.droppableId);

    const destinationIndex = result.destination.index;

    const sourceIndex = result.source.index;
    if (destinationDrop === sourceDrop && destinationIndex === sourceIndex)
      return;
    console.log(result);
    const items = Array.from(sessions);

    if (destinationDrop === sourceDrop) {
      const curDay = sessions.filter(
        (item) => item.date === destinationDrop
      )[0];
      if (curDay?.sessions) {
        const { sessions: curSessions } = curDay;

        const newSessions = swapElements(
          curSessions,
          sourceIndex,
          destinationIndex
        );
        const newItems = items.map((item) => {
          if (item.date === destinationDrop) {
            return { ...item, sessions: newSessions };
          }
          return item;
        });

        dispatch(changeSession(newItems));
      }
    } else {
      const nextDay = sessions.filter(
        (item) => item.date === destinationDrop
      )[0];
      const prevDay = sessions.filter((item) => item.date === sourceDrop)[0];
      const prevSessions = prevDay.sessions;

      const { cutElement, modifiedArray } = cutElementAt(
        prevSessions,
        sourceIndex
      );
      const modified = items?.map((item) => {
        if (item.date === sourceDrop) {
          return {
            ...item,
            sessions: modifiedArray,
          };
        }
        return item;
      });

      if (!nextDay) {
        modified.push({ date: destinationDrop, sessions: [cutElement] });
        dispatch(changeSession(modified));
        return;
      } else if (nextDay.sessions.length === 0) {
        const newArr = modified.map((item) => {
          if (item.date === destinationDrop) {
            return { ...item, sessions: [cutElement] };
          }
          return item;
        });
        dispatch(changeSession(newArr));
        return;
      } else {
        const newArr = modified.map((item) => {
          if (item.date === destinationDrop) {
            return {
              ...item,
              sessions: insertElementAt(
                item.sessions,
                destinationIndex,
                cutElement
              ),
            };
          }
          return item;
        });
        dispatch(changeSession(newArr));
        return;
      }
    }
  };

  return (
    <SessionProvider>
      <div className="flex gap-2 w-full justify-between">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {weekDays?.length > 0 &&
            weekDays?.map((day) => {
              const curDay = sessions.filter(
                (item) => item.date === day.dateStamp
              );
              return (
                <Container
                  key={day.dateStamp}
                  day={day}
                  data={curDay.length > 0 ? curDay[0] : {}}
                  handleOpenAddSection={handleOpenPopup}
                />
              );
            })}
        </DragDropContext>
      </div>
      <AddSessionModal open={open} handleClose={handleClosePopup} />
    </SessionProvider>
  );
};

export default ContainerList;
