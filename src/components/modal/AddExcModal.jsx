import React, { useState } from "react";
import BasicModal from "./BasicModal";
import Button from "../button/Button";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircle, Close } from "@mui/icons-material";
import BasicTextBox from "../textbox/BasicTextBox";
import { useSession } from "../../context/sessionContext";
import { useDispatch } from "react-redux";
import { addExerciseToSession } from "../../redux-toolkit/sessionSlice";
import ButtonGroup from "../button/ButtonGroup";
const schema = yup.object({
  name: yup.string().required("Enter excercise name"),
  information: yup.array().of(
    yup.object().shape({
      set: yup.string().required("Enter your excercise information"),
    })
  ),
});

const AddExcModal = ({ open = false, handleClose = () => {} }) => {
  // Form
  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "Exercise name",
      information: [{ set: "Set 1" }, { set: "Set 2" }],
    },
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "information",
  });
  const { sessionInfo } = useSession();

  const handleAddExc = (data) => {
    const information = data.information;
    const newExercise = information.map((item) => item.set);
    // const infos = data.map((item) => item.set);
    dispatch(
      addExerciseToSession({
        ...{ name: data.name, information: newExercise },
        ...sessionInfo,
      })
    );
    handleResetForm();
  };
  function handleRemoveSet(index) {
    if (fields.length > 1) {
      remove(index);
    }
  }
  function handleAddSet() {
    append({ set: "New set" });
  }
  function handleResetForm() {
    reset({
      name: "Exercise name",
      information: [{ set: "Set 1" }, { set: "Set 2" }],
    });
  }
  return (
    <BasicModal
      open={open}
      handleClose={() => {
        handleClose();
        handleResetForm();
      }}
    >
      <div>
        <h2 className="font-bold text-xl text-center">Add Exercise</h2>

        <form onSubmit={handleSubmit(handleAddExc)} className="w-[500px]">
          <div className="mb-4">
            <div className="flex flex-col">
              <div className="font-semibold mb-2">Name</div>
              <BasicTextBox
                id="name"
                value={getValues("name")}
                control={control}
                name="name"
                onChange={(e) => {
                  setValue("name", e.target.value);
                }}
                className="w-full px-10 py-2 outline-none border rounded-md border-slate-400
                focus:border-black focus:font-medium focus:text-black transition-all"
              />
            </div>

            {errors.name && (
              <p className="text-red-600 ">{errors.name.message}</p>
            )}
          </div>

          <div className="font-semibold mb-2">Information</div>
          {fields.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex gap-x-2 items-center relative mb-2"
              >
                <BasicTextBox
                  control={control}
                  name={`information[${index}].set`}
                  autoComplete="off"
                  errors={
                    errors.information
                      ? errors.information[index]?.set?.message
                      : null
                  }
                  defaultValue={getValues(`information[${index}].set`)}
                  className="w-full px-10 py-2 outline-none border rounded-md border-slate-400
                focus:border-black focus:font-medium focus:text-black transition-all"
                  wrapperClass="w-full"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveSet(index)}
                  className={`absolute top-2 right-2 ${
                    fields.length === 1 ? "hidden" : ""
                  }`}
                >
                  <Close />
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={handleAddSet}
            className={`mb-4 p-2 border border-slate-400 rounded-md w-full flex items-center 
          justify-center gap-x-1 text-slate-400 `}
          >
            <AddCircle />
            <span>Add set</span>
          </button>
          <ButtonGroup
            handleClose={() => {
              handleClose();
              handleResetForm();
            }}
            handleConfirm={() => {}}
          />
        </form>
      </div>
    </BasicModal>
  );
};

export default AddExcModal;
