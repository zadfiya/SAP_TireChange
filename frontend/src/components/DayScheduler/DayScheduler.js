import { Box } from "@mui/material";
import React from "react";

//display 7:00 - 19:00
const DayScheduler = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#aaa",
      }}
    >
      <table>
        <thead>
          <tr>
            {Array(11)
              .fill(0)
              .map((_, i) => {
                if (i === 0) {
                  return <td></td>;
                }
                return (
                  <Box
                    component={"td"}
                    sx={{
                      // gridColumn: i + 1,
                      // gridRow: 1,
                      backgroundColor: "#fff",
                    }}
                  >
                    {`slot -` + i}
                  </Box>
                );
              })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
          </tr>

          {Array(24)
            .fill(0)
            .map((_, i) => {
              return (
                <tr>
                  {Array(11)
                    .fill(0)
                    .map((_, j) => {
                      if (j === 0) {
                        return (
                          <Box
                            component={"td"}
                            sx={{
                              gridColumn: i + 1,
                              gridRow: j + 2,
                              backgroundColor: "#fff",
                            }}
                            rowSpan={2}
                          >
                            {i + 7}
                          </Box>
                        );
                      }
                      return (
                        <Box
                          component={"td"}
                          sx={{
                            gridColumn: i + 2,
                            gridRow: j + 2,
                            backgroundColor: "#fff",
                          }}
                        >
                          a
                        </Box>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </Box>
  );
};

export default DayScheduler;
