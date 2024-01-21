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
      gridTemplateColumns={"20% 80%"}
      gap={"12px"}
      sx={{
        "& > div:nth-child(3)": {
          gridRow: "1 / span 2",
          gridColumn: "2 / span 1",
        },
      }}
    >
      {" "}
      <RevenueLossGraph
        data={data?.vehicleWise || []}
        isGainedRevenue={false}
        title="Revenue Gained"
      />
      <RevenueLossGraph data={data?.vehicleWise || []} title="Revenue Loss" />
      <CustomerGraph data={data?.vehicleWise || []} />
    </Box>
  );
};

export default Graphs;
