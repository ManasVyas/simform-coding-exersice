import React from "react";
import "./Header.css";
import { IconButton, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import avatar from "../../images/dsc0181.jpg";

const Header = () => {
  return (
    <header>
      <div className="header_info">
        <strong>Simform Form Generator</strong>
      </div>
      <div className="header_search">
        <IconButton>
          <SearchIcon className="search_icon" />
        </IconButton>
        <input type="text" name="" placeholder="search..." />
      </div>
      <div className="header_right">
        <IconButton>
          <Avatar src={avatar} />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
