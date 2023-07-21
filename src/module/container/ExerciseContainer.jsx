import React from "react";

const ExerciseContainer = ({
  name = "",
  information = [],
  refItem,
  ...props
}) => {
  const infos = information.join(", ");
  return (
    <div
      ref={refItem}
      {...props}
      className="mx-[1px] border border-gray-200 rounded-md p-1 shadow-sm cursor-pointer hover:bg-gray-100"
    >
      <p className="text-right font-bold text-sm">{name}</p>
      <div className="flex justify-between gap-4 text-[12px] text-gray-500">
        <div className="font-semibold">{information?.length || 0}x</div>
        <div>{infos}</div>
      </div>
    </div>
  );
};

export default ExerciseContainer;
