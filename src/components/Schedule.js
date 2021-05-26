import React, { useState, createContext } from "react";
import Table from "./Table";
import Filter from "./Filter";
import { Button, Grid } from "@material-ui/core";

export default function Schedule() {
  const [showFilter, toggleFilter] = useState(false);
  const [filterSelection, setFilterSelection] = useState({
    shift: "",
    planExec: "",
    roles: [
      "Msn/CC",
      "DF/CC",
      "Tac Mentor",
      "Ops Sup",
      "Team Lead",
      "Intel",
      "JECG Intel",
      "Airboss",
      "Plan Airboss",
      "Execution Airboss",
      "MPC-Rep",
      "Wx",
      "LFE Participant",
      "Blue w/ Shots to Pair",
      "CAS Msn/CC",
      "CAS Participant",
      "2202 CAS Vul Participant",
      "2205 CAS Vul Participant",
      "JTAC",
      "SOCLE",
      "ASOC",
      "TTF",
      "LNO",
      "MiG-1",
      "SAM-1",
      "OPFOR",
      "Mx Rep",
      "DETCO Rep",
      "Post LFE Vul Rep",
      "Augmentee",
      "CTS ADO",
      "FAA",
      "ATC",
      "GLO",
      "RDO",
      "RTO",
      "Eielson Group Rep",
      "U.S. Esc Flt Lead",
      "Trigger",
      "JD",
    ],
  });

  return (
    <Grid>
      <article style={showFilter ? {} : { display: "none" }}>
        <FilterContext.Provider value={setFilterSelection}>
          <Filter />
        </FilterContext.Provider>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleFilter(!showFilter)}
          style={{
            maxWidth: "200px",
            maxHeight: "30px",
            minWidth: "200px",
            minHeight: "30px",
            marginTop: "10px",
          }}
        >
          Hide Filter
        </Button>
      </article>
      <article style={showFilter ? { display: "none" } : {}}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => toggleFilter(!showFilter)}
          style={{
            maxWidth: "200px",
            maxHeight: "30px",
            minWidth: "200px",
            minHeight: "30px",
            marginTop: "10px",
          }}
        >
          Filter Schedule
        </Button>
      </article>
      <Table filter={filterSelection} />
    </Grid>
  );
}

export const FilterContext = createContext();
