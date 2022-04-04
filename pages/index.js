import Head from "next/head";
import { Box } from "@mui/system";
import styles from "../styles/Home.module.css";
import NewsRetrieve from "../components/NewsRetrieve";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NewzWorthy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        style={{
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Box
          style={{
            maxWidth: "100%",
            backgroundColor: "whitesmoke",
            padding: "5px",
          }}
        >
          <NewsRetrieve />
        </Box>
      </Box>
    </div>
  );
}
