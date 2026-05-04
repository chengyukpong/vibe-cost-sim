import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Switch,
} from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import CloudIcon from '@mui/icons-material/Cloud'
import GroupIcon from '@mui/icons-material/Group'

function ParamSlider({ label, value, min, max, step, format, onChange, tip }) {
  return (
    <Box mb={2.5}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.75}>
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {label}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={700}
          sx={{
            color: '#b0a4f5',
            bgcolor: 'action.hover',
            px: 1.25,
            py: 0.25,
            borderRadius: 5,
            fontSize: 13,
          }}
        >
          {format(value)}
        </Typography>
      </Box>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(v)}
        size="small"
      />
    </Box>
  )
}

export default function ControlPanel({ params, update, hrRate }) {
  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Usage Pattern */}
      <Card variant="outlined" sx={{ flex: '1 1 0', minWidth: 0 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <GroupIcon sx={{ color: '#ff6b6b' }} />
            <Typography fontWeight={700} fontSize={15}>
              Usage Pattern
            </Typography>
          </Box>
          <ParamSlider
            label="Number of Users"
            value={params.users}
            min={0}
            max={1000}
            step={50}
            format={(v) => v}
            onChange={(v) => update('users', v)}
          />
          <ParamSlider
            label="Requests / User / session"
            value={params.reqPerUser}
            min={1}
            max={20}
            step={1}
            format={(v) => v}
            onChange={(v) => update('reqPerUser', v)}
          />
          <ParamSlider
            label="Sessions / User / day"
            value={params.sessionsPerUser}
            min={1}
            max={8}
            step={1}
            format={(v) => v}
            onChange={(v) => update('sessionsPerUser', v)}
          />
          <ParamSlider
            label="Session Duration"
            value={params.sessionHrs}
            min={1}
            max={8}
            step={1}
            format={(v) => `${v} hr`}
            onChange={(v) => update('sessionHrs', v)}
          />
        </CardContent>
      </Card>

      {/* Hosting */}
      <Card variant="outlined" sx={{ flex: '1 1 0', minWidth: 0 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <CloudIcon sx={{ color: 'secondary.main' }} />
            <Typography fontWeight={700} fontSize={15}>
              Hosting (EC2)
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1.25} mb={2}>
            <Switch
              checked={params.isSpot}
              onChange={(e) => update('isSpot', e.target.checked)}
              color="secondary"
              size="small"
            />
            <Typography variant="body2" fontWeight={500}>
              {params.isSpot ? 'Spot Instance' : 'On-Demand'}
            </Typography>
            <Typography
              variant="caption"
              fontWeight={600}
              sx={{
                color: 'secondary.main',
                bgcolor: 'action.hover',
                px: 1.25,
                py: 0.25,
                borderRadius: 5,
              }}
            >
              ${hrRate.toFixed(4)}/hr
            </Typography>
          </Box>
          <ParamSlider
            label="Price / hr"
            value={params.spotHr}
            min={0.05}
            max={0.5}
            step={0.001}
            format={(v) => `$${parseFloat(v).toFixed(4)}`}
            onChange={(v) => update('spotHr', v)}
          />
          <ParamSlider
            label="On-Demand Multiplier"
            value={params.multiplier}
            min={1.5}
            max={4}
            step={0.1}
            format={(v) => `${parseFloat(v).toFixed(1)}x`}
            onChange={(v) => update('multiplier', v)}
          />
          <ParamSlider
            label="Instances / Machine"
            value={params.instances}
            min={1}
            max={32}
            step={1}
            format={(v) => v}
            onChange={(v) => update('instances', v)}
          />
        </CardContent>
      </Card>

      {/* Model Plan */}
      <Card variant="outlined" sx={{ flex: '1 1 0', minWidth: 0 }}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <SmartToyIcon sx={{ color: 'primary.main' }} />
            <Typography fontWeight={700} fontSize={15}>
              Model Plan
            </Typography>
          </Box>
          <ParamSlider
            label="Plan Cost / mo"
            value={params.modelPlanCost}
            min={10}
            max={500}
            step={10}
            format={(v) => `$${v}`}
            onChange={(v) => update('modelPlanCost', v)}
          />
          <ParamSlider
            label="Credits / Plan / mo"
            value={params.modelCredits}
            min={1}
            max={100}
            step={1}
            format={(v) => `${v}B`}
            onChange={(v) => update('modelCredits', v)}
          />
          <ParamSlider
            label="Ave Credit/Request"
            value={params.creditsPerReq}
            min={0.1}
            max={5}
            step={0.1}
            format={(v) => v >= 1 ? `${v}M` : `${(v * 1000).toFixed(0)}k`}
            onChange={(v) => update('creditsPerReq', v)}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
