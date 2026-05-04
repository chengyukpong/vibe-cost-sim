import { Card, CardContent, Typography, List, ListItem, Box } from '@mui/material'

export default function Assumptions({ params, results }) {
  const items = [
    'Each OpenClaw instance uses 1 vCPU + 2 GB RAM',
    `EC2 c4.2xlarge = 8 vCPUs, 16 GB RAM → ${params.instances} instances/machine`,
    `Working hours: 10 hr/day, 20 days/mo → 200 hrs/mo`,
    `Non-working hours: 14 hr/day, 30 days/mo → 420 hrs/mo`,
    `Working machines = round(daily sessions / 10 × 1.3 / ${params.instances})`,
    `Non-working machine = 1 (always on)`,
    `Model cost scales with plan bundles of ${params.modelCredits}B credits each`,
  ]

  return (
    <Card variant="outlined" sx={{ bgcolor: 'action.hover' }}>
      <CardContent>
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          mb={1}
          display="block"
        >
          ASSUMPTIONS
        </Typography>
        <List dense disablePadding>
          {items.map((text, i) => (
            <ListItem key={i} disablePadding sx={{ mb: 0.25, gap: 1, alignItems: 'flex-start' }}>
              <Typography
                variant="body2"
                sx={{ color: 'primary.main', lineHeight: 1.6, flexShrink: 0 }}
              >
                •
              </Typography>
              <Typography variant="body2" color="text.secondary" fontSize={13}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}
