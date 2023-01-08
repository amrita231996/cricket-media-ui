import { useEffect, useState } from 'react';
import Banner from '../../assets/images/home/banner.svg'

import './index.scss';

const RegistrationBonus = ( props ) => {

    const [hasClaimed, setHasClaimed] = useState(true);
    const [showScratch, setShowScratch] = useState(false);
    const [prizeWon, setPrizeWon] = useState('');

    const claimPrize = () => {
        setShowScratch(true);
    }

    const scratchCard = () => {
        setPrizeWon('You have won Rs.30');
    }

    const closeModal = () => {
        setHasClaimed(true);
    }

    useEffect(() => {
        setHasClaimed(true);
    }, []);

    return !hasClaimed && <div className="component registration-bonus">
        <div className='banner-block'>
            <img src={Banner} alt='' className='banner' />
        </div>
        <div className='content-block'>
            <p className='title'>
                Congratulations
            </p>
            <p className='sub-title'>
                For registering on CricketMedia
            </p>
            <p className='info'>
                <span>You are one of the first 1000 Users</span>
                <span>As a welcome gift we are offering <b>1000</b> Crickcoins</span>
            </p>
            { showScratch && <p className='surprise'>
                    {
                    prizeWon 
                    ? 'Yeah... your surprise card is here'
                    : 'Along with this we are offering a surprise gift, Scratch to find out'
                    }
                </p>
            }
        </div>
        { !prizeWon && <div className='claim-block'>
                <button onClick={showScratch ? scratchCard : claimPrize } className='claim'>
                    { showScratch ? 'Scratch' : 'Claim it' }
                </button>
            </div>
        }
        {
            prizeWon && <div className='prize-block'>
                <p className='prize'>
                    <span>{ prizeWon }</span>
                </p>
                <button onClick={closeModal} className='claim continue'>
                    {'Claim & Continue'} 
                </button>
            </div>
        }
    </div>
}

export default RegistrationBonus