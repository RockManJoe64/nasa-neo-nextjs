import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'
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
import nasaLogo from '../public/nasa_logo_pixelated.png'
import { NasaDarkTheme, NasaLightTheme } from '../themes/nasa.theme'

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
  const theme = React.useMemo(() => createTheme(mode === 'light' ? NasaLightTheme : NasaDarkTheme), [mode])
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <DarkModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image src={nasaLogo} alt="Picture of NASA logo" width={200} height={200} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h4">Near Earth Objects Today</Typography>
          </Box>
          <DarkModeToggle />
          {matches ? (
            <NearEarthObjectsTable neodata={data}></NearEarthObjectsTable>
          ) : (
            <NearEarthObjectsList neodata={data}></NearEarthObjectsList>
          )}
        </Stack>
      </ThemeProvider>
    </DarkModeContext.Provider>
  )
}
