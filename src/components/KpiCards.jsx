import { Card, CardContent, Typography, Box, Grid } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import DnsIcon from '@mui/icons-material/Dns'

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function KpiCards({ results }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card variant="outlined" sx={{ textAlign: 'center', py: 2.5, px: 1.5 }}>
          <CalendarMonthIcon sx={{ fontSize: 28, color: '#7c6df0' }} />
          <Typography
            variant="h5"
            fontWeight={800}
            mt={0.5}
            sx={{ color: '#7c6df0', fontSize: { xs: 20, md: 28 } }}
          >
            {fmt(results.totalMo)}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Monthly Total
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            mt={0.75}
            sx={{ color: '#4ecdc4' }}
          >
            {fmt(results.totalYr)} / yr
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card variant="outlined" sx={{ textAlign: 'center', py: 2.5, px: 1.5 }}>
          <SmartToyIcon sx={{ fontSize: 28, color: '#b0a4f5' }} />
          <Typography
            variant="h5"
            fontWeight={800}
            mt={0.5}
            sx={{ color: '#b0a4f5', fontSize: { xs: 20, md: 28 } }}
          >
            {fmt(results.modelCostMo)}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Model / mo
          </Typography>
        </Card>
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card variant="outlined" sx={{ textAlign: 'center', py: 2.5, px: 1.5 }}>
          <DnsIcon sx={{ fontSize: 28, color: '#6ee7de' }} />
          <Typography
            variant="h5"
            fontWeight={800}
            mt={0.5}
            sx={{ color: '#6ee7de', fontSize: { xs: 20, md: 28 } }}
          >
            {fmt(results.hostingCostMo)}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Hosting / mo
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}
