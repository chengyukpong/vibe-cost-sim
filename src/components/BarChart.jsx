import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import { BarChart as MuiBarChart } from '@mui/x-charts/BarChart'

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function BarChart({ results }) {
  const theme = useTheme()

  const categories = ['Model', 'Hosting', 'Total']
  const monthly = [results.modelCostMo, results.hostingCostMo, results.totalMo]
  const yearly = [
    results.modelCostMo * 12,
    results.hostingCostMo * 12,
    results.totalYr,
  ]

  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          mb={1}
          display="block"
        >
          MONTHLY vs YEARLY
        </Typography>
        <Box sx={{ width: '100%', height: 150 }}>
          <MuiBarChart
            xAxis={[{ scaleType: 'band', data: categories }]}
            series={[
              {
                data: monthly,
                label: 'Monthly',
                color: '#7c6df0',
                valueFormatter: (v) => (v ? fmt(v) : ''),
              },
              {
                data: yearly,
                label: 'Yearly',
                color: '#4ecdc4',
                valueFormatter: (v) => (v ? fmt(v) : ''),
              },
            ]}
            barPercentage={0.5}
            borderRadius={8}
            grid={{ horizontal: true }}
            slotProps={{
              legend: {
                labelStyle: {
                  fill: theme.palette.text.secondary,
                  fontSize: 12,
                },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
