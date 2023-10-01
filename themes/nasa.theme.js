// Taken from https://nasa.github.io/nasawds-site/components/colors/

const blue = '#105bd8'
const blueDarker = '#0b3d91'
const blueDarkest = '#061f4a'
const grayDark = '#323a45'
const grayLight = '#aeb0b5'
const teal = '#02bfe7'
const red = '#dd361c'

export const NasaLightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: blueDarker,
    },
    secondary: {
      main: red,
    },
  },
  typography: {
    fontFamily: ['"VT323"', 'monospace'].join(','),
  },
}

export const NasaDarkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: blue,
    },
    secondary: {
      main: teal,
    },
  },
  typography: {
    fontFamily: ['"VT323"', 'monospace'].join(','),
  },
}
