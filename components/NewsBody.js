import React from "react";
import { Box } from "@mui/system";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import { Skeleton } from "@mui/material";
import styles from "../styles/Home.module.css";
import NewsArticles from "../newsStories.json";

const NewsBody = (props) => {
  let newsArticles = NewsArticles;
  let typography1 = "";
  let typography2 = "";
  let showLoadingContent = false;

  // sets up a skeleton for news while loading
  const SkeletonNews = () => {
    return (
      <Paper>
        <Box
          style={{
            padding: "5px",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          <Box
            style={{
              maxWidth: "50%",
              minWidth: "320px",
            }}
          >
            <Skeleton variant="rectangular" width={320} height={240} />
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
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Box>
        </Box>
      </Paper>
    );
  };

  // while loading, returns skeleton
  if (props.isLoading) {
    return Array.apply(null, { length: 5 }).map((item, index) => (
      <SkeletonNews key={index} />
    ));
  }

  // returns error notification if website cannot be reached
  const LoadingError = (props) => {
    if (showLoadingContent) {
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

  if (props.error || props.news === undefined) {
    showLoadingContent = true;
    typography1 = "Error! Could not access news API";
    typography2 =
      "Locally cached, older news stories, have been loaded for demonstration purposes.";
  } else if (props.news.articles.length === 0) {
    showLoadingContent = true;
    typography1 = "No results returned for search entry.";
    typography2 = "Please check spelling or retry another search.";
    newsArticles = props.news.articles;
  } else {
    newsArticles = props.news.articles;
  }
  return (
    <Box>
      <LoadingError typography1={typography1} typography2={typography2} />
      {newsArticles.map((item, index) => (
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

export default NewsBody;
