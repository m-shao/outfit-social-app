import { useState } from 'react';

import Carousel from './Carousel';

import bot20 from '../images/bot20.svg';
import bot30 from '../images/bot30.svg';
import top20 from '../images/top20.svg';
import top30 from '../images/top30.svg';
import top40 from '../images/top40.svg';
import top50 from '../images/top50.svg';

import { clothingImages } from '../data/constants';

function OutfitGeneration({temp}) {
    
    const [outfit, setOutfit] = useState(null)

    const tops = {
        '20': ['Tshirt', 'Tshirt', 'Tshirt','Tshirt'],
        '30': ['Hoodie', 'Windbreaker','Cardigan','Denim Jacket'],
        '40': ['Light Jacket', 'Thick Sweater','Leather Jacket','Sweatshirt'],
        '50': ['Heavy jacket', 'Long Coat','Trenchcoat','Winter Jacket'],
    }

    const bots = {
        '20': ['Shorts', 'Shorts','Shorts','Shorts'],
        '30': ['Pants', 'Sweatpants','Jeans','Cargo Pants'],
        '40': ['Pants', 'Sweatpants','Jeans','Cargo Pants'],
        '50': ['Pants', 'Sweatpants','Jeans','Cargo Pants'],
    }

    const shoes = ['sneakers', 'boots', 'canvas shoes']

    const outfitsForTemp = {
        '-20': 
        [['20', '50'],
        ['20', '30', '50']],

        '-10': 
        [['20', '50']],

        '0': 
        [['20', '40'],
        ['20', '50']],

        '10': 
        [['20', '30'],
        ['20', '40']],

        '20': 
        [['20']],
    }

    function generateOutfit(temperature) {

        if (temperature > 20) {
            temperature = 20;
        } else if (temperature < -20) {
            temperature = -20;
        }
        // round temperature to nearest 10
        const roundedTemp = Math.round(temperature / 10) * 10;
        
        // get outfits for temperature range
        const outfits = outfitsForTemp[roundedTemp.toString()];
        
        // pick random outfit from options
        const outfit = outfits[Math.floor(Math.random() * outfits.length)];
        
        // get tops and bottoms for each temperature tier in the outfit
        const topsList = outfit.map(tempTier => tops[tempTier]);
        
        // pick random items from tops and bottoms for each tier
        const topItems = topsList.map(tops => tops[Math.floor(Math.random() * tops.length)]);
        let bottomItem = ''
        if (roundedTemp >= 20) {
            bottomItem = bots['20'][Math.floor(Math.random() * bots['20'].length)];
        } else {
            bottomItem = bots['30'][Math.floor(Math.random() * bots['20'].length)];
        }

        // return outfit as object
        return {
          temperature: roundedTemp,
          top: topItems,
          topNums: outfit,
          bottom: bottomItem,
        };
      }
    
    
    const onGenerate = () => {
        setOutfit(generateOutfit(temp));
    }



    const getImage = (piece) => {
        return clothingImages[piece]
    }
    return (
        <div className='flex flex-col text-lg mt-6 gap-8'>
            <div className='flex justify-center'>
                <button onClick={onGenerate} className='bg-social-blue text-white px-4 py-1 rounded-full'>Generate Outfit</button>
            </div>
            {outfit && <div className='flex flex-col gap-6'>
                <div>
                <h1 className='text-xl font-bold'>Today Try Wearing:</h1>
                    <div>
                        {outfit.top.map((item, index) => {
                            return <h1 key={index}>&emsp;{item}</h1>
                        })}
                    </div>
                    <div>
                        <h1>&emsp;{outfit.bottom}</h1>
                    </div>
                </div>
                <div className='flex flex-col gap-8'>
                    <div className='flex gap-3'>
                        <h1 className='text-xl font-bold'>Top: </h1>
                        {outfit.top.map((piece, index) => {
                            const image = getImage(piece);
                            return <img className='h-32' key={index} src={image} />
                        })}
                    </div>
                    <div className='flex gap-3'>
                        <h1 className='text-xl font-bold mr-1'>Bot: </h1>
                        <img className='h-32' src={getImage(outfit.bottom)} />
                    </div>
                </div>
            </div>}
        </div>
        
    )
}

export default OutfitGeneration