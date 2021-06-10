import React, { useState, useContext } from "react";
import { Checkbox, Grid, TextField, Button } from "@material-ui/core";
import { FilterContext } from "./Schedule";
import Autocomplete from "@material-ui/lab/Autocomplete";

const roleOptions = [
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
];

export default function Filter({ currentFilter }) {
  const setFilter = useContext(FilterContext);
  const [filterState, setfilterState] = useState(currentFilter);
  const [values, setValues] = useState(roleOptions);

  const getStyle = (category) => ({
    minWidth: "100px",
    minHeight: "30px",
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "5px",
    backgroundColor: filterState[category] ? "#089404" : "#bd0f0f",
    textDecoration: filterState[category] ? "none" : "line-through",
  });

  const handleClick = (category) => {
    setFilter({ ...filterState, [category]: !filterState[category] });
    setfilterState({ ...filterState, [category]: !filterState[category] });
  };

  const handleChange = (e, v) => {
    setValues(v);
    setFilter({ ...filterState, roles: v });
    setfilterState({ ...filterState, roles: v });
  };

  const updateValues = (method) => {
    let updatedRoles = method === "select" ? roleOptions : [];
    setValues(updatedRoles);
    setFilter({ ...filterState, roles: updatedRoles });
    setfilterState({ ...filterState, roles: updatedRoles });
  };

  return (
    <Grid container style={{ backgroundColor: "white", paddingBottom: "10px" }}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          style={getStyle("AM")}
          onClick={() => handleClick("AM")}
        >
          AM
        </Button>
        <Button
          variant="contained"
          style={getStyle("PM")}
          onClick={() => handleClick("PM")}
        >
          PM
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          style={getStyle("plan")}
          onClick={() => handleClick("plan")}
        >
          Plan
        </Button>
        <Button
          variant="contained"
          style={getStyle("exec")}
          onClick={() => handleClick("exec")}
        >
          Exec
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          multiple
          id="roles-checkboxes"
          options={roleOptions}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          onChange={handleChange}
          defaultValue={roleOptions.map((role) => role)}
          value={values}
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <Checkbox style={{ marginRight: 8 }} checked={selected} />
              {option}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Desired Roles"
              placeholder="Desired Roles"
            />
          )}
        />
        <Button
          variant="contained"
          onClick={() => updateValues("select")}
          style={{ backgroundColor: "#089404", marginTop: "2px" }}
        >
          Select All Roles
        </Button>
        <Button
          variant="contained"
          onClick={() => updateValues("clear")}
          style={{
            backgroundColor: "#bd0f0f",
            marginLeft: "5px",
            marginTop: "2px",
          }}
        >
          Clear All Roles
        </Button>
      </Grid>
    </Grid>
  );
}
