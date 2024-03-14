'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import * as colors from '@mui/material/colors';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: colors.blueGrey,
    secondary: colors.purple,
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        color: 'inherit',
      }
    },
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;