import React from "react";
import TrainingContainer from "./TrainingContainer";

const Container = () => {
  return (
    <div className="w-full">
      <div className="uppercase mb-2 text-[12px] font-semibold text-gray-500">
        mon
      </div>
      <div className="bg-gray-50 rounded-lg p-2">
        <p className="text-sm text-gray-500 font-semibold">05</p>
        <div className="flex flex-col gap-2">
          <TrainingContainer />
          <TrainingContainer />
        </div>
      </div>
    </div>
  );
};

export default Container;
