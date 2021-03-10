import React, { useState, useEffect } from 'react';
import RadioButton from './RadioButton';
import bpms from './bpm.json';
import './Metronome.css';
import click1 from './click1.wav';

const getAnimationStyle = (bpm) => ({
    animation: `Circle-pulse infinite ${60 / bpm}s linear`
});

const parseRow = ([title, artist, bpm]) => ({
    title: title.toString(),
    artist: artist.toString(),
    bpm: Number.parseInt(bpm.toString())
})

// get map from bpm => [...formatted songs], inserted lowest bpm first
const getSortedMapOfBPMs = (bpms) => {
    const parsedBpms = bpms.map(parseRow);
    parsedBpms.sort((b1, b2) => {
        const bpmDiff = b1.bpm - b2.bpm;

        if (bpmDiff === 0) return b1.title.localeCompare(b2.title);
        return bpmDiff;
    })
    const uniqueBpms = {};
    parsedBpms.forEach(({ title, artist, bpm }) => {
        const song = title + " (" + artist + ")";
        uniqueBpms[bpm.toString()] = [...(uniqueBpms[bpm.toString()] || []), song];
    });
    return uniqueBpms;
}

const Metronome = () => {
    const sortedBpmMap = getSortedMapOfBPMs(bpms);
    const sortedBpms = Object.keys(sortedBpmMap);
    const [currentBpm, updateBpm] = useState(sortedBpms[0]);
    const animationStyle = getAnimationStyle(currentBpm);


    useEffect(() => {
        const interval = setInterval(() => new Audio(click1).play(), (60 / currentBpm) * 1000);
        return () => clearInterval(interval);
    });

    return (
        <div id="metronome">
            <h1>Digital Metronome</h1>
            <div style={animationStyle} className="circle"><span className="circle-text">{currentBpm}</span></div>
            <div className="radio-buttons">
                {Array.from(sortedBpms)?.map(k =>
                (<RadioButton
                    key={k}
                    id={k}
                    value={k}
                    onChange={(e) => updateBpm(e.target.value)}
                    checked={k === currentBpm}>
                    {k} BPM</RadioButton>))}
            </div>
            <h3>Songs that use this BPM:</h3>
            {sortedBpmMap[currentBpm]?.map(song => (<span key={song}>{song}</span>))}
        </div>
    );
}

export default Metronome;
