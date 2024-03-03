'use client'
import * as React from 'react';
import TopMenuBar from '@/components/TopBar';
import SpotifyPlayer from '@/components/SpotifyPlayer';

export default function Page() {
  const [ results, setResults ] = React.useState<object | null>(null);
  return (
    <>
      <TopMenuBar handleSearch={setResults} />
      <SpotifyPlayer results={results}/>
    </>);
}
