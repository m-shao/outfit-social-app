import React, { useState, useEffect } from 'react';
import UserLocation from '../components/UserLocation';
import OutfitGeneration from '../components/OutfitGeneration';

function Generate() {

    return (
        <div className="box-border flex justify-center w-full h-full p-6">
            <div className="w-full max-w-md">
                <UserLocation/>
                {/* <OutfitGeneration 
                temp={temp}/> */}
            </div>
        </div>
    );
}

export default Generate;
