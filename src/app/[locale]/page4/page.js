'use client'
import { Link } from '../../../i18n/routing'
import LocaleSwitch from '../../components/LocaleSwitch'
import Image from 'next/image'
import chevron from '../../../../public/assets/chevron.png'
import step1 from '../../../../public/assets/step1.png'
import step2 from '../../../../public/assets/step2.png'
import step3 from '../../../../public/assets/step3.png'
import step4 from '../../../../public/assets/step4.png'
import step5 from '../../../../public/assets/step5.png'

export default function page() {
	return (
		<section className='page-wrapper'>
			<div className='page-header'>
				<div className='left'>
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
				<LocaleSwitch />
			</div>
			<div className='row'>
				<div className='col'>
					<Image
						src={step1}
						width={38.6}
						height={60.4}
						alt='Production Stage Icon'
					/>
					<span className='stage-title medium'>Production Stage</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step2}
						width={63.8}
						height={39.2}
						alt='Transportation Stage Icon'
					/>
					<span className='stage-title medium'>
						Transportation Stage
					</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step3}
						width={30.2}
						height={80.5}
						alt='Processing Stage Icon'
					/>
					<span className='stage-title medium'>Processing Stage</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step4}
						width={46.7}
						height={51.2}
						alt='Extraction Stage Icon'
					/>
					<span className='stage-title medium'>Extraction Stage</span>
					<div className='bar-circle' />
				</div>
				<Image src={chevron} width={16} height={16} alt='chevron' />
				<div className='col'>
					<Image
						src={step5}
						width={41.3}
						height={47.5}
						alt='Disposal Stage Icon'
					/>
					<span className='stage-title medium'>Disposal Stage</span>
					<div className='bar-circle' />
				</div>
			</div>
			<div className='psudo-progress'>
				<div className='bar'>
					<div className='bar-line' />
				</div>
			</div>

			<div className='card-row row'>
				<div className='card h180'>
					<p>
						Our carbon-neutral certified farm has transformed the
						cultivation process that emits +1.69 kg of carbon per 1
						kg of green coffee beans to achieve a carbon emission of
						-2.69kg. We are reducing more carbon emissions through
						agroforestry, the use of organic fertilizers, reduced
						water usage, and the use of renewable energy.
					</p>
				</div>
				<div className='card h180'>
					<p>
						In the case of air transport, there is a difference of
						more than 10 times in carbon emissions compared to
						shipping. To reduce carbon emissions during the
						transportation stage of Naeil Coffee, we transport
						containers filled with green coffee beans from the farm
						by ship. Additionally, we measure and record all
						distances and the corresponding carbon emissions from
						the farm to the port, from port to port, and from the
						port to the roasting facility.
					</p>
				</div>
				<div className='card h180'>
					<p>
						Naeil Coffee uses 100% renewable energy for the energy
						required to produce carbon-reduced coffee. We utilize
						renewable energy for all processes necessary for
						manufacturing in the factory, including roasting,
						grinding, and extraction testing. To achieve this, our
						company is implementing RE100 in our factories.
					</p>
				</div>
				<div className='card h180'>
					<p>
						Our factory also uses renewable energy when extracting
						coffee in our factories. All processes, including the
						grinder, espresso machine, kettle, and ice maker, are
						powered by renewable energy.
					</p>
				</div>
				<div className='card h180'>
					<p>
						The materials used for carbon-reduced coffee are
						recyclable or made from biodegradable packaging,
						excluding non-recyclable materials such as aluminum.
						This helps reduce carbon emissions generated from
						packaging waste. Additionally, we are engaged in
						upcycling by utilizing leftover materials, such as green
						coffee bean bags, to create goods like tote bags.
					</p>
				</div>
			</div>
			<div className='card-div'>
				Methods for Implementing Carbon Reduction in Cafes/Companies
			</div>
			<div className='card-row row'>
				<div className='card h150'>
					<p className='card-title'>
						<span>Verify the Carbon Emissions</span>
						<br />
						of the Farm
					</p>
					<p>
						Check whether coffee farms are operating in an
						environmentally friendly manner, such as carbon-neutral,
						organic, rainforest-certified, or shade-grown, and keep
						track of farm operations
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Buy Green Beans in
						<br />
						<span>Large Quantities</span>
					</p>
					<p>
						When importing green beans from abroad, import them in
						large quantities by ship rather than by air
						transportation
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Use <span>Renewable Energy</span>
						<br />
						for Roasting
					</p>
					<p>
						Try to implement RE100 using renewable energy in the
						roasting stage and roast large amounts of beans at once
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Use <span>Renewable Energy</span>
						<br />
						for Roasting
					</p>
					<p>
						Try to implement RE100 using renewable energy in the
						extraction stage and minimize power consumption when
						using the coffee machine
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						<span>Use eco-friendly </span>materials <br /> and
						upcycle.
					</p>
					<p>
						Using eco-friendly packaging and upcycling waste
						materials such as raw coffee bean bags and coffee
						grounds to reduce carbon emissions.
					</p>
				</div>
			</div>
			<div className='card-div'>
				Methods for Individuals to Implement Carbon Reduction in Daily
				Life
			</div>
			<div className='card-row row'>
				<div className='card h150'>
					<p className='card-title'>
						Check <span>eco-friendly farm</span>
						<br />
						certification
					</p>
					<p>
						Check the certification of the coffee beans you use, and
						consume the coffee beans produced in an eco-friendly
						manner
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Consider the&nbsp;
						<span>
							transportation <br />
							method
						</span>
					</p>
					<p>
						Recognize that the most carbon is emitted during the
						transportation phase among all coffee production
						processes and consume products that import beans in bulk
						by ship
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Verify&nbsp;
						<span>
							Renewable
							<br />
							Energy Roasting
						</span>
					</p>
					<p>
						Be aware that processing green beans consumes a large
						amount of energy, and use beans that are roasted with
						renewable energy
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Try using non-powered
						<br />
						<span>extraction methods</span>
					</p>
					<p>
						Use methods that allow for grinding and extraction
						without power, like a manual grinder or cold brew, or
						use energy-efficient coffee machines.
					</p>
				</div>
				<div className='card h150'>
					<p className='card-title'>
						Check the
						<span>
							&nbsp; packaging and
							<br />
							recycle&nbsp;
						</span>
						coffee grounds
					</p>
					<p>
						Check the packaging and recycle coffee grounds. Check the
						eco-friendliness and recyclability of the product&apos;s
						packaging, and use the leftover coffee grounds for
						fertilizer, air fresheners, or send them to upcycling
						companies.
					</p>
				</div>
			</div>
		</section>
	)
}
