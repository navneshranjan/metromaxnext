import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Stack } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";

interface DataItem {
  span_id: string;
  destination: string;
  source: string;
  req_info: {
    error: boolean;
    req_path: string;
    latency: string;
  };
  trace_id: string;
}

interface CommonAccordionProps {
  data: DataItem[];
  traceId: string;
}

const CommonAccordion: React.FC<CommonAccordionProps> = ({ data, traceId }) => {
  const dataToMap = data;
  const numberOfError = dataToMap.filter(
    (item) => item?.req_info?.error
  ).length;
  console.log("dataToMap");

  return (
    <div className="mx-32">
      <Accordion sx={{ backgroundColor: "black", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack spacing={2}>
            <Typography fontSize={"1.5em"}>{traceId}</Typography>
            <Stack direction={"row"} gap={2}>
              <Box
                borderRadius={15}
                paddingX={"10px"}
                paddingY={"5px"}
                sx={{ position: "relative", backgroundColor: "gray" }}
              >
                {`${dataToMap.length} Spans`}
              </Box>
              <Box
                borderRadius={15}
                paddingX={"20px"}
                paddingY={"5px"}
                sx={{ position: "relative", backgroundColor: "red" }}
              >
                {`${numberOfError} Errors`}
              </Box>
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {dataToMap.map((item) => {
              return (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{
                    border: 1,
                    paddingX: "1em",
                    paddingY: "0.5em",
                    borderColor: "gray",
                    borderRadius: "5px",
                  }}
                >
                  <Stack>
                    <Typography>{item.req_info.req_path}</Typography>
                    <Stack direction={"row"}>
                      <Typography>
                        {item.destination} <ArrowRightAlt />
                      </Typography>
                      <Typography>{item.source}</Typography>
                    </Stack>
                  </Stack>
                  <div>
                    <Box
                      border={1}
                      borderRadius={15}
                      paddingX={"20px"}
                      paddingY={"5px"}
                      borderColor={"orange"}
                      sx={{ position: "relative" }}
                    >
                      {item.req_info.error ? (
                        <div className="w-2 h-2 rounded-full bg-red-800 absolute top-[-8px] left-[-4px] " />
                      ) : (
                        ""
                      )}
                      {item.req_info.latency}
                    </Box>
                  </div>
                </Stack>
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CommonAccordion;
