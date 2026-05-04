import { createTheme } from '@mui/material/styles'

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          background: { default: '#0a0a0f', paper: '#12121a' },
          text: { primary: '#e0e0e8', secondary: 'rgba(255,255,255,.6)' },
          primary: { main: '#7c6df0' },
          secondary: { main: '#4ecdc4' },
          divider: 'rgba(255,255,255,.06)',
        }
      : {
          background: { default: '#f4f5f7', paper: '#ffffff' },
          text: { primary: '#1a1a2e', secondary: 'rgba(0,0,0,.6)' },
          primary: { main: '#7c6df0' },
          secondary: { main: '#4ecdc4' },
          divider: 'rgba(0,0,0,.08)',
        }),
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#7c6df0',
        },
      },
    },
  },
})

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode))
