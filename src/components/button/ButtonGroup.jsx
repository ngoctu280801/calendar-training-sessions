import React from "react";
import Button from "./Button";

const ButtonGroup = ({
  handleClose = () => {},
  handleConfirm = () => {},
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      <Button className="border border-gray-500" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        type="submit"
        className={`bg-blue-500 text-white ${
          disabled && "hover:cursor-no-drop opacity-50"
        }`}
        //   onClick={handleClose}
        onClick={() => {
          if (!disabled) {
            handleConfirm();
            handleClose();
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ButtonGroup;
