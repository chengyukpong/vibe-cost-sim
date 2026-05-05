import { useState, useMemo } from 'react'
import { ThemeProvider, CssBaseline, Container, Box, Card, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import Header from './components/Header'
import ControlPanel from './components/ControlPanel'
import DonutChart from './components/DonutChart'
import BreakdownTable from './components/BreakdownTable'
import Assumptions from './components/Assumptions'
import { useCostCalculator } from './hooks/useCostCalculator'
import { createAppTheme } from './theme'

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('theme') || 'dark')
  const theme = useMemo(() => createAppTheme(mode), [mode])
  const { params, update, results } = useCostCalculator()

  const toggleTheme = () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    localStorage.setItem('theme', next)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, pb: { xs: 7, md: 10 } }}>
        <Header mode={mode} onToggle={toggleTheme} />

        {/* Controls at the top */}
        <Box sx={{ mt: 3 }}>
          <ControlPanel params={params} update={update} hrRate={results.hrRate} />
        </Box>

        {/* Total + Donut left, Table right */}
        <Box sx={{ display: 'flex', gap: 3, mt: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Left: Total widget + Donut stacked */}
          <Box sx={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Card
              variant="outlined"
              sx={{
                background: 'linear-gradient(135deg, rgba(124,109,240,.12), rgba(78,205,196,.12))',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                px: 4,
                py: 3,
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <CalendarMonthIcon sx={{ fontSize: 32, color: '#7c6df0' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.25}>
                  Monthly Total
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: '#7c6df0', fontSize: { xs: 26, md: 32 }, lineHeight: 1.1 }}
                >
                  {fmt(results.totalMo)}
                </Typography>
              </Box>
              <Box sx={{ width: 1, alignSelf: 'stretch', bgcolor: 'divider' }} />
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" fontWeight={600} mb={0.25}>
                  Yearly Total
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: '#4ecdc4', fontSize: { xs: 26, md: 32 }, lineHeight: 1.1 }}
                >
                  {fmt(results.totalYr)}
                </Typography>
              </Box>
            </Card>
            <DonutChart results={results} />
          </Box>

          {/* Right: Breakdown Table */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <BreakdownTable params={params} results={results} />
          </Box>
        </Box>

        <Box mt={3}>
          <Assumptions params={params} results={results} />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
