import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

const fmt = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

const fmtK = (n) => {
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return n.toFixed(0)
}

export default function BreakdownTable({ params, results }) {
  const rows = [
    ['Users', params.users],
    ['Total Sessions / day', fmtK(results.dailySessions)],
    ['Total Sessions / mo', fmtK(results.totalSessionsMo)],
    ['Total Requests / mo', fmtK(results.totalRequests)],
    ...(params.isPerRequest
      ? [['Requests / Plan', fmtK(params.reqPerPlan)]]
      : [
          ['Total Credits / mo', fmtK(results.totalCredits)],
          ['Credits (Billions)', results.creditsB.toFixed(1) + 'B'],
        ]),
    ['Plans Needed', results.plansNeeded],
    ['Working Machines (10h)', `${results.workingMachines}  (${fmtK(results.dailySessions)} / 10 × 1.3 / ${params.instances})`],
    ['Non-Working Machines (14h)', results.nonWorkingMachines],
    ['Hourly Rate / machine', `$${results.hrRate.toPrecision(4)}`],
  ]

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.secondary"
          mb={1.5}
          display="block"
        >
          DETAILED BREAKDOWN
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Metric
                </TableCell>
                <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(([label, value]) => (
                <TableRow key={label}>
                  <TableCell>{label}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    {value}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell sx={{ color: 'primary.main', fontWeight: 700 }}>
                  Model Cost / mo
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: 'primary.main', fontWeight: 700 }}
                >
                  {fmt(results.modelCostMo)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ color: 'secondary.main', fontWeight: 700 }}>
                  Hosting Cost / mo
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: 'secondary.main', fontWeight: 700 }}
                >
                  {fmt(results.hostingCostMo)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 800, fontSize: 18 }}>TOTAL / mo</TableCell>
                <TableCell align="right" sx={{ fontWeight: 800, fontSize: 18 }}>
                  {fmt(results.totalMo)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  )
}
