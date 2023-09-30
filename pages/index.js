import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import React from 'react'
import DarkModeContext from '../components/dark-mode/dark-mode.context'
import DarkModeToggle from '../components/dark-mode/dark-mode.toggle'
import { fetchFeedToday } from '../components/near-earth-objects/near-earth-objects'
import NearEarthObjectsList from '../components/near-earth-objects/near-earth-objects.list'
import NearEarthObjectsTable from '../components/near-earth-objects/near-earth-objects.table'
import nasaLogo from '../public/nasa_logo.png'
import styles from '../styles/Home.module.css'

export async function getServerSideProps(context) {
  const data = await fetchFeedToday()

  // Pass data to the page via props
  return { props: { data } }
}

export default function Home({ data }) {
  // prettier-ignore
  const [mode, setMode] = React.useState('light')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    []
  )

  // const theme = useTheme()
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  )
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <DarkModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <div className={styles.container}>
          <main className={styles.main}>
            <Image src={nasaLogo} alt="Picture of NASA logo" width={250} height={200} />
            <Typography variant="h3">Near Earth Objects Today</Typography>
            <DarkModeToggle />
            {matches ? (
              <NearEarthObjectsTable neodata={data}></NearEarthObjectsTable>
            ) : (
              <NearEarthObjectsList neodata={data}></NearEarthObjectsList>
            )}
          </main>
        </div>
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}
