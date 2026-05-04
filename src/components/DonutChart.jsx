import { Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function DonutChart({ results }) {
  const theme = useTheme()
  const data = [
    { id: 0, value: results.modelCostMo, label: 'Model', color: '#7c6df0' },
    { id: 1, value: results.hostingCostMo, label: 'Hosting', color: '#4ecdc4' },
  ]

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          mb={1}
          display="block"
        >
          COST SPLIT — MONTHLY
        </Typography>
        <Box sx={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <PieChart
            series={[
              {
                data,
                innerRadius: 50,
                paddingAngle: 2,
                cornerRadius: 4,
                highlightScope: { fade: 'global', highlight: 'item' },
                valueFormatter: (v) => (v ? fmt(v.value) : ''),
                arcLabel: (item) => fmt(item.value),
                arcLabelMinAngle: 15,
              },
            ]}
            margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
            slotProps={{
              legend: { hidden: true },
            }}
            tooltip={{
              trigger: 'item',
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" gap={3} mt={0.5}>
          {data.map((d) => (
            <Box key={d.id} display="flex" alignItems="center" gap={0.75}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  bgcolor: d.color,
                }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {d.label}: {fmt(d.value)}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}
