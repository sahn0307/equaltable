import React from 'react'

export const GAUGE_CONSTANTS = {
  centerX: 165,
  centerY: 169,
  radius: 124,
  startAngle: -90,
  endAngle: 90,
  strokeWidth: 19,
  min: -30,
  max: 30
}

export const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const radians = (angleInDegrees - 90) * Math.PI / 180.0
  return {
    x: centerX + (radius * Math.cos(radians)),
    y: centerY + (radius * Math.sin(radians))
  }
}

export const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ")
}

export const calculateArcAngle = (emissionsPerKg) => {
  const normalized = Math.min(
    Math.max(emissionsPerKg, GAUGE_CONSTANTS.min),
    GAUGE_CONSTANTS.max
  )
  
  // Convert emissions range to ratio (0-1)
  const ratio = (normalized + 30) / 60
  // Map ratio to degrees (-90 to 90)
  return GAUGE_CONSTANTS.startAngle + (ratio * 180)
}

export const getGradeAndColor = (emissionsPerKg) => {
  if (emissionsPerKg <= 0) return { grade: 'A', color: '#59A659' }
  if (emissionsPerKg <= 2.3) return { grade: 'B', color: '#FFFF66' }
  if (emissionsPerKg <= 16) return { grade: 'C', color: '#D16E11' }
  return { grade: 'D', color: '#AD1F1F' }
}

export const GaugePath = React.memo(({ d, color }) => (
  <path
    d={d}
    fill='none'
    stroke={color}
    strokeWidth={GAUGE_CONSTANTS.strokeWidth}
  />
))