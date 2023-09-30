import { ThemeProvider, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React from "react";
import { fetchFeedToday } from "../components/near-earth-objects/near-earth-objects";
import NearEarthObjectsList from "../components/near-earth-objects/near-earth-objects.list";
import NearEarthObjectsTable from "../components/near-earth-objects/near-earth-objects.table";
import nasaLogo from "../public/nasa_logo.png";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const data = await fetchFeedToday();

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Image
            src={nasaLogo}
            alt="Picture of NASA logo"
            width={250}
            height={200}
          />
          <p className={styles.description}>Near Earth Objects Today</p>
          {matches ? (
            <NearEarthObjectsTable neodata={data}></NearEarthObjectsTable>
          ) : (
            <NearEarthObjectsList neodata={data}></NearEarthObjectsList>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
