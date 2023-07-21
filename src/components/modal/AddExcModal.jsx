import React, { useState } from "react";
import BasicModal from "./BasicModal";
import Button from "../button/Button";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircle, Close } from "@mui/icons-material";
import BasicTextBox from "../textbox/BasicTextBox";
import { useSession } from "../../context/sessionContext";
const schema = yup.object({
  title: yup.string().required("Enter excercise name"),
  exercise: yup.array().of(
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
      title: "Exercise name",
      exercise: [{ set: "Set 1" }, { set: "Set 2" }],
    },
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercise",
  });
  const { sessionInfo } = useSession();

  const handleAddExc = (data) => {
    console.log(data, sessionInfo);
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
      title: "Exercise name",
      exercise: [{ set: "Set 1" }, { set: "Set 2" }],
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
                id="title"
                value={getValues("title")}
                control={control}
                name="title"
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue("title", e.target.value);
                }}
                className="w-full px-10 py-2 outline-none border rounded-md border-slate-400
                focus:border-black focus:font-medium focus:text-black transition-all"
              />
            </div>

            {errors.title && (
              <p className="text-red-600 ">{errors.title.message}</p>
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
                  name={`exercise[${index}].set`}
                  autoComplete="off"
                  errors={
                    errors.exercise
                      ? errors.exercise[index]?.set?.message
                      : null
                  }
                  defaultValue={getValues(`exercise[${index}].set`)}
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
          <div className="flex gap-2 justify-center">
            <Button
              className="border border-gray-500"
              onClick={() => {
                handleClose();
                handleResetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white "
              //   onClick={handleClose}
              onClick={() => {}}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </BasicModal>
  );
};

export default AddExcModal;
