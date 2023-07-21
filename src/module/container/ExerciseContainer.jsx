import React from "react";

const ExerciseContainer = () => {
  return (
    <div className="mx-[1px] border border-gray-200 rounded-md p-1 shadow-sm cursor-pointer hover:bg-gray-100">
      <p className="text-right font-bold text-sm">Exercise A</p>
      <div className="flex justify-between gap-4 text-[12px] text-gray-500">
        <div className="font-semibold">3x</div>
        <div>40 lbx5</div>
      </div>
    </div>
  );
};

export default ExerciseContainer;
