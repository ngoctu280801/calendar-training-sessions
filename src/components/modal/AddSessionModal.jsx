import React, { useState } from "react";
import BasicModal from "./BasicModal";
import { TextField } from "@mui/material";
import ButtonGroup from "../button/ButtonGroup";
import { useDispatch } from "react-redux";
import { useSession } from "../../context/sessionContext";
import { addSession } from "../../redux-toolkit/sessionSlice";

const AddSessionModal = ({ open = false, handleClose = () => {} }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { sessionInfo } = useSession();
  const handleAddSession = () => {
    dispatch(addSession({ date: sessionInfo.date, name }));
    setName("");
  };
  return (
    <BasicModal
      open={open}
      handleClose={() => {
        handleClose();
        setName("");
      }}
    >
      <div className="w-[500px]">
        <h2 className="font-bold text-xl text-center">Add Session</h2>
        <TextField
          className="!my-4 w-full"
          label="Session name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <ButtonGroup
          handleClose={() => {
            handleClose();
            setName("");
          }}
          // className="mt-2"
          disabled={name === ""}
          handleConfirm={() => {
            handleAddSession();
            handleClose();
          }}
        />
      </div>
    </BasicModal>
  );
};

export default AddSessionModal;
