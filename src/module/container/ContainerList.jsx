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
import { DND_TYPE } from "../../common/constant";

const ContainerList = ({ weekDays = [] }) => {
  const sessions = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const { open, handleOpenPopup, handleClosePopup } = usePopup();
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sessions);

    if (result.type === DND_TYPE.SESSIONS) {
      const destinationDrop = Number(result.destination.droppableId);
      const sourceDrop = Number(result.source.droppableId);

      const destinationIndex = result.destination.index;

      const sourceIndex = result.source.index;
      if (destinationDrop === sourceDrop && destinationIndex === sourceIndex)
        return;
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
    } else {
      const des = result.destination.droppableId.split("_");
      const src = result.source.droppableId.split("_");
      const destinationDrop = Number(des[1]);
      const sourceDrop = Number(src[1]);
      const destinationSessionId = des[0];
      const sourceSessionId = src[0];
      const destinationIndex = result.destination.index;
      const sourceIndex = result.source.index;

      if (
        destinationDrop === sourceDrop &&
        destinationSessionId === sourceSessionId &&
        destinationIndex === sourceIndex
      )
        return;

      const srcDay = items.filter((item) => item.date === sourceDrop)[0];
      const srcSession = srcDay?.sessions.filter(
        (session) => session.id + "" === sourceSessionId
      )[0];
      const { exercises: curExercises } = srcSession;
      const { cutElement, modifiedArray } = cutElementAt(
        curExercises,
        sourceIndex
      );

      const newItems = items.map((item) => {
        if (item.date === sourceDrop) {
          const { sessions } = item;
          const newSessions = sessions.map((session) => {
            if (
              item.date === destinationDrop &&
              session.id + "" === destinationSessionId
            ) {
              if (session.id + "" === sourceSessionId) {
                const { exercises } = session;
                const newExercises = swapElements(
                  exercises,
                  destinationIndex,
                  sourceIndex
                );
                return { ...session, exercises: newExercises };
              } else {
                const { exercises } = session;
                const newExercises = insertElementAt(
                  exercises,
                  destinationIndex,
                  cutElement
                );
                return { ...session, exercises: newExercises };
              }
            }
            if (session.id + "" === sourceSessionId) {
              return { ...session, exercises: modifiedArray };
            }

            return session;
          });
          return { ...item, sessions: newSessions };
        }
        if (item.date === destinationDrop) {
          const { sessions } = item;
          const newSessions = sessions.map((session) => {
            if (session.id + "" === destinationSessionId) {
              const { exercises } = session;
              const newExercises = insertElementAt(
                exercises,
                destinationIndex,
                cutElement
              );

              return { ...session, exercises: newExercises };
            }
            return session;
          });
          return { ...item, sessions: newSessions };
        }
        return item;
      });

      dispatch(changeSession(newItems));
      // const { cutElement, modifiedArray } = cutElementAt(
      //   prevSessions,
      //   sourceIndex
      // );
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
