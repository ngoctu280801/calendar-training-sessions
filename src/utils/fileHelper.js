import _ from "lodash";
import moment from "moment";

export const getAllDaysInTheWeek = (currentDate = moment()) => {
  const weekStart = currentDate.clone().startOf("week");

  const days = Array.from(Array(7))
    .map((day, index) => index)
    .map((day) =>
      moment(weekStart).add(day, "days").set("minutes", 0).set("seconds", 0)
    )
    .map((momentObj) => ({
      date: momentObj.date(),
      dateStamp: +momentObj,
      weekDayName: momentObj.format("dddd"),
    }));

  return days;
};

export function swapElements(arr, index1, index2) {
  if (
    index1 < 0 ||
    index1 >= arr.length ||
    index2 < 0 ||
    index2 >= arr.length
  ) {
    throw new Error("Invalid indices");
  }

  const clonedArray = _.cloneDeep(arr);

  const temp = clonedArray[index1];
  clonedArray[index1] = clonedArray[index2];
  clonedArray[index2] = temp;

  return clonedArray;
}
export function cutElementAt(arr, index) {
  if (index < 0 || index >= arr.length) {
    throw new Error("Invalid index");
  }

  const clonedArray = _.cloneDeep(arr);

  const cutElement = _.pullAt(clonedArray, index);

  return {
    cutElement: cutElement[0],
    modifiedArray: clonedArray,
  };
}
export function insertElementAt(arr, index, element) {
  if (index < 0 || index > arr.length) {
    throw new Error("Invalid index");
  }

  const clonedArray = _.cloneDeep(arr);

  clonedArray.splice(index, 0, element);

  return clonedArray;
}
