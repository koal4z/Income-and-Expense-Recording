import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function MenuHam() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        size="large"
        color="secondary"
        onClick={handleClick}
      >
        <MenuIcon style={{ fontSize: "3rem" }} />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link style={{ textDecoration: "none" }} to="/login">
          <MenuItem onClick={handleClose}>
            <h3 style={{ color: "#f50057" }}>Login</h3>
          </MenuItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <MenuItem onClick={handleClose}>
            <h3 style={{ color: "#f50057" }}>Sign Up</h3>
          </MenuItem>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/">
          <MenuItem onClick={handleClose}>
            <h3 style={{ color: "#f50057" }}>Daily Board</h3>
          </MenuItem>
        </Link>
      </Menu>
    </>
  );
}
