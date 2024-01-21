import Scheduler, {
  SchedulerData,
  ViewType,
  DATE_FORMAT,
  DATETIME_FORMAT,
} from "react-big-scheduler-stch";
import "react-big-scheduler-stch/lib/css/style.css";
import dayjs from "dayjs";
import { useLayoutEffect, useState } from "react";
import { getBookingDataForDate } from "../../apis/apis";
import { parseDateString } from "../../utils/utils";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@mui/material";

import CustomDialog from "./../../components/CustomDialog/CustomDialog";

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

const resources = Array(10)
  .fill("")
  .map((_, i) => ({ id: i + 1, name: "slot - " + (i + 1) }));

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
  const [schData, setSchData] = useState(() => {
    const schData = new SchedulerData(
      new dayjs(new Date("2022-11-26T10:20:00.000Z").toUTCString()).format(
        DATE_FORMAT
      ),
      ViewType.Day,
      false,
      false,
      {
        dragAndDropEnabled: false,
        dayMaxEvents: 10,
        creatable: false,
        endResizable: false,
        movablera: false,
      }
    );
    schData.setResources(resources);
    return schData;
  });
  const [datee, setDate] = useState(dayjs("2022-11-26T10:20:00.000Z"));

  const [forRender, setForRender] = useState(0);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useLayoutEffect(() => {
    // schedulerData.setEvents(getDataFormat(ddd?.message?.data?.Bookings || []));
    getBookingDataForDate(datee?.toISOString()).then((data) => {
      console.log(data);

      const updatedSchedulerData = new SchedulerData(
        dayjs(datee),
        ViewType.Day,
        false,
        false,
        {
          dragAndDropEnabled: false,
          dayMaxEvents: 10,
          creatable: false,
          endResizable: false,
          movablera: false,
        }
      );
      updatedSchedulerData.setResources(resources);
      updatedSchedulerData.setEvents(
        getDataFormat(data?.message?.data?.Bookings || [])
      );
      setSchData(updatedSchedulerData);

      setForRender((prev) => prev + 1);
    });
  }, [datee]);

  return (
    // <DndProvider backend={HTML5Backend}>
    <Box>
      <div>{forRender}</div>
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <DatePicker
          sx={{ marginTop: "30px" }}
          label="Select Date"
          value={datee}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          // renderInput={(params) => <Box {...params} />}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
          }}
        >
          Schedule an Booking
        </Button>
      </Box>

      <Scheduler
        schedulerData={schData}
        eventItemPopoverTemplateResolver={eventItemPopoverTemplateResolver}
        prevClick={() => {}}
        nextClick={() => {}}
        onSelectDate={() => {}}
        onViewChange={() => {}}

        // eventItemClick={this.eventClicked}
      />
      <CustomDialog open={open} handleClose={handleClose} />
    </Box>
    // </DndProvider>
  );
};

export default Bookings;
