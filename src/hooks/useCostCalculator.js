import { useState, useMemo, useCallback } from 'react'

const DEFAULTS = {
  modelPlanCost: 100,
  modelCredits: 20,
  isSpot: true,
  spotHr: 0.1661,
  multiplier: 2.0,
  instances: 8,
  users: 50,
  reqPerUser: 10,
  creditsPerReq: 0.5,
  sessionsPerUser: 4,
  sessionHrs: 1,
}

export function useCostCalculator() {
  const [params, setParams] = useState(DEFAULTS)

  const update = useCallback((key, value) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }, [])

  const results = useMemo(() => {
    const {
      modelPlanCost,
      modelCredits,
      isSpot,
      spotHr,
      multiplier,
      instances,
      users,
      reqPerUser,
      creditsPerReq,
      sessionsPerUser,
      sessionHrs,
    } = params

    const hrRate = isSpot ? spotHr : spotHr * multiplier

    const totalSessionsMo = users * sessionsPerUser * 20
    const dailySessions = totalSessionsMo / 20
    const totalCredits = totalSessionsMo * reqPerUser * creditsPerReq * 1e6
    const creditsB = totalCredits / 1e9

    const plansNeeded = Math.ceil(creditsB / modelCredits)
    const modelCostMo = plansNeeded * modelPlanCost

    const workingHoursPerDay = 10
    const nonWorkingHoursPerDay = 14
    const workingMachines = Math.round(dailySessions / workingHoursPerDay * 1.3 / instances)
    const nonWorkingMachines = 1
    const workingHrsMo = workingMachines * workingHoursPerDay * 20
    const nonWorkingHrsMo = nonWorkingMachines * nonWorkingHoursPerDay * 30
    const hostingCostMo = (workingHrsMo + nonWorkingHrsMo) * hrRate

    const totalMo = modelCostMo + hostingCostMo
    const totalYr = totalMo * 12

    return {
      hrRate,
      totalCredits,
      creditsB,
      plansNeeded,
      modelCostMo,
      totalSessionsMo,
      dailySessions,
      workingMachines,
      nonWorkingMachines,
      hostingCostMo,
      totalMo,
      totalYr,
    }
  }, [params])

  return { params, update, results }
}
