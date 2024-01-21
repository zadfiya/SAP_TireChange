import Scheduler, {
  SchedulerData,
  ViewType,
  DATE_FORMAT,
  DATETIME_FORMAT,
} from "react-big-scheduler-stch";
import "react-big-scheduler-stch/lib/css/style.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { getBookingDataForDate } from "../../apis/apis";
import { parseDateString } from "../../utils/utils";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const idMap = {
  "65ac38201345cb2eea7dd1c1": {
    type: "Compact",
    color: "#ef9a9a",
  },
  "65ac382f1345cb2eea7dd1c4": {
    type: "Medium",
    color: "#ce93d8",
  },
  "65ac38341345cb2eea7dd1c6": {
    type: "Full-size",
    color: "#90caf9",
  },
  "65ac38651345cb2eea7dd1c8": {
    type: "Class 1 truck",
    color: "#80cbc4",
  },
  "65ac38701345cb2eea7dd1ca": {
    type: "Class 2 truck",
    color: "#a5d6a7",
  },
};

const schedulerData = new SchedulerData(
  new dayjs(new Date("2022-11-26T10:20:00.000Z").toUTCString()).format(
    DATE_FORMAT
  ),
  ViewType.Day
);
schedulerData.config.dragAndDropEnabled = false;
schedulerData.config.dayMaxEvents = 10;
schedulerData.config.creatable = false;
schedulerData.config.endResizable = false;
schedulerData.config.movable = false;

schedulerData.setSchedulerLocale("en");

schedulerData.setResources(
  Array(10)
    .fill("")
    .map((_, i) => ({ id: i + 1, name: "slot - " + (i + 1) }))
);

const getDataFormat = (data = []) =>
  data
    .filter((d) => d?.bay)
    .map((d, ii) => ({
      id: d._id,
      start: dayjs(parseDateString(d.startTime)).format(DATETIME_FORMAT),
      end: dayjs(parseDateString(d.endTime)).format(DATETIME_FORMAT),

      title: d?.title,
      bgColor: d?.bgColor,

      resourceId: d?.bay,
      title: idMap[d?.vehicleType?._id]?.type,
      bgColor: idMap[d?.vehicleType?._id]?.color,
    }));

const eventItemPopoverTemplateResolver = (
  schedulerData,
  eventItem,
  title,
  start,
  end,
  bgColor,
  id
) => {
  return (
    <div
      style={{
        // width: "300px",
        backgroundColor: bgColor,
        color: "#ffffff",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <Box color={"#ffffff"} fontSize={"1.2rem"}>
        {title}
      </Box>

      <Box fontSize={"1rem"}>
        {start.format("HH:mm")} - {end.format("HH:mm")}
      </Box>
    </div>
  );
};

const Bookings = () => {
  const [datee, setDate] = useState(dayjs("2022-11-26T10:20:00.000Z"));

  // useEffect(() => {
  //   // schedulerData.setEvents(getDataFormat(ddd?.message?.data?.Bookings || []));
  //   getBookingDataForDate(date).then((data) => {
  //     console.log(data);
  //     schedulerData.setEvents(
  //       getDataFormat(ddd?.message?.data?.Bookings || [])
  //     );
  //   });
  // }, [date]);

  return (
    // <DndProvider backend={HTML5Backend}>
    <Box>
      <div>
        <DatePicker
          sx={{ marginTop: "30px" }}
          label="Select Date"
          value={datee}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          // renderInput={(params) => <Box {...params} />}
        />
      </div>

      <Scheduler
        schedulerData={schedulerData}
        eventItemPopoverTemplateResolver={eventItemPopoverTemplateResolver}
        prevClick={() => {}}
        nextClick={() => {}}
        onSelectDate={() => {}}
        onViewChange={() => {}}
        // eventItemClick={this.eventClicked}
      />
    </Box>
    // </DndProvider>
  );
};

export default Bookings;

const ddd = {
  success: "Statistics for Date: 2022-11-26",
  message: {
    data: {
      totalReveneue: 0,
      totalTurnedaway: 0,
      totalRevenue: 25700,
      totalTurnedAway: 48600,
      acceptedCustomers: 114,
      turnedAwayCustomers: 158,
      Bookings: [
        {
          bay: 3,
          startTime: "2022-11-26T07:00:00.000Z",
          endTime: "2022-11-26T07:30:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba0",
        },
        {
          bay: 1,
          startTime: "2022-11-26T07:00:00.000Z",
          endTime: "2022-11-26T07:30:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba1",
        },
        {
          bay: 4,
          startTime: "2022-11-26T07:00:00.000Z",
          endTime: "2022-11-26T08:00:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba2",
        },
        {
          bay: 6,
          startTime: "2022-11-26T07:00:00.000Z",
          endTime: "2022-11-26T08:00:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba3",
        },
        {
          bay: 7,
          startTime: "2022-11-26T07:01:00.000Z",
          endTime: "2022-11-26T07:31:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba4",
        },
        {
          bay: 8,
          startTime: "2022-11-26T07:02:00.000Z",
          endTime: "2022-11-26T08:02:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba5",
        },
        {
          bay: 5,
          startTime: "2022-11-26T07:03:00.000Z",
          endTime: "2022-11-26T09:03:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba6",
        },
        {
          bay: 9,
          startTime: "2022-11-26T07:03:00.000Z",
          endTime: "2022-11-26T08:03:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba7",
        },
        {
          bay: 10,
          startTime: "2022-11-26T07:04:00.000Z",
          endTime: "2022-11-26T07:34:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3ba8",
        },
        {
          startTime: "2022-11-26T07:04:00.000Z",
          endTime: "2022-11-26T07:34:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ba9",
        },
        {
          startTime: "2022-11-26T07:05:00.000Z",
          endTime: "2022-11-26T07:35:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3baa",
        },
        {
          startTime: "2022-11-26T07:06:00.000Z",
          endTime: "2022-11-26T09:06:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bab",
        },
        {
          startTime: "2022-11-26T07:06:00.000Z",
          endTime: "2022-11-26T07:36:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bac",
        },
        {
          bay: 2,
          startTime: "2022-11-26T07:07:00.000Z",
          endTime: "2022-11-26T07:37:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bad",
        },
        {
          startTime: "2022-11-26T07:07:00.000Z",
          endTime: "2022-11-26T08:07:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bae",
        },
        {
          startTime: "2022-11-26T07:09:00.000Z",
          endTime: "2022-11-26T07:39:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3baf",
        },
        {
          startTime: "2022-11-26T07:10:00.000Z",
          endTime: "2022-11-26T07:40:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb0",
        },
        {
          startTime: "2022-11-26T07:11:00.000Z",
          endTime: "2022-11-26T07:41:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb1",
        },
        {
          startTime: "2022-11-26T07:11:00.000Z",
          endTime: "2022-11-26T09:11:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb2",
        },
        {
          startTime: "2022-11-26T07:11:00.000Z",
          endTime: "2022-11-26T08:11:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb3",
        },
        {
          startTime: "2022-11-26T07:13:00.000Z",
          endTime: "2022-11-26T09:13:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb4",
        },
        {
          startTime: "2022-11-26T07:13:00.000Z",
          endTime: "2022-11-26T09:13:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb5",
        },
        {
          startTime: "2022-11-26T07:13:00.000Z",
          endTime: "2022-11-26T09:13:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb6",
        },
        {
          startTime: "2022-11-26T07:13:00.000Z",
          endTime: "2022-11-26T07:43:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb7",
        },
        {
          startTime: "2022-11-26T07:14:00.000Z",
          endTime: "2022-11-26T07:44:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb8",
        },
        {
          startTime: "2022-11-26T07:15:00.000Z",
          endTime: "2022-11-26T07:45:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bb9",
        },
        {
          startTime: "2022-11-26T07:15:00.000Z",
          endTime: "2022-11-26T07:45:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bba",
        },
        {
          startTime: "2022-11-26T07:16:00.000Z",
          endTime: "2022-11-26T07:46:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bbb",
        },
        {
          startTime: "2022-11-26T07:19:00.000Z",
          endTime: "2022-11-26T08:19:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bbc",
        },
        {
          startTime: "2022-11-26T07:22:00.000Z",
          endTime: "2022-11-26T07:52:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bbd",
        },
        {
          startTime: "2022-11-26T07:22:00.000Z",
          endTime: "2022-11-26T09:22:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bbe",
        },
        {
          startTime: "2022-11-26T07:23:00.000Z",
          endTime: "2022-11-26T09:23:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bbf",
        },
        {
          startTime: "2022-11-26T07:23:00.000Z",
          endTime: "2022-11-26T08:23:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc0",
        },
        {
          startTime: "2022-11-26T07:25:00.000Z",
          endTime: "2022-11-26T09:25:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc1",
        },
        {
          startTime: "2022-11-26T07:26:00.000Z",
          endTime: "2022-11-26T07:56:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc2",
        },
        {
          startTime: "2022-11-26T07:26:00.000Z",
          endTime: "2022-11-26T09:26:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc3",
        },
        {
          startTime: "2022-11-26T07:26:00.000Z",
          endTime: "2022-11-26T09:26:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc4",
        },
        {
          startTime: "2022-11-26T07:28:00.000Z",
          endTime: "2022-11-26T07:58:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc5",
        },
        {
          startTime: "2022-11-26T07:29:00.000Z",
          endTime: "2022-11-26T09:29:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc6",
        },
        {
          startTime: "2022-11-26T07:29:00.000Z",
          endTime: "2022-11-26T08:29:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc7",
        },
        {
          startTime: "2022-11-26T07:29:00.000Z",
          endTime: "2022-11-26T08:29:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc8",
        },
        {
          startTime: "2022-11-26T07:30:00.000Z",
          endTime: "2022-11-26T08:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bc9",
        },
        {
          startTime: "2022-11-26T07:30:00.000Z",
          endTime: "2022-11-26T08:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bca",
        },
        {
          startTime: "2022-11-26T07:30:00.000Z",
          endTime: "2022-11-26T09:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bcb",
        },
        {
          startTime: "2022-11-26T07:30:00.000Z",
          endTime: "2022-11-26T08:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bcc",
        },
        {
          bay: 7,
          startTime: "2022-11-26T07:32:00.000Z",
          endTime: "2022-11-26T08:02:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bcd",
        },
        {
          bay: 3,
          startTime: "2022-11-26T07:32:00.000Z",
          endTime: "2022-11-26T08:02:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bce",
        },
        {
          startTime: "2022-11-26T07:32:00.000Z",
          endTime: "2022-11-26T08:02:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bcf",
        },
        {
          startTime: "2022-11-26T07:34:00.000Z",
          endTime: "2022-11-26T09:34:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd0",
        },
        {
          startTime: "2022-11-26T07:34:00.000Z",
          endTime: "2022-11-26T09:34:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd1",
        },
        {
          bay: 10,
          startTime: "2022-11-26T07:35:00.000Z",
          endTime: "2022-11-26T08:05:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bd2",
        },
        {
          startTime: "2022-11-26T07:36:00.000Z",
          endTime: "2022-11-26T08:06:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd3",
        },
        {
          bay: 1,
          startTime: "2022-11-26T07:37:00.000Z",
          endTime: "2022-11-26T08:07:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bd4",
        },
        {
          startTime: "2022-11-26T07:37:00.000Z",
          endTime: "2022-11-26T08:07:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd5",
        },
        {
          startTime: "2022-11-26T07:37:00.000Z",
          endTime: "2022-11-26T08:07:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd6",
        },
        {
          bay: 2,
          startTime: "2022-11-26T07:38:00.000Z",
          endTime: "2022-11-26T08:08:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bd7",
        },
        {
          startTime: "2022-11-26T07:38:00.000Z",
          endTime: "2022-11-26T08:38:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd8",
        },
        {
          startTime: "2022-11-26T07:38:00.000Z",
          endTime: "2022-11-26T08:08:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bd9",
        },
        {
          startTime: "2022-11-26T07:39:00.000Z",
          endTime: "2022-11-26T08:09:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bda",
        },
        {
          startTime: "2022-11-26T07:39:00.000Z",
          endTime: "2022-11-26T08:09:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bdb",
        },
        {
          startTime: "2022-11-26T07:41:00.000Z",
          endTime: "2022-11-26T09:41:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bdc",
        },
        {
          startTime: "2022-11-26T07:42:00.000Z",
          endTime: "2022-11-26T09:42:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bdd",
        },
        {
          startTime: "2022-11-26T07:43:00.000Z",
          endTime: "2022-11-26T08:13:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bde",
        },
        {
          startTime: "2022-11-26T07:43:00.000Z",
          endTime: "2022-11-26T09:43:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bdf",
        },
        {
          startTime: "2022-11-26T07:43:00.000Z",
          endTime: "2022-11-26T08:13:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be0",
        },
        {
          startTime: "2022-11-26T07:44:00.000Z",
          endTime: "2022-11-26T08:44:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be1",
        },
        {
          startTime: "2022-11-26T07:45:00.000Z",
          endTime: "2022-11-26T08:45:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be2",
        },
        {
          startTime: "2022-11-26T07:46:00.000Z",
          endTime: "2022-11-26T08:16:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be3",
        },
        {
          startTime: "2022-11-26T07:46:00.000Z",
          endTime: "2022-11-26T08:46:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be4",
        },
        {
          startTime: "2022-11-26T07:46:00.000Z",
          endTime: "2022-11-26T08:16:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be5",
        },
        {
          startTime: "2022-11-26T07:49:00.000Z",
          endTime: "2022-11-26T08:49:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be6",
        },
        {
          startTime: "2022-11-26T07:50:00.000Z",
          endTime: "2022-11-26T09:50:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be7",
        },
        {
          startTime: "2022-11-26T07:52:00.000Z",
          endTime: "2022-11-26T08:22:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be8",
        },
        {
          startTime: "2022-11-26T07:53:00.000Z",
          endTime: "2022-11-26T08:23:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3be9",
        },
        {
          startTime: "2022-11-26T07:53:00.000Z",
          endTime: "2022-11-26T09:53:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bea",
        },
        {
          startTime: "2022-11-26T07:53:00.000Z",
          endTime: "2022-11-26T08:23:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3beb",
        },
        {
          startTime: "2022-11-26T07:54:00.000Z",
          endTime: "2022-11-26T08:24:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bec",
        },
        {
          startTime: "2022-11-26T07:54:00.000Z",
          endTime: "2022-11-26T08:24:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bed",
        },
        {
          startTime: "2022-11-26T07:55:00.000Z",
          endTime: "2022-11-26T08:55:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bee",
        },
        {
          startTime: "2022-11-26T07:55:00.000Z",
          endTime: "2022-11-26T08:25:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bef",
        },
        {
          startTime: "2022-11-26T07:56:00.000Z",
          endTime: "2022-11-26T08:26:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf0",
        },
        {
          startTime: "2022-11-26T07:56:00.000Z",
          endTime: "2022-11-26T08:26:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf1",
        },
        {
          startTime: "2022-11-26T07:56:00.000Z",
          endTime: "2022-11-26T08:26:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf2",
        },
        {
          startTime: "2022-11-26T07:56:00.000Z",
          endTime: "2022-11-26T08:56:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf3",
        },
        {
          startTime: "2022-11-26T07:56:00.000Z",
          endTime: "2022-11-26T08:26:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf4",
        },
        {
          startTime: "2022-11-26T07:57:00.000Z",
          endTime: "2022-11-26T09:57:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf5",
        },
        {
          startTime: "2022-11-26T07:57:00.000Z",
          endTime: "2022-11-26T09:57:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf6",
        },
        {
          startTime: "2022-11-26T07:58:00.000Z",
          endTime: "2022-11-26T08:28:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf7",
        },
        {
          startTime: "2022-11-26T07:58:00.000Z",
          endTime: "2022-11-26T09:58:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf8",
        },
        {
          startTime: "2022-11-26T07:58:00.000Z",
          endTime: "2022-11-26T08:28:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bf9",
        },
        {
          startTime: "2022-11-26T07:58:00.000Z",
          endTime: "2022-11-26T08:28:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bfa",
        },
        {
          startTime: "2022-11-26T07:59:00.000Z",
          endTime: "2022-11-26T08:29:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3bfb",
        },
        {
          bay: 6,
          startTime: "2022-11-26T08:01:00.000Z",
          endTime: "2022-11-26T08:31:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bfc",
        },
        {
          bay: 7,
          startTime: "2022-11-26T08:03:00.000Z",
          endTime: "2022-11-26T08:33:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bfd",
        },
        {
          bay: 8,
          startTime: "2022-11-26T08:03:00.000Z",
          endTime: "2022-11-26T08:33:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bfe",
        },
        {
          bay: 9,
          startTime: "2022-11-26T08:06:00.000Z",
          endTime: "2022-11-26T10:06:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3bff",
        },
        {
          bay: 10,
          startTime: "2022-11-26T08:08:00.000Z",
          endTime: "2022-11-26T08:38:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c00",
        },
        {
          bay: 3,
          startTime: "2022-11-26T08:14:00.000Z",
          endTime: "2022-11-26T08:44:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c01",
        },
        {
          bay: 6,
          startTime: "2022-11-26T08:32:00.000Z",
          endTime: "2022-11-26T09:02:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c02",
        },
        {
          bay: 2,
          startTime: "2022-11-26T08:33:00.000Z",
          endTime: "2022-11-26T09:03:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c03",
        },
        {
          bay: 1,
          startTime: "2022-11-26T08:35:00.000Z",
          endTime: "2022-11-26T09:05:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c04",
        },
        {
          bay: 7,
          startTime: "2022-11-26T08:53:00.000Z",
          endTime: "2022-11-26T09:23:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c05",
        },
        {
          bay: 8,
          startTime: "2022-11-26T08:54:00.000Z",
          endTime: "2022-11-26T10:54:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c06",
        },
        {
          bay: 10,
          startTime: "2022-11-26T08:54:00.000Z",
          endTime: "2022-11-26T10:54:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c07",
        },
        {
          bay: 3,
          startTime: "2022-11-26T09:00:00.000Z",
          endTime: "2022-11-26T09:30:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c08",
        },
        {
          bay: 5,
          startTime: "2022-11-26T09:07:00.000Z",
          endTime: "2022-11-26T11:07:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c09",
        },
        {
          bay: 1,
          startTime: "2022-11-26T09:08:00.000Z",
          endTime: "2022-11-26T09:38:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c0a",
        },
        {
          bay: 6,
          startTime: "2022-11-26T09:12:00.000Z",
          endTime: "2022-11-26T09:42:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c0b",
        },
        {
          startTime: "2022-11-26T09:17:00.000Z",
          endTime: "2022-11-26T09:47:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c0c",
        },
        {
          bay: 7,
          startTime: "2022-11-26T09:26:00.000Z",
          endTime: "2022-11-26T09:56:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c0d",
        },
        {
          bay: 4,
          startTime: "2022-11-26T09:30:00.000Z",
          endTime: "2022-11-26T10:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c0e",
        },
        {
          bay: 3,
          startTime: "2022-11-26T09:45:00.000Z",
          endTime: "2022-11-26T10:15:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c0f",
        },
        {
          bay: 2,
          startTime: "2022-11-26T09:52:00.000Z",
          endTime: "2022-11-26T10:22:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c10",
        },
        {
          bay: 6,
          startTime: "2022-11-26T09:53:00.000Z",
          endTime: "2022-11-26T10:23:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c11",
        },
        {
          startTime: "2022-11-26T09:54:00.000Z",
          endTime: "2022-11-26T10:54:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c12",
        },
        {
          startTime: "2022-11-26T09:56:00.000Z",
          endTime: "2022-11-26T10:56:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c13",
        },
        {
          bay: 7,
          startTime: "2022-11-26T10:02:00.000Z",
          endTime: "2022-11-26T10:32:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c14",
        },
        {
          bay: 9,
          startTime: "2022-11-26T10:13:00.000Z",
          endTime: "2022-11-26T10:43:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c15",
        },
        {
          startTime: "2022-11-26T10:17:00.000Z",
          endTime: "2022-11-26T12:17:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c16",
        },
        {
          startTime: "2022-11-26T10:20:00.000Z",
          endTime: "2022-11-26T10:50:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c17",
        },
        {
          bay: 6,
          startTime: "2022-11-26T10:25:00.000Z",
          endTime: "2022-11-26T11:25:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c18",
        },
        {
          bay: 2,
          startTime: "2022-11-26T10:25:00.000Z",
          endTime: "2022-11-26T10:55:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c19",
        },
        {
          startTime: "2022-11-26T10:25:00.000Z",
          endTime: "2022-11-26T12:25:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c1a",
        },
        {
          bay: 1,
          startTime: "2022-11-26T10:30:00.000Z",
          endTime: "2022-11-26T11:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c1b",
        },
        {
          bay: 4,
          startTime: "2022-11-26T10:34:00.000Z",
          endTime: "2022-11-26T11:34:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c1c",
        },
        {
          bay: 3,
          startTime: "2022-11-26T11:07:00.000Z",
          endTime: "2022-11-26T11:37:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c1d",
        },
        {
          bay: 2,
          startTime: "2022-11-26T11:11:00.000Z",
          endTime: "2022-11-26T11:41:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c1e",
        },
        {
          bay: 7,
          startTime: "2022-11-26T11:11:00.000Z",
          endTime: "2022-11-26T11:41:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c1f",
        },
        {
          bay: 8,
          startTime: "2022-11-26T11:19:00.000Z",
          endTime: "2022-11-26T12:19:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c20",
        },
        {
          bay: 5,
          startTime: "2022-11-26T11:21:00.000Z",
          endTime: "2022-11-26T13:21:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c21",
        },
        {
          bay: 6,
          startTime: "2022-11-26T11:26:00.000Z",
          endTime: "2022-11-26T13:26:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c22",
        },
        {
          bay: 9,
          startTime: "2022-11-26T11:28:00.000Z",
          endTime: "2022-11-26T11:58:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c23",
        },
        {
          bay: 10,
          startTime: "2022-11-26T11:30:00.000Z",
          endTime: "2022-11-26T12:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c24",
        },
        {
          startTime: "2022-11-26T11:30:00.000Z",
          endTime: "2022-11-26T12:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c25",
        },
        {
          startTime: "2022-11-26T11:30:00.000Z",
          endTime: "2022-11-26T13:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c26",
        },
        {
          bay: 3,
          startTime: "2022-11-26T11:39:00.000Z",
          endTime: "2022-11-26T12:09:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c27",
        },
        {
          startTime: "2022-11-26T11:40:00.000Z",
          endTime: "2022-11-26T13:40:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c28",
        },
        {
          bay: 4,
          startTime: "2022-11-26T11:45:00.000Z",
          endTime: "2022-11-26T12:45:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c29",
        },
        {
          bay: 1,
          startTime: "2022-11-26T11:51:00.000Z",
          endTime: "2022-11-26T12:21:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c2a",
        },
        {
          bay: 7,
          startTime: "2022-11-26T11:51:00.000Z",
          endTime: "2022-11-26T12:51:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c2b",
        },
        {
          startTime: "2022-11-26T11:55:00.000Z",
          endTime: "2022-11-26T12:25:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c2c",
        },
        {
          startTime: "2022-11-26T11:56:00.000Z",
          endTime: "2022-11-26T12:26:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c2d",
        },
        {
          bay: 9,
          startTime: "2022-11-26T12:08:00.000Z",
          endTime: "2022-11-26T14:08:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c2e",
        },
        {
          bay: 10,
          startTime: "2022-11-26T12:10:00.000Z",
          endTime: "2022-11-26T12:40:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c2f",
        },
        {
          startTime: "2022-11-26T12:13:00.000Z",
          endTime: "2022-11-26T12:43:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c30",
        },
        {
          bay: 3,
          startTime: "2022-11-26T12:13:00.000Z",
          endTime: "2022-11-26T12:43:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c31",
        },
        {
          bay: 8,
          startTime: "2022-11-26T12:40:00.000Z",
          endTime: "2022-11-26T13:10:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c32",
        },
        {
          bay: 2,
          startTime: "2022-11-26T12:45:00.000Z",
          endTime: "2022-11-26T13:15:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c33",
        },
        {
          bay: 10,
          startTime: "2022-11-26T12:45:00.000Z",
          endTime: "2022-11-26T13:15:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c34",
        },
        {
          bay: 1,
          startTime: "2022-11-26T12:46:00.000Z",
          endTime: "2022-11-26T13:16:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c35",
        },
        {
          bay: 3,
          startTime: "2022-11-26T12:52:00.000Z",
          endTime: "2022-11-26T13:22:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c36",
        },
        {
          bay: 7,
          startTime: "2022-11-26T12:53:00.000Z",
          endTime: "2022-11-26T13:23:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c37",
        },
        {
          startTime: "2022-11-26T12:54:00.000Z",
          endTime: "2022-11-26T13:24:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c38",
        },
        {
          startTime: "2022-11-26T12:54:00.000Z",
          endTime: "2022-11-26T13:24:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c39",
        },
        {
          startTime: "2022-11-26T13:00:00.000Z",
          endTime: "2022-11-26T15:00:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c3a",
        },
        {
          startTime: "2022-11-26T13:04:00.000Z",
          endTime: "2022-11-26T13:34:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c3b",
        },
        {
          bay: 8,
          startTime: "2022-11-26T13:11:00.000Z",
          endTime: "2022-11-26T13:41:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c3c",
        },
        {
          startTime: "2022-11-26T13:13:00.000Z",
          endTime: "2022-11-26T13:43:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c3d",
        },
        {
          bay: 4,
          startTime: "2022-11-26T13:16:00.000Z",
          endTime: "2022-11-26T14:16:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c3e",
        },
        {
          bay: 10,
          startTime: "2022-11-26T13:21:00.000Z",
          endTime: "2022-11-26T14:21:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c3f",
        },
        {
          bay: 1,
          startTime: "2022-11-26T13:23:00.000Z",
          endTime: "2022-11-26T13:53:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c40",
        },
        {
          bay: 6,
          startTime: "2022-11-26T13:30:00.000Z",
          endTime: "2022-11-26T14:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c41",
        },
        {
          bay: 3,
          startTime: "2022-11-26T13:34:00.000Z",
          endTime: "2022-11-26T14:04:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c42",
        },
        {
          bay: 2,
          startTime: "2022-11-26T13:52:00.000Z",
          endTime: "2022-11-26T14:22:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c43",
        },
        {
          bay: 1,
          startTime: "2022-11-26T13:59:00.000Z",
          endTime: "2022-11-26T14:29:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c44",
        },
        {
          bay: 7,
          startTime: "2022-11-26T14:04:00.000Z",
          endTime: "2022-11-26T14:34:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c45",
        },
        {
          bay: 8,
          startTime: "2022-11-26T14:04:00.000Z",
          endTime: "2022-11-26T14:34:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c46",
        },
        {
          startTime: "2022-11-26T14:04:00.000Z",
          endTime: "2022-11-26T14:34:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c47",
        },
        {
          startTime: "2022-11-26T14:08:00.000Z",
          endTime: "2022-11-26T14:38:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c48",
        },
        {
          bay: 3,
          startTime: "2022-11-26T14:11:00.000Z",
          endTime: "2022-11-26T14:41:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c49",
        },
        {
          bay: 4,
          startTime: "2022-11-26T14:19:00.000Z",
          endTime: "2022-11-26T15:19:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4a",
        },
        {
          bay: 2,
          startTime: "2022-11-26T14:25:00.000Z",
          endTime: "2022-11-26T14:55:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4b",
        },
        {
          bay: 9,
          startTime: "2022-11-26T14:30:00.000Z",
          endTime: "2022-11-26T15:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4c",
        },
        {
          bay: 6,
          startTime: "2022-11-26T14:34:00.000Z",
          endTime: "2022-11-26T15:04:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4d",
        },
        {
          bay: 7,
          startTime: "2022-11-26T14:37:00.000Z",
          endTime: "2022-11-26T15:37:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4e",
        },
        {
          bay: 8,
          startTime: "2022-11-26T14:43:00.000Z",
          endTime: "2022-11-26T15:43:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c4f",
        },
        {
          bay: 3,
          startTime: "2022-11-26T14:45:00.000Z",
          endTime: "2022-11-26T15:15:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c50",
        },
        {
          bay: 10,
          startTime: "2022-11-26T14:51:00.000Z",
          endTime: "2022-11-26T15:21:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c51",
        },
        {
          startTime: "2022-11-26T14:57:00.000Z",
          endTime: "2022-11-26T15:27:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c52",
        },
        {
          startTime: "2022-11-26T15:00:00.000Z",
          endTime: "2022-11-26T15:30:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c53",
        },
        {
          bay: 2,
          startTime: "2022-11-26T15:00:00.000Z",
          endTime: "2022-11-26T15:30:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c54",
        },
        {
          bay: 5,
          startTime: "2022-11-26T15:05:00.000Z",
          endTime: "2022-11-26T17:05:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c55",
        },
        {
          bay: 6,
          startTime: "2022-11-26T15:10:00.000Z",
          endTime: "2022-11-26T15:40:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c56",
        },
        {
          bay: 9,
          startTime: "2022-11-26T15:11:00.000Z",
          endTime: "2022-11-26T15:41:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c57",
        },
        {
          startTime: "2022-11-26T15:18:00.000Z",
          endTime: "2022-11-26T15:48:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c58",
        },
        {
          bay: 1,
          startTime: "2022-11-26T15:21:00.000Z",
          endTime: "2022-11-26T15:51:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c59",
        },
        {
          bay: 10,
          startTime: "2022-11-26T15:24:00.000Z",
          endTime: "2022-11-26T15:54:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c5a",
        },
        {
          startTime: "2022-11-26T15:26:00.000Z",
          endTime: "2022-11-26T15:56:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c5b",
        },
        {
          startTime: "2022-11-26T15:28:00.000Z",
          endTime: "2022-11-26T15:58:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c5c",
        },
        {
          bay: 7,
          startTime: "2022-11-26T15:38:00.000Z",
          endTime: "2022-11-26T17:38:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c5d",
        },
        {
          bay: 2,
          startTime: "2022-11-26T15:39:00.000Z",
          endTime: "2022-11-26T16:09:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c5e",
        },
        {
          bay: 3,
          startTime: "2022-11-26T15:56:00.000Z",
          endTime: "2022-11-26T16:26:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c5f",
        },
        {
          bay: 6,
          startTime: "2022-11-26T15:57:00.000Z",
          endTime: "2022-11-26T16:27:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c60",
        },
        {
          bay: 8,
          startTime: "2022-11-26T16:15:00.000Z",
          endTime: "2022-11-26T16:45:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c61",
        },
        {
          bay: 9,
          startTime: "2022-11-26T16:17:00.000Z",
          endTime: "2022-11-26T18:17:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c62",
        },
        {
          bay: 4,
          startTime: "2022-11-26T16:17:00.000Z",
          endTime: "2022-11-26T17:17:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c63",
        },
        {
          bay: 1,
          startTime: "2022-11-26T16:23:00.000Z",
          endTime: "2022-11-26T16:53:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c64",
        },
        {
          bay: 6,
          startTime: "2022-11-26T16:30:00.000Z",
          endTime: "2022-11-26T17:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c65",
        },
        {
          bay: 10,
          startTime: "2022-11-26T16:30:00.000Z",
          endTime: "2022-11-26T18:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c66",
        },
        {
          startTime: "2022-11-26T16:41:00.000Z",
          endTime: "2022-11-26T17:41:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c67",
        },
        {
          bay: 8,
          startTime: "2022-11-26T16:48:00.000Z",
          endTime: "2022-11-26T17:48:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c68",
        },
        {
          startTime: "2022-11-26T16:53:00.000Z",
          endTime: "2022-11-26T17:23:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c69",
        },
        {
          bay: 2,
          startTime: "2022-11-26T17:00:00.000Z",
          endTime: "2022-11-26T17:30:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c6a",
        },
        {
          bay: 1,
          startTime: "2022-11-26T17:06:00.000Z",
          endTime: "2022-11-26T17:36:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c6b",
        },
        {
          bay: 3,
          startTime: "2022-11-26T17:19:00.000Z",
          endTime: "2022-11-26T17:49:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c6c",
        },
        {
          startTime: "2022-11-26T17:19:00.000Z",
          endTime: "2022-11-26T19:19:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c6d",
        },
        {
          bay: 6,
          startTime: "2022-11-26T17:22:00.000Z",
          endTime: "2022-11-26T17:52:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c6e",
        },
        {
          bay: 2,
          startTime: "2022-11-26T17:32:00.000Z",
          endTime: "2022-11-26T18:02:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c6f",
        },
        {
          bay: 4,
          startTime: "2022-11-26T17:43:00.000Z",
          endTime: "2022-11-26T18:43:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c70",
        },
        {
          bay: 1,
          startTime: "2022-11-26T17:50:00.000Z",
          endTime: "2022-11-26T18:20:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c71",
        },
        {
          bay: 6,
          startTime: "2022-11-26T17:53:00.000Z",
          endTime: "2022-11-26T18:23:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c72",
        },
        {
          startTime: "2022-11-26T17:54:00.000Z",
          endTime: "2022-11-26T19:54:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c73",
        },
        {
          bay: 7,
          startTime: "2022-11-26T17:58:00.000Z",
          endTime: "2022-11-26T18:58:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c74",
        },
        {
          bay: 3,
          startTime: "2022-11-26T18:01:00.000Z",
          endTime: "2022-11-26T18:31:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c75",
        },
        {
          bay: 8,
          startTime: "2022-11-26T18:02:00.000Z",
          endTime: "2022-11-26T18:32:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c76",
        },
        {
          startTime: "2022-11-26T18:03:00.000Z",
          endTime: "2022-11-26T18:33:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c77",
        },
        {
          bay: 2,
          startTime: "2022-11-26T18:03:00.000Z",
          endTime: "2022-11-26T18:33:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c78",
        },
        {
          startTime: "2022-11-26T18:04:00.000Z",
          endTime: "2022-11-26T18:34:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c79",
        },
        {
          startTime: "2022-11-26T18:05:00.000Z",
          endTime: "2022-11-26T19:05:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7a",
        },
        {
          startTime: "2022-11-26T18:06:00.000Z",
          endTime: "2022-11-26T18:36:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7b",
        },
        {
          startTime: "2022-11-26T18:07:00.000Z",
          endTime: "2022-11-26T19:07:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7c",
        },
        {
          startTime: "2022-11-26T18:08:00.000Z",
          endTime: "2022-11-26T19:08:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7d",
        },
        {
          startTime: "2022-11-26T18:08:00.000Z",
          endTime: "2022-11-26T19:08:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7e",
        },
        {
          startTime: "2022-11-26T18:08:00.000Z",
          endTime: "2022-11-26T18:38:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c7f",
        },
        {
          startTime: "2022-11-26T18:10:00.000Z",
          endTime: "2022-11-26T18:40:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c80",
        },
        {
          startTime: "2022-11-26T18:11:00.000Z",
          endTime: "2022-11-26T20:11:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c81",
        },
        {
          startTime: "2022-11-26T18:11:00.000Z",
          endTime: "2022-11-26T18:41:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c82",
        },
        {
          startTime: "2022-11-26T18:12:00.000Z",
          endTime: "2022-11-26T18:42:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c83",
        },
        {
          startTime: "2022-11-26T18:14:00.000Z",
          endTime: "2022-11-26T19:14:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c84",
        },
        {
          startTime: "2022-11-26T18:15:00.000Z",
          endTime: "2022-11-26T18:45:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c85",
        },
        {
          startTime: "2022-11-26T18:15:00.000Z",
          endTime: "2022-11-26T19:15:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c86",
        },
        {
          startTime: "2022-11-26T18:15:00.000Z",
          endTime: "2022-11-26T18:45:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c87",
        },
        {
          startTime: "2022-11-26T18:16:00.000Z",
          endTime: "2022-11-26T18:46:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c88",
        },
        {
          startTime: "2022-11-26T18:17:00.000Z",
          endTime: "2022-11-26T18:47:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c89",
        },
        {
          startTime: "2022-11-26T18:18:00.000Z",
          endTime: "2022-11-26T20:18:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c8a",
        },
        {
          bay: 9,
          startTime: "2022-11-26T18:18:00.000Z",
          endTime: "2022-11-26T18:48:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c8b",
        },
        {
          startTime: "2022-11-26T18:21:00.000Z",
          endTime: "2022-11-26T19:21:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c8c",
        },
        {
          startTime: "2022-11-26T18:22:00.000Z",
          endTime: "2022-11-26T20:22:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c8d",
        },
        {
          startTime: "2022-11-26T18:23:00.000Z",
          endTime: "2022-11-26T18:53:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c8e",
        },
        {
          startTime: "2022-11-26T18:23:00.000Z",
          endTime: "2022-11-26T18:53:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c8f",
        },
        {
          bay: 1,
          startTime: "2022-11-26T18:24:00.000Z",
          endTime: "2022-11-26T18:54:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c90",
        },
        {
          startTime: "2022-11-26T18:24:00.000Z",
          endTime: "2022-11-26T20:24:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c91",
        },
        {
          startTime: "2022-11-26T18:25:00.000Z",
          endTime: "2022-11-26T19:25:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c92",
        },
        {
          bay: 6,
          startTime: "2022-11-26T18:27:00.000Z",
          endTime: "2022-11-26T18:57:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "Serviced",
          _id: "65ad005f8c4188694c5a3c93",
        },
        {
          startTime: "2022-11-26T18:27:00.000Z",
          endTime: "2022-11-26T19:27:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c94",
        },
        {
          startTime: "2022-11-26T18:27:00.000Z",
          endTime: "2022-11-26T18:57:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c95",
        },
        {
          startTime: "2022-11-26T18:29:00.000Z",
          endTime: "2022-11-26T20:29:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c96",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c97",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c98",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c99",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9a",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9b",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9c",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9d",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9e",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3c9f",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca0",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca1",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca2",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca3",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca4",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca5",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca6",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca7",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac382f1345cb2eea7dd1c4",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca8",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3ca9",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T20:30:00.000Z",
          vehicleType: {
            _id: "65ac38701345cb2eea7dd1ca",
            charge: 700,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3caa",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:30:00.000Z",
          vehicleType: {
            _id: "65ac38651345cb2eea7dd1c8",
            charge: 250,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3cab",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3cac",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3cad",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38341345cb2eea7dd1c6",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3cae",
        },
        {
          startTime: "2022-11-26T18:30:00.000Z",
          endTime: "2022-11-26T19:00:00.000Z",
          vehicleType: {
            _id: "65ac38201345cb2eea7dd1c1",
            charge: 150,
          },
          status: "TurnedAway",
          _id: "65ad005f8c4188694c5a3caf",
        },
      ],
      vehicleWise: [
        {
          vehicleid: "65ac38201345cb2eea7dd1c1",
          totalReveneue: 0,
          acceptedCustomers: 0,
          turnedAwayCustomers: 0,
          totalTurnedaway: 0,
          _id: "65ad00618c4188694c5a43c6",
        },
        {
          vehicleid: "65ac382f1345cb2eea7dd1c4",
          totalReveneue: 0,
          acceptedCustomers: 0,
          turnedAwayCustomers: 0,
          totalTurnedaway: 0,
          _id: "65ad00618c4188694c5a43c7",
        },
        {
          vehicleid: "65ac38341345cb2eea7dd1c6",
          totalReveneue: 0,
          acceptedCustomers: 0,
          turnedAwayCustomers: 0,
          totalTurnedaway: 0,
          _id: "65ad00618c4188694c5a43c8",
        },
        {
          vehicleid: "65ac38651345cb2eea7dd1c8",
          totalReveneue: 0,
          acceptedCustomers: 0,
          turnedAwayCustomers: 0,
          totalTurnedaway: 0,
          _id: "65ad00618c4188694c5a43c9",
        },
        {
          vehicleid: "65ac38701345cb2eea7dd1ca",
          totalReveneue: 0,
          acceptedCustomers: 0,
          turnedAwayCustomers: 0,
          totalTurnedaway: 0,
          _id: "65ad00618c4188694c5a43ca",
        },
      ],
    },
    _id: "65ad005f8c4188694c5a3b9f",
    date: "2022-11-26",
    createdAt: "2024-01-21T11:30:40.993Z",
    updatedAt: "2024-01-21T11:30:40.993Z",
    __v: 0,
  },
  data: {},
};
