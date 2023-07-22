import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExerciseContainer from "./ExerciseContainer";
import { useSession } from "../../context/sessionContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { changeIndexOfExercise } from "../../redux-toolkit/sessionSlice";
import uuid from "react-uuid";
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
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(exerciseList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeIndexOfExercise({ date, id: session.id, exercises: items }));
  };
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: snapshot.isDragging ? "#F5FFFA" : "#fff",

        ...provided.draggableProps.style,
      }}
      className="bg-white rounded-md border border-gray-200 p-1"
      {...props}
    >
      <div className="flex justify-between items-center">
        <h3 className="uppercase font-semibold text-gray-500 text-[12px]">
          {session.name}
        </h3>
        <div onClick={() => {}}>
          <MoreHorizIcon className="!w-5 !h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        {exerciseList?.length > 0 &&
          exerciseList?.map((exercise, index) => (
            <ExerciseContainer
              key={uuid()}
              name={exercise.name}
              information={exercise.information}
            />
          ))}
      </div>
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
