import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import { useState } from "react";
import { useMemo } from "react";
// import Modal from "../../components/Modal";

const localizer = dayjsLocalizer(dayjs);

const BigCalendar = ({
  selectedDate = new Date(),
  setSelectedDate,
  myEventsList,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { defaultDate } = useMemo(
    () => ({
      defaultDate: `${new Date(selectedDate)?.getFullYear()}-${(
        new Date(selectedDate)?.getMonth() + 1
      )
        .toString()
        .padStart(2, 0)}-${new Date(selectedDate)
        ?.getDate()
        .toString()
        .padStart(2, 0)}`,
    }),
    [selectedDate]
  );


  const modalData = [
    {
      _id: "eventType",
      key: "eventType",
      value: "Event Type",
    },
    {
      _id: "calendarEvent",
      key: "calendarEvent",
      value: "Calender Event",
    },
    {
      _id: "eventName",
      key: "eventName",
      value: "Event Name",
    },
    {
      _id: "startDate",
      key: "startDate",
      value: "Start Date",
    },
    {
      _id: "endDate",
      key: "endDate",
      value: "End Date",
    },
    {
      _id: "attendees",
      key: "attendees",
      value: "Attendees",
    },
    {
      _id: "startTime",
      key: "startTime",
      value: "Start Time",
    },
    {
      _id: "endTime",
      key: "endTime",
      value: "End Time",
    },
    {
      _id: "recurring",
      key: "recurring",
      value: "recurring",
    },
    {
      _id: "description",
      key: "description",
      value: "Description",
    },
    {
      _id: "staffInstruction",
      key: "staffInstruction",
      value: "Staff Instruction",
    },
    {
      _id: "staffAttachment",
      key: "staffAttachment",
      value: "Staff Attachment",
    },
    {
      _id: "studentInstruction",
      key: "studentInstruction",
      value: "Student Instruction",
    },
    {
      _id: "studentAttachment",
      key: "studentAttachment",
      value: "Student Attachment",
    },
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.backgroundColor;
    const color = event.color;
    const style = {
      backgroundColor: backgroundColor + "70",
      borderRadius: "5px",
      backdropFilter: "opacity(0.5)",
      border: `2px solid ${color}`,
      color: "white",
      boxShadow: "0px 1px 4px 0px rgba(0,0,0,0.2)",
      padding: "10px",
      display: "block",
    };
    return {
      style,
    };
  };
  const handleEventClick = (event) => {
    console.log({ event });
    setSelectedEvent(event);
    setIsPopupOpen(true);
  };

  const closeModal = () => {
    setIsPopupOpen(false);
    setSelectedEvent(null);
  };
  return (
    <div className=" w-[100%] px-2 py-2 bg-white rounded-[5px]">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90%" }}
        defaultView="day"
        eventPropGetter={eventStyleGetter}
        date={defaultDate}
        onNavigate={(newDate) => setSelectedDate(new Date(newDate))}
        onSelectEvent={handleEventClick}
      />

      
    </div>
  );
};

export default BigCalendar;
