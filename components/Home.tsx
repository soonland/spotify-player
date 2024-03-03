"use client";
import * as React from 'react';
import TopMenuBar from '@/components/TopBar';
import SpotifyPlayer from '@/components/SpotifyPlayer';

export default function Home() {
  const [ results, setResults ] = React.useState<{ data : string[] }>();
  return (
    <>
      <TopMenuBar handleSearch={setResults} />
      <SpotifyPlayer results={results}/>
    </>);
}
