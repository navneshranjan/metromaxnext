"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import CommonAccordion from "./components/accordion/CommonAccordion";
import axios from "axios";

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

const page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  useEffect(() => {
    axios
      .get("https://mocki.io/v1/40059489-6a19-4ca7-a41c-1c5c920e312c")
      .then((response) => setData(response.data.spans));
  }, []);

  function filterBySpanId(dataArray: DataItem[], traceId: string): DataItem[] {
    return dataArray.filter((item) => item.trace_id === traceId);
  }
  const traceId_1_Data = filterBySpanId(data, "TraceID_1");
  const traceId_2_Data = filterBySpanId(data, "TraceID_2");

  return (
    <div>
      <Stack>
        <Header />
        <Box
          className="mx-32 mt-6 px-4 py-10"
          sx={{ backgroundColor: "grey.900" }}
        >
          <Stack gap={4}>
            <CommonAccordion data={traceId_1_Data} traceId={"TraceID_1"} />
            <CommonAccordion data={traceId_2_Data} traceId={"TraceID_2"} />
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default page;
