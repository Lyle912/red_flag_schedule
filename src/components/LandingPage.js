import React from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import RedFlag from "../images/RedFlag.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const getStyle = () => ({
    minWidth: "150px",
    minHeight: "30px",
    marginTop: "5px",
    marginBottom: "5px",
  });

  return (
    <Grid>
      <Typography variant="h2" style={{ color: "white" }}>
        Welcome to Red Flag Alaska 21-2
      </Typography>
      <img
        className="red-flag-logo"
        src={RedFlag}
        alt="Red Flag Logo"
        style={{ height: "200px", margin: "20px" }}
      />
      <Typography variant="h5" style={{ color: "white" }}>
        Select your desired schedule
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Link to="/schedule/am">
            <Button variant="contained" style={getStyle()}>
              AM
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Link to="/schedule/pm">
            <Button variant="contained" style={getStyle()}>
              PM
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link to="/schedule/ampm">
            <Button variant="contained" style={getStyle()}>
              Combined
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
