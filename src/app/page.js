'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/assets/logo.png'

export default function page1() {
	return (
		<section className='centered-wrapper'>
			<div className='brand-wrapper'>
				<Image
					src={logo}
					width={40}
					height={32}
					className='brand-logo'
					alt='Equal Table logo'
				/>
				<p className='brand-name'>내일의 커피</p>
			</div>
			<div className='progress-static'>
				<div className='progress-bar'>
					<div className='progress-step'>
						<div className='circle completed'>1</div>
						<div className='line completed' />
					</div>
					<div className='progress-step'>
						<div className='circle'>2</div>
						<div className='line' />
					</div>
					<div className='progress-step'>
						<div className='circle'>3</div>
						<div className='line' />
					</div>
					<div className='progress-step'>
						<div className='circle'>4</div>
					</div>
				</div>
			</div>
			<div className='page1-header'>
				<h1>Measure the carbon emissions of coffee</h1>
				<p>
					This is a carbon emissions calculator that allows you to
					know the carbon emissions of the coffee you use
				</p>
			</div>
			<form className='step1'>
				{/* Monthly Coffee Usage */}
				<div className='question-group'>
					{/* <label>Monthly Coffee Usage</label> */}
					<div className='row-group'>
						<input
                            // className='start-page-input'
							type='number'
							name='monthlyCoffeeUsage'
							// value={productionData.monthlyCoffeeUsage || ''}
							// onChange={handleInputChange}
							placeholder='Enter monthly coffee usage'
						/>
						<span className='unit'>kg</span>
					</div>
				</div>
				<button>button 1</button>
				<button>button 2</button>
			</form>
			<div>placeholder for data collection consent</div>
		</section>
	)
}
