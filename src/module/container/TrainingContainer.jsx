import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExerciseContainer from "./ExerciseContainer";
import { useSession } from "../../context/sessionContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { changeIndexOfExercise } from "../../redux-toolkit/sessionSlice";
import uuid from "react-uuid";
import { DND_TYPE } from "../../common/constant";
const TrainingContainer = ({
  session = {},
  date,
  handleOpenExcModal = () => {},
  provided,
  snapshot,
  refItem,
  ...props
}) => {
  const { exercises = [] } = session;
  const { setSessionInfo } = useSession();
  const [exerciseList, setExerciseList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setExerciseList(exercises);
  }, [exercises]);

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      style={{
        backgroundColor: snapshot.isDragging ? "#F5FFFA" : "#fff",

        ...provided.draggableProps.style,
      }}
      className="bg-white rounded-md border border-gray-200 p-1"
      {...props}
    >
      <div
        {...provided.dragHandleProps}
        className="flex justify-between items-center"
      >
        <h3 className="uppercase font-semibold text-gray-500 text-[12px]">
          {session.name}
        </h3>
        <div onClick={() => {}}>
          <MoreHorizIcon className="!w-5 !h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* here */}
      <Droppable
        type={DND_TYPE.EXERCISES}
        droppableId={`${session.id}_${date}`}
        key={`${session.id}_${date}`}
      >
        {(provided, snapshot) => (
          <div
            className="flex flex-col gap-1"
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "",
            }}
          >
            {exerciseList?.length > 0 &&
              exerciseList?.map((exercise, index) => (
                <Draggable
                  key={`${exercise.id}`}
                  draggableId={`${exercise.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ExerciseContainer
                      // key={uuid()}
                      name={exercise.name}
                      information={exercise.information}
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

      <div
        className="text-right"
        onClick={() => {
          setSessionInfo({ date, id: session.id });
          handleOpenExcModal();
        }}
      >
        <AddCircleIcon className="text-gray-400 !h-5 cursor-pointer hover:opacity-75" />
      </div>
    </div>
  );
};

export default TrainingContainer;
