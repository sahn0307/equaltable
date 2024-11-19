'use client'
import Image from 'next/image'
import chevron from '../../../public/assets/chevron.png'
import step1 from '../../../public/assets/step1.png'
import step2 from '../../../public/assets/step2.png'
import step3 from '../../../public/assets/step3.png'
import step4 from '../../../public/assets/step4.png'
import step5 from '../../../public/assets/step5.png'



export default function page() {
	return (
		<>
			<div className='page-header'>
				<h2>
					Measure the carbon emissions from coffee farms to disposal
				</h2>
				<p>
					This is a carbon emission calculator that allows you to know
					the detailed carbon emissions of the coffee you use.
				</p>
				<p>
					The carbon emissions are calculated based on 1 kg of raw
					beans, and if the figures are unknown, they are entered
					based on an international academic journal GEO paper.
				</p>
			</div>
            <div className='row'>
                <div className='col'>
                    <Image src={step1} width={38.6} height={60.4} alt='Production Stage Icon' />
                    <span>Production Stage</span>
                </div>
                <Image src={chevron} width={16} height={16} alt='chevron' />

                <div className='col'>
                    <Image src={step2} width={63.8} height={39.2} alt='Transportation Stage Icon' />
                    <span>Transportation Stage</span>
                </div>
                <Image src={chevron} width={16} height={16} alt='chevron' />

                <div className='col'>
                    <Image src={step3} width={30.2} height={80.5} alt='Processing Stage Icon' />
                    <span>Processing Stage</span>
                </div>
                <Image src={chevron} width={16} height={16} alt='chevron' />

                <div className='col'>
                    <Image src={step4} width={46.7} height={51.2} alt='Extraction Stage Icon' />
                    <span>Extraction Stage</span>
                </div>
                <Image src={chevron} width={16} height={16} alt='chevron' />

                <div className='col'>
                <Image src={step5} width={41.3} height={47.5} alt='Disposal Stage Icon' />
                <span>Disposal Stage</span>
                </div>
            </div>
            <div className='placeholder row'>
                <p>
                    placeholder for static progress bar with icons
                </p>
            </div>

            <div className='placeholder stage-container'>
                placeholder for stage rows
            </div>
		</>
	)
}
