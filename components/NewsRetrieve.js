import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";
import { NewspaperSharp } from "@mui/icons-material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import NewsBody from "./NewsBody";
import useNews from "../utils/extApiHook";

const NewsRetrieve = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [category, setCategory] = React.useState("Top Headlines");

  function getCurrentDate() {
    const currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    // format = 2022-03-13
    let formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

  const [newsObject, setNewsObject] = React.useState({
    mainChoice: "top-headlines",
    secondaryChoice: null,
    date: getCurrentDate(),
  });

  const menuArray = [
    "Top Headlines",
    "Finance",
    "Politics",
    "Sports",
    "Entertainment",
  ];
  // styled component section
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
      },
    },
  }));

  React.useEffect(() => {}, [newsObject]);

  const urlObjSet = (newsCategory) => {
    let lowerCaseCategory = newsCategory.toString().toLowerCase();
    let mainCategory = "";
    if (lowerCaseCategory === "top headlines") {
      mainCategory = "top-headlines";
    } else {
      mainCategory = "everything";
    }
    const topicObj = {
      mainChoice: mainCategory,
      secondaryChoice: lowerCaseCategory,
      date: getCurrentDate(),
    };
    return topicObj;
  };

  const { news, isLoading, isError } = useNews(newsObject);

  function handleSearchOnEnter(Event) {
    if (Event.charCode === 13 && Event.target.value !== "") {
      let word = Event.target.value.toString();
      word = word.charAt(0).toUpperCase() + word.slice(1);
      setCategory(word);
      setNewsObject(urlObjSet(word));
    }
  }

  function handleMenuClick(Event) {
    setAnchorEl(Event.currentTarget);
  }

  const handleClose = (e) => {
    setAnchorEl(null);
    if (
      e.target.innerText !== null &&
      e.target.innerText !== undefined &&
      e.target.innerText !== ""
    ) {
      setCategory(e.target.innerText);
      setNewsObject(urlObjSet(e.target.innerText));
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            id={"burger-button"}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open-drawer"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuRoundedIcon />
          </IconButton>
          <Menu
            id="cat-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "burger-button",
            }}
          >
            {menuArray.map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>
                {item}
              </MenuItem>
            ))}
          </Menu>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 1 }}
            // sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            NewzWorthy
          </Typography>
          <NewspaperSharp></NewspaperSharp>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper aria-label="search-icon">
              <SearchRoundedIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search NewzWorthy…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={handleSearchOnEnter}
            ></StyledInputBase>
          </Search>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          marginLeft: "5%",
          marginRight: "5%",
          padding: "5px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            textAlign: "center",
          }}
        >
          {category}
        </Typography>
      </Box>
      <NewsBody news={news} isLoading={isLoading} isError={isError} />
    </Box>
  );
};

export default NewsRetrieve;
