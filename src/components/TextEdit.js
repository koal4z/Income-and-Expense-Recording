import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(-0.8),
      paddingLeft: "5px"
    }
  }
}));

export default function TextEdit(props) {
  const classes = useStyles();

  return (
    <div style={{ marginLeft: "2%", width: " 70%" }}>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          onChange={(e) => props.change(e)}
          id="standard-size-small"
          size="small"
          value={props.value}
          name={props.name}
        />
      </form>
    </div>
  );
}
