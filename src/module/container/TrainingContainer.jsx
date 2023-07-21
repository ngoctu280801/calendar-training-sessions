import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExerciseContainer from "./ExerciseContainer";
const TrainingContainer = () => {
  return (
    <div className="bg-white rounded-md border border-gray-200 p-1">
      <div className="flex justify-between items-center">
        <h3 className="uppercase font-semibold text-gray-500 text-[12px]">
          LEG DAY
        </h3>
        <div onClick={() => {}}>
          <MoreHorizIcon className="!w-5 !h-5 text-gray-500 cursor-pointer" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <ExerciseContainer />
        <ExerciseContainer />
        <ExerciseContainer />
      </div>
      <div className="text-right">
        <AddCircleIcon className="text-gray-400 !h-5 cursor-pointer hover:opacity-75" />
      </div>
    </div>
  );
};

export default TrainingContainer;
