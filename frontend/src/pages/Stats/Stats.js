import React, { useState } from "react";
import Graphs from "../../components/Graphs/Graphs";
import { Box } from "@mui/material";
import Page from "../Page";
import { TimePicker } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Stats = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <Page title={"Statistics"}>
      <DatePicker
        label="Select Date"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <Box {...params} />}
      />

      <Graphs date={date} />
    </Page>
  );
};

export default Stats;
