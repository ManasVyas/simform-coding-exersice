import React from "react";
import "./FormTabs.css";
import { Paper } from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";

const FormTabs = () => {
  return (
    <Paper className="root">
      <Tabs
        className="tabs"
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab className="tab" label="Questions"></Tab>
        <Tab className="tab" label="Response"></Tab>
      </Tabs>
    </Paper>
  );
};

export default FormTabs;
