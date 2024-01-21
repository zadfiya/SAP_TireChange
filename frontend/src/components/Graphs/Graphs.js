import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";
import RevenueLossGraph from "./RevenueLossGraph";
import CustomerGraph from "./CustomerGraph";
import { getBookingDataForDate } from "../../apis/apis";

const Graphs = ({ date }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (date)
      getBookingDataForDate(date?.toISOString()).then((data) => {
        console.log(data);
        setData(data?.message?.data);
      });
  }, [date]);

  return (
    <Box
      marginTop={"20px"}
      width={"100%"}
      display={"grid"}
      gridTemplateColumns={"50% 50%"}
      gap={"20px"}
      sx={{ "& > div:nth-child(3)": { gridColumn: "span 2" } }}
    >
      <RevenueLossGraph data={data?.vehicleWise || []} title="Revenue Loss" />
      <RevenueLossGraph
        data={data?.vehicleWise || []}
        isGainedRevenue={false}
        title="Revenue Gained"
      />
      <CustomerGraph data={data?.vehicleWise || []} />
    </Box>
  );
};

export default Graphs;
