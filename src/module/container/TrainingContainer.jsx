import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExerciseContainer from "./ExerciseContainer";
import { useSession } from "../../context/sessionContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { changeIndexOfExercise } from "../../redux-toolkit/sessionSlice";
const TrainingContainer = ({
  session = {},
  date,
  handleOpenExcModal = () => {},
}) => {
  const { exercises = [] } = session;
  const { setSessionInfo } = useSession();
  const [exerciseList, setExerciseList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setExerciseList(exercises);
  }, [exercises]);
  const handleOnDragEnd = (result) => {
    console.log(result);
    const items = Array.from(exerciseList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(changeIndexOfExercise({ date, id: session.id, exercises: items }));
  };
  return (
    <div className="bg-white rounded-md border border-gray-200 p-1">
      <div className="flex justify-between items-center">
        <h3 className="uppercase font-semibold text-gray-500 text-[12px]">
          {session.name}
        </h3>
        <div onClick={() => {}}>
          <MoreHorizIcon className="!w-5 !h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId={`${session.id}`}>
          {(provided) => (
            <div
              className="flex flex-col gap-1"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {exerciseList?.length > 0 &&
                exerciseList?.map((exercise, index) => (
                  <Draggable
                    key={exercise.id}
                    draggableId={exercise.id}
                    index={index}
                  >
                    {(provided) => (
                      <ExerciseContainer
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        refItem={provided.innerRef}
                        name={exercise.name}
                        information={exercise.information}
                      />
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
