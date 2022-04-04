import React from "react";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import styles from "../styles/Home.module.css";

const NewsBody = (props) => {
  const typography1 = "Error! Could not access news API";
  const typography2 =
    "Locally cached, older news stories, have been loaded for demonstration purposes.";
  const typography3 = "No results returned for search entry.";
  const typography4 = "Please check spelling or retry another search.";
  const [loadError, setLoadError] = React.useState(false);

  if (props.isLoading) {
    return (
      <div className={styles.container}>
        <main className="App">
          <Skeleton variant="text" />
        </main>
      </div>
    );
  }

  const LoadingError = (props) => {
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
  };

  if (props.error || props.news === undefined) {
    return <LoadingError typography1={typography1} typography2={typography2} />;
  } else if (props.news.data.articles.length === 0) {
    return <LoadingError typography1={typography3} typography2={typography4} />;
  } else {
    return (
      <Box>
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
  }
};

export default NewsBody;
