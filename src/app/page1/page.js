'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../../../public/assets/logo.png'

export default function page1() {
    
    return (
        <>
            <Image src={logo} height={408} width={500} alt="Equal Table logo" />
            <h2>Measure the carbon emissions of coffee</h2>
        </>
    )
}
