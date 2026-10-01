import React from 'react';
import PetFinderBanner from '../components/lostandfound/PetFinderBanner';
import LostFoundFeed from '../components/lostandfound/lostandfoundsearch';
import PetAppBanner from '../components/PetAppDownloadBanner';

const LostAndFound = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <PetFinderBanner />
            <LostFoundFeed />
            <PetAppBanner />
        </div>
    );
}

export default LostAndFound;