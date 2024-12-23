import React from 'react'

const GaugeMarkers = React.memo(() => (
  <>
    {/* -30, 30 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='translate(22.909 157.847)' /> 
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='translate(301.909 157.847)' />
    {/* 0 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(90 75.031 93.378)' />
    {/* -5, 5 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(74.99 50.99 96.916)' />
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(105.01 93.388 90.615)' />
    {/* -10, 10 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(60 17.255 101.763)' />
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(120 108.388 88.537)' />
    <g>
    {/* -15, 15 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(45 -36.584 109.578)' />
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(135 121.263 86.668)' />
    </g>
    <g>
    {/* -20, 20 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(30 -140.592 124.672)' />
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(150 132.807 84.993)' />
    </g>
    <g>
    {/* -25, 25 */}
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(14.98 -445.654 168.283)' />
    <circle cx='3' cy='3' r='3' fill='#f1f3f2' transform='rotate(165.02 143.485 83.421)' />
    </g>
  </>
))

GaugeMarkers.displayName = 'GaugeMarkers'
export { GaugeMarkers }
