import React from 'react'

export const GaugeText = React.memo(({ t, grade, emissionsPerKg }) => (
  <>
    <g>
      <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(162.001 7.854)'>0</text>
    </g>
    <g>
      <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(313.522 164.854)'>30</text>
    </g>
    <g>
      <text fontWeight='500' fontSize='11' fill='#f1f3f2' transform='translate(-.539 164.854)'>-30</text>
    </g>
    <text 
      fontFamily="'Roboto','Pretendard','Arial', sans-serif" 
      fontWeight='500' 
      fontSize='28' 
      fill='#131523' 
      transform='translate(112.354 131.847)'
    >
      {t.rich('grade', { grade })}
    </text>
    <text 
      fontFamily="'Roboto','Pretendard','Arial', sans-serif" 
      fontWeight='500' 
      fontSize='17' 
      fill='#131523' 
      transform='translate(133.865 153.847)'
    >
      {emissionsPerKg.toFixed(2)}kg
    </text>
  </>
))