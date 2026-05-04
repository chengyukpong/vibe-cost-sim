import { Box, IconButton, Typography } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function Header({ mode, onToggle }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
      <Box>
        <Typography
          variant="h3"
          fontWeight={800}
          letterSpacing={-1}
          sx={{
            background: 'linear-gradient(135deg, #7c6df0, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Vibe Coding Platform
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={0.5}>
          Monthly &amp; Yearly Cost Simulator
        </Typography>
      </Box>
      <IconButton
        onClick={onToggle}
        sx={{
          bgcolor: `${mode === 'dark' ? 'rgba(124,109,240,.15)' : 'rgba(124,109,240,.1)'}`,
          color: 'primary.main',
          '&:hover': { bgcolor: 'primary.main', color: '#fff' },
        }}
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  )
}
