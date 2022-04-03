import React from "react";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import useNews from "../utils/extApiHook";
import styles from "../styles/Home.module.css";

const Stories = (props) => {
  const [typography1, setTypography1] = React.useState("");
  const [typography2, setTypography2] = React.useState("");

  // function dateFormat() {
  //   const currentDate = new Date();
  //   let day = currentDate.getDate();
  //   let month = currentDate.getMonth() + 1;
  //   let year = currentDate.getFullYear();
  //   // format = 2022-03-13
  //   let formattedDate = year + "-" + month + "-" + day;
  //   return formattedDate;
  // }

  // const params = {
  //   mainChoice: "top-headlines",
  //   secondaryChoice: "sports",
  //   date: dateFormat(),
  // };

  // const { news, isLoading, isError } = useNews(params);

  if (props.isLoading)
    return (
      <div className={styles.container}>
        <main className="App">
          <Skeleton variant="text" />
        </main>
      </div>
    );
  if (props.isError) return <h1>Something went wrong!</h1>;
  // if (isError) {
  //   setTypography1("Error! Could not access news API");
  //   setTypography2(
  //     "Locally cached, older news stories, have been loaded for demonstration purposes."
  //   );
  //   return <h1>Something went wrong!</h1>;
  // }
  // if (!isLoading && !isError) {
  //   console.log("succeeded");
  //   if (news.length === 0) {
  //     setTypography1("No results returned for search entry!");
  //     setTypography2("Please check spelling or retry another search.");
  //   }
  // }

  const LoadingError = (props) => {
    if (
      (statusSelector === "succeeded" && storiesSelector.length === 0) ||
      statusSelector === "failed"
    ) {
      return (
        <Paper
          style={{
            marginTop: "10px",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              style={{
                color: "red",
              }}
            >
              {props.typography1}
            </Typography>
            <Typography variant="h6">{props.typography2}</Typography>
          </Box>
        </Paper>
      );
    } else {
      return null;
    }
  };

  return (
    <Box>
      {/* <LoadingError typography1={typography1} typography2={typography2} /> */}
      {props.news.data.articles.map((item, index) => (
        <Paper key={index}>
          <Box
            style={{
              padding: "5px",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "30px",
            }}
            key={index}
          >
            <Box
              style={{
                maxWidth: "50%",
                minWidth: "320px",
              }}
            >
              <img
                style={{
                  maxWidth: "100%",
                }}
                key={index}
                src={item.urlToImage ? item.urlToImage : "/no-image.png"}
              ></img>
            </Box>
            <Box
              style={{
                minWidth: "5px",
              }}
            />
            <Box
              style={{
                maxWidth: "48%",
                minWidth: "320px",
              }}
            >
              <Typography variant="h5">
                <a href={item.url}>{item.title}</a>
              </Typography>
              <Typography>{item.description}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Stories;
