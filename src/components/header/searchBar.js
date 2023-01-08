import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { getStorageItem } from "../../utils/sessionStorage";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  marginLeft: 0,
  width: "100%",
  // background: "rgba(255, 255, 255, 0.2)",
  border: "1px solid rgba(229, 229, 234, 0.2)",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FECC08",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    color: "rgba(255, 255, 255, 0.6)",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "300",
    fontSize: "14px",
    lineHeight: "20px",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
    },
  },
}));

const SearchBar = (props) => {
  let timeoutID;
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { onSearchTextChange } = props;

  const getSearchResults = (method, url, data) => {
    axios({
      method: method,
      url: url,
      headers: {
        Authorization: "Bearer " + getStorageItem('token'),
        "Content-Type": "application/json",
      },
      data: data,
    }).then((response) => {
      // console.log(response)
    }).catch((error) => {
      // console.log('error', error);
    });
  }

  const onSearchTextUpdate = (inputSearch) => {
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      onSearchTextChange(inputSearch);
      setSearchText(inputSearch);
      const path = window.location.pathname;
      if (!path.includes("/search")) {
        navigate("/search");
      }
    }, 1000);
  }

  // useEffect(() => {
  //   if (searchText) {
  //     getSearchResults("POST",
  //       global.config.ROOTURL.prod + "/auth/name-search", {
  //       searchText: searchText,
  //       pageNumber: 1,
  //       pagePerSize: global.config.pagePerSize,
  //     })
  //   }
  // }, [searchText])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          autoFocus={true}
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => onSearchTextUpdate(e.target.value)}
          // onKeyDownCapture={(e) => onSearchTextUpdate(e.target.value)}
        />
      </Search>
    </Box>
  );
};

export default SearchBar;
