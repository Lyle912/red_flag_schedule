/* eslint-disable no-sequences */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    border: "1px solid black",
    marginTop: "1px",
  },
  cell: {
    color: "white",
    border: "2px solid black",
    textAlign: "center",
  },
  headerCell: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    border: "2px solid black",
    backgroundColor: "#DDDDDD",
  },
});

const myCSV = 
"Start,End,Event,Location,Attendees,Vul,Plan/Exec\n0500,0530,Next Day DIM (Pre-Frag),AMPC,1-2-3-4-5-6-7,AM,P\n0600,0630,Next Day MAM (Frag),AMPC,1-2-3-4-5-6,AM,P\n0600,1400,Next Day Non-STO Vul Coord,MPC 1,13,AM,P\n0600,0700,LFE Mass Brief,LT,8-9-4-7-6-10-11,AM,E\n0615,0715,LFE OPFOR Brief,CCR,11,AM,E\n0700,0700,2 Day Out Intel Product Drop,N/A,4-23,AM,P\n0700,1500,SOF Shift Show,PAEI Tower,40,AM,P\n0800,0845,MXG Standup,T-Dome,19,AM-PM,P\n0800,0830,Next Day OPFOR Coord,CCR,20-10-21-22-23-24-12-3,AM,P\n0830,0900,Next Day Post-LFE JECG Coord,CCR,6-23-26,AM,P\n0830,0845,LFE FAA Recovery Discussion,CTS RM-191,27-28-29-30,AM,E\n0900,0930,DF/CC Standup,CCR,9-31-19-32,AM-PM,P\n0900,0945,Intel Coord Meeting,MPC 2,4-23-33,AM,P\n1030,1045,Next Day Initial Product Review,AMPC,1-2-4-5-6,AM,P\n1100,1130,Next Day DIM (Pre-Frag),ST,1-2-3-4-5-6-7,PM,P\n1120,1150,JECG Sync Meeting,CCR,23-20-28-10-21-22,AM-PM,P\n1200,1230,Next Day MAM (Frag),ST,1-2-3-4-5-6,PM,P\n1200,2000,Next Day Non-STO Vul Coord,MPC 2,13,PM,P\n1200,1300,LFE Mass Brief,LT,8-9-4-7-6-10-11,PM,E\n1215,1315,LFE OPFOR Brief,CCR,11,PM,E\n1300,1300,2 Day Out Intel Product Drop,N/A,4-23,PM,P\n1300,1400,Next Day GCAM (Final Product Review),AMPC,9-1-2-3-4-5-6-10,AM,P\n1300,1415,LFE OPFOR Pre-Pair/Pre-Mass,DDS 3,11,AM,E\n1300,1345,LFE Blue Shot Pre-Pair,LT,34-35-36,AM,E\n1315,1345,FAA Conference Call,CTS RM-191,28-10-29-30,AM-PM,E\n1345,1400,Army Range Control Conf Call,CTS RM-191,39-37-38,AM-PM,P\n1345,1415,LFE Blue Pre-Mass,LT,8-6,AM,E\n1400,1430,Next Day OPFOR Coord,CCR,20-10-21-22-23-24-12-3,PM,P\n1415,1545,LFE Mass Debrief,LT,8-9-4-6-10-11,AM,E\n1430,1500,Next Day Post-LFE JECG Coord,CCR,6-23-26,PM,P\n1500,1500,SOF Change-Over,PAEI Tower,40,AM-PM,P\n1600,1645,Intel Coord Meeting,MPC 1,4-23-33,PM,P\n1605,1615,LFE MiG-1/SAM-1 Data Presentation,LT,8-9-4-6-10-11,AM,E\n1615,1645,LFE DFP Development,LT,9-8,AM,E\n1615,1645,LFE JECG Debrief,AMPC,11-23-6-10,AM,E\n1615,1645,LFE OPFOR Debrief,CCR,11,AM,E\n1630,1645,Next Day Initial Product Review,ST,1-2-4-5-6,PM,P\n1645,1700,LFE DFP Presentation,LT,8-9-4-6-10,AM,E\n1845,2000,LFE OPFOR Pre-Pair/Pre-Mass,DDS 3,11,PM,E\n1900,2000,Next Day GCAM (Final Product Review),ST,9-1-2-3-4-5-6-10,PM,P\n1900,1945,LFE Blue Shot Pre-Pair,LT,34-35-36,PM,E\n1945,2015,LFE Blue Pre-Mass,LT,8-6,PM,E\n2015,2145,LFE Mass Debrief,LT,8-9-4-6-10-11,PM,E\n2205,2215,LFE MiG-1/SAM-1 Data Presentation,LT,8-9-4-6-10-11,PM,E\n2215,2245,LFE DFP Development,LT,9-8,PM,E\n2215,2245,LFE OPFOR Debrief,AMPC,11,PM,E\n2215,2245,LFE JECG Debrief,APO RM-123,11-23-6-10,PM,E\n2245,2300,LFE DFP Presentation,LT,8-9-4-6-10,PM,E"
const attendeeConvert = (row) => {
  const converter = {
    1: "Msn/CC",
    2: "Team Lead",
    3: "Tac Mentor",
    4: "Intel",
    5: "MPC Rep",
    6: "Airboss",
    7: "Wx",
    8: "LFE Participant",
    9: "DF/CC",
    10: "Ops Sup",
    11: "OPFOR",
    12: "TTF",
    13: "As Required",
    14: "CAS Msn/CC",
    15: "JTAC",
    16: "SOLE",
    17: "ASOC",
    18: "LNO",
    19: "Mx Rep",
    20: "Plan Airboss",
    21: "MiG-1",
    22: "SAM-1",
    23: "JECG Intel",
    24: "Augmentee",
    25: "TTF",
    26: "Post LFE Vul Rep",
    27: "CTS ADO",
    28: "Execution Airboss",
    29: "FAA",
    30: "ATC",
    31: "DETCO Rep",
    32: "Eielson Group Rep",
    33: "GLO",
    34: "RTO",
    35: "U.S. Esc Flt Lead",
    36: "Blue w/ Shots to Pair",
    37: "SOF SME",
    38: "JFIRES SME",
    39: "RDO",
    40: "Supervisor of Flying",
  };
  const attendeeArray = row.split("-");
  return attendeeArray.map((attendee) => converter[attendee]).join(", ");
};

function zoomOutMobile() {
  var viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.content = "initial-scale=0.1";
    viewport.content = "width=650";
  }
}

export default function DenseTable({ filter }) {
  const [rows, setRows] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    zoomOutMobile();
    const titles = myCSV.slice(0, myCSV.indexOf("\n")).split(",");
    const csvRows = myCSV.slice(myCSV.indexOf("\n") + 1).split("\n");
    setRows(
      csvRows.map((row) => {
        const values = row.split(",");
        return titles.reduce(
          (object, curr, i) => ((object[curr] = values[i]), object),
          {}
        );
      })
    );
  }, []);

  const getRowStyle = (row) => {
    let backColor = row["Plan/Exec"] === "P" ? "#1922E1" : "#bd0f0f";
    return {
      backgroundColor: backColor,
    };
  };

  const filterRows = (rows) => {
    let filteredRows = rows.filter((row) =>
      attendeeConvert(row.Attendees)
        .split(", ")
        .some((r) => filter.roles.includes(r) || r === "")
    );

    if (!filter.plan)
      filteredRows = filteredRows.filter((row) => row["Plan/Exec"] !== "P");
    if (!filter.exec)
      filteredRows = filteredRows.filter((row) => row["Plan/Exec"] !== "E");
    if (!filter.AM)
      filteredRows = filteredRows.filter(
        (row) => !row["Vul"].includes("AM") || row["Vul"].includes("PM")
      );
    if (!filter.PM)
      filteredRows = filteredRows.filter(
        (row) => !row["Vul"].includes("PM") || row["Vul"].includes("AM")
      );
    if (!filter.PM && !filter.AM)
      filteredRows = filteredRows.filter((row) => false);
    return filteredRows;
  };

  const exportPDF = (rows) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "RF-A 21-3 Schedule (MSOEv7)";
    const headers = [
      ["Time", "Event", "Vul", "Shift", "Location", "Attendees"],
    ];

    const data = filterRows(rows).map((row) => [
      `${row.Start}-${row.End}`,
      row.Event,
      row["Plan/Exec"] === "P" ? "Plan " : "Execution",
      row.Vul,
      row.Location,
      attendeeConvert(row.Attendees),
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("schedule.pdf");
  };

  return (
    <Grid container>
      <Grid container>
        <Grid item xs={4} align="left">
          <Button
            variant="contained"
            color="primary"
            onClick={() => exportPDF(rows)}
          >
            Download Schedule
          </Button>
        </Grid>
        <Grid
          item
          xs={8}
          align="right"
          style={{
            marginTop: "5px",
          }}
        >
          <Typography
            variant="h5"
            style={{
              color: "white",
              backgroundColor: "#1922E1",
            }}
            display="inline"
          >
            Blue: Planning
          </Typography>{" "}
          <Typography
            variant="h5"
            style={{
              color: "white",
              backgroundColor: "#bd0f0f",
            }}
            display="inline"
          >
            Red: Execution
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerCell}>Time</TableCell>
              <TableCell className={classes.headerCell}>Event</TableCell>
              {filter.AM && filter.PM ? (
                <TableCell className={classes.headerCell}>Shift</TableCell>
              ) : (
                <></>
              )}
              <TableCell className={classes.headerCell}>Location</TableCell>
              <TableCell className={classes.headerCell}>Attendees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterRows(rows).map((row) => (
              <TableRow style={getRowStyle(row)}>
                <TableCell className={classes.cell}>
                  <div>{`${row.Start}-`}</div>
                  <div>{row.End}</div>
                </TableCell>
                <TableCell className={classes.cell}>{row.Event}</TableCell>
                {filter.AM && filter.PM ? (
                  <TableCell className={classes.cell}>{row.Vul}</TableCell>
                ) : (
                  <></>
                )}
                <TableCell className={classes.cell}>{row.Location}</TableCell>
                <TableCell className={classes.cell}>
                  {attendeeConvert(row.Attendees)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}
