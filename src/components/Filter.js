import React, { useContext } from "react";
import { Checkbox, Grid, TextField } from "@material-ui/core";
import { FilterContext } from "./Schedule";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Filter() {
  const setFilter = useContext(FilterContext);

  const roles = [
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
  ];

  return (
    <Grid item xs={12}>
      <Autocomplete
        multiple
        id="roles-checkboxes"
        options={roles}
        disableCloseOnSelect
        getOptionLabel={(option) => option}
        onChange={(event, value) =>
          setFilter({ shift: "AM", planExec: "P", roles: value })
        }
        defaultValue={roles.map((role) => role)}
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
    </Grid>
  );
}
