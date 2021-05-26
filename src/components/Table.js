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
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cell: {
    color: "white",
    border: "2px solid black",
    textAlign: "center",
  },
  headerCell:{
    textAlign: "center",
  }
});

const myCSV =
  "Start,End,Event,Location,Attendees,Vul,Plan/Exec\n0500,0530,Next Day DIM (Pre-Frag),MPC 1,1-2-3-4-5-6-7,AM,P\n0600,0630,Next Day MAM (Frag),MPC 1,1-2-3-4-5-6,AM,P\n0600,0700,LFE Mass Brief,MBR,8-9-4-7-6-10-11,AM,E\n0615,0715,LFE OPFOR Brief,CCR,11,AM,E\n0630,0700,LFE CAS VUL Brief (2202),CPT Front,12,AM,E\n0630,0700,LFE CAS VUL Brief (2205),CPT Back,13,AM,E\n0700,1330,SOF Shift Show,PAEI Tower,0,AM,P\n0730,0830,Next Day CAS Vul Coord (2202),CPT FRONT,14-15-16-17-18,AM,P\n0730,0830,Next Day CAS Vul Coord (2205),CPT BACK,14-15-16-17-18,AM,P\n0800,0800,Next Day ATO Change 1 Push,N/A,4,AM,P\n0800,0845,MXG Standup,T-Dome,19,AM,P\n0800,0830,Next Day JECG Coord,CCR,20-10-21-22-23-24-25-3,AM,P\n0830,0900,Next Day Post-LFE Coord,MPC 2,26-6-23,AM,P\n0830,0900,LFE FAA Recovery Discussion,CTS RM-172,27-28-29-30,AM,E\n0900,0930,DF/CC Standup,CCR,9-31-19-32,AM,P\n0900,0940,Intel Coord Meeting,MBR,4-33,AM,P\n1000,1100,LFE Vul on Display,MBR,0,AM,E\n1000,1000,Next Day ATO Change 2 Push,N/A,4,AM,P\n1030,1045,Next Day Initial Product Review,MPC 1,1-2-4-5-6,AM,P\n1130,1200,JECG Sync Meeting,CCR,23-20-28-10-21-22,AM,P\n1300,1415,LFE OPFOR Pre-Pair/Pre-Mass,DDS 3,11,AM,E\n1300,1400,Next Day GCAM (Final Product Review),MPC 1,9-1-2-4-5-6-10,AM,P\n1300,1300,2 Day Out Intel Product Drop,N/A,4,AM,P\n1315,1400,LFE Blue Shot Pre-Pair,MBR,34-35-36,AM,E\n1315,1345,FAA Conference Call,CTS RM-172,6-10-29-30,AM,P\n1330,1330,SOF Change-Over,PAEI Tower,0,AM,P\n1345,1400,Army Range Control Conf Call,CTS RM-172,39-37-38,AM,P\n1400,1430,LFE Blue Pre-Mass,MBR,6-8,AM,E\n1415,1445,Next Day CAS Plan Brief,CPT Back,14-40-6-10,AM,P\n1430,1600,LFE Mass Debrief,MBR,8-9-4-6-10-11,AM,E\n1445,1600,LFE CAS Vul Debrief (2202),CPT Front,12,AM,E\n1445,1600,LFE CAS Vul Debrief (2205),CPT Back,13,AM,E\n1620,1630,LFE MiG-1/SAM-1 Data Presentation,MBR,8-9-4-6-10-11,AM,E\n1630,1730,LFE DFP Development,MBR,8-9,AM,E\n1630,1700,LFE JECG Debrief,OPS,11-23-6-10,AM,E\n1630,1700,LFE OPFOR Debrief,MPC 1,11,AM,E\n1730,1750,LFE DFP Presentation,MBR,8-9-4-6-10,AM,E";

const attendeeConvert = (row) => {
  const converter = {
    1: "Msn/CC",
    2: "Team Lead",
    3: "Tac Mentor",
    4: "Intel",
    5: "MPC-Rep",
    6: "Airboss",
    7: "Wx",
    8: "LFE Participant",
    9: "DF/CC",
    10: "Ops Sup",
    11: "OPFOR",
    12: "2202 CAS Vul Participant",
    13: "2205 CAS Vul Participant",
    14: "CAS Msn/CC",
    15: "JTAC",
    16: "SOCLE",
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
    37: "Trigger",
    38: "JD",
    39: "RDO",
    40: "CAS Participant",
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

  const filterRows = (rows) =>
    rows.filter((row) =>
      attendeeConvert(row.Attendees)
        .split(", ")
        .some((r) => filter.roles.includes(r))
    );

  return (
    <Grid item xs={12}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.headerCell}>Time</TableCell>
            <TableCell className={classes.headerCell}>Event</TableCell>
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
              <TableCell className={classes.cell}>{row.Location}</TableCell>
              <TableCell className={classes.cell}>
                {attendeeConvert(row.Attendees)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}
