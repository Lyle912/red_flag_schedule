import React, { useState, createContext } from "react";
import Table from "./Table";
import Filter from "./Filter";
import { Button, Grid } from "@material-ui/core";

export default function Schedule({ match }) {
  const [showFilter, toggleFilter] = useState(false);
  const [filterSelection, setFilterSelection] = useState({
    AM: match.params.shift.includes("am") ? true : false,
    PM: match.params.shift.includes("pm") ? true : false,
    plan: true,
    exec: true,
    roles: [
      "DF/CC",
      "Msn/CC",
      "Team Lead",
      "Ops Sup",
      "Tac Mentor",
      "Airboss",
      "Plan Airboss",
      "Execution Airboss",
      "MiG-1",
      "SAM-1",
      "Augmentee",
      "OPFOR",
      "TTF",
      "JECG Intel",
      "Intel",
      "LFE Participant",
      "MPC-Rep",
      "CAS Msn/CC",
      "CAS Participant",
      "2202 CAS Vul Participant",
      "2205 CAS Vul Participant",
      "JTAC",
      "SOLE",
      "ASOC",
      "LNO",
      "DETCO Rep",
      "Eielson Group Rep",
      "GLO",
      "Mx Rep",
      "Wx",
      "Post LFE Vul Rep",
      "Blue w/ Shots to Pair",
      "RTO",
      "U.S. Esc Flt Lead",
      "FAA",
      "ATC",
      "CTS ADO",
      "RDO",
      "Trigger",
      "JD",
    ],
  });

  return (
    <Grid>
      <article style={showFilter ? {} : { display: "none" }}>
        <FilterContext.Provider value={setFilterSelection}>
          <Filter currentFilter={filterSelection} />
        </FilterContext.Provider>
      </article>
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
        {showFilter ? "Hide Filter" : "Filter Schedule"}
      </Button>
      <Table filter={filterSelection} />
    </Grid>
  );
}

export const FilterContext = createContext();
