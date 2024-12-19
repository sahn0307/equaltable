export const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = {
    x: x + radius * Math.cos(Math.PI * (startAngle / 180)),
    y: y + radius * Math.sin(Math.PI * (startAngle / 180))
  }
  
  const end = {
    x: x + radius * Math.cos(Math.PI * (endAngle / 180)),
    y: y + radius * Math.sin(Math.PI * (endAngle / 180))
  }

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
  ].join(" ")
}