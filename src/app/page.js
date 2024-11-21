'use client'
import { useRouter } from 'next/navigation'; // Import useRouter
import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import simple from '../../public/assets/easy-check.png';
import detail from '../../public/assets/detailed.png';

export default function page1() {
    const router = useRouter(); // Initialize the useRouter hook

    const navigateToPage = (path) => {
        router.push(path); // Function to navigate to a specified path
    };

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
                    <div className='row-group'>
                        <input
                            type='number'
                            name='monthlyCoffeeUsage'
                            placeholder='Enter monthly coffee usage'
                        />
                        <span className='unit'>kg</span>
                    </div>
                </div>
                <div className='button-group'>
                    {/* Simple Check Button */}
                    <button
                        type='button'
                        className='p1-button'
                        onClick={() => navigateToPage('/page3')} // Navigate to /page3
                    >
                        <Image
                            className='b1'
                            src={simple}
                            width={45}
                            height={62}
                            alt='document icon'
                        />
                        <div className='bottom'>
                            <div className='title-group'>
                                <p className='title accent bold'>Easily Check</p>
                                <p className='title bold'>Carbon Emissions</p>
                            </div>
                            <p className='small'>
                                By simply entering your monthly coffee usage,
                                you can check the approximate carbon emissions
                                of your coffee based on general standards.
                            </p>
                        </div>
                    </button>
                    {/* Detailed Check Button */}
                    <button
                        type='button'
                        className='p1-button'
                        onClick={() => navigateToPage('/page2')} // Navigate to /page2
                    >
                        <Image
                            className='b2'
                            src={detail}
                            width={76}
                            height={68}
                            alt='pencil checking icon'
                        />
                        <div className='bottom'>
                            <div className='title-group'>
                                <p className='title accent bold'>Detailed Check</p>
                                <p className='title bold'>Carbon Emissions</p>
                            </div>
                            <p className='small'>
                                By entering detailed values from the coffee farm
                                to disposal, you can check the detailed carbon
                                emissions of your coffee.
                            </p>
                        </div>
                    </button>
                </div>
            </form>
            <div className='data-consent'>
                <div className='row'>
                    <p className='medium title'>Consent to Data Collection Confirmation</p>
                    <div className='row'>
                        <input type='checkbox' />
                        <label>check</label>
                    </div>
                </div>
                <p className='small'>
                    The carbon emission data provided is approximate. For more
                    accurate figures, please contact Equal Table Inc.
                </p>
            </div>
        </section>
    );
}