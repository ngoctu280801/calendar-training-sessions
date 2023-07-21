import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./module/calendar/Calendar";

import ContainerList from "./module/container/ContainerList";
import { getAllDaysInTheWeek } from "./utils/fileHelper";
import moment from "moment";

function App() {
  const [stateCalendar, setStateCalendar] = useState({
    startDate: +moment(),
    weekDays: getAllDaysInTheWeek(),
  });
  // const [dataInDays, setDataInDays] = useState([]);

  const [timeInCalendar, setTimeInCalendar] = useState(new Date());

  //next week
  const goToNextWeek = () => {
    const dateAfter7Days = moment(stateCalendar.startDate).add(7, "days");

    setTimeInCalendar(dateAfter7Days?._d);
    setStateCalendar({
      ...stateCalendar,
      startDate: +dateAfter7Days,
      weekDays: getAllDaysInTheWeek(dateAfter7Days),
    });
  };

  // prev week
  const goToPreviousWeek = () => {
    const dateBefore7Days = moment(stateCalendar.startDate).subtract(7, "days");
    setTimeInCalendar(dateBefore7Days?._d);
    setStateCalendar({
      ...stateCalendar,
      startDate: +dateBefore7Days,
      weekDays: getAllDaysInTheWeek(dateBefore7Days),
    });
  };

  //go today
  const goToToday = () => {
    setTimeInCalendar(moment()._d);

    setStateCalendar({
      ...stateCalendar,
      startDate: +moment(),
      weekDays: getAllDaysInTheWeek(),
    });
  };
  return (
    <div className="p-5 ">
      <Calendar
        goToPreviousWeek={goToPreviousWeek}
        goToNextWeek={goToNextWeek}
        startDate={stateCalendar?.startDate}
        goToToday={goToToday}
      />
      <ContainerList weekDays={stateCalendar.weekDays} />
    </div>
  );
}

export default App;
