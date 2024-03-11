"use client";
import * as React from 'react';
import TopMenuBar from '@/components/TopBar';
import SpotifyPlayer from '@/components/SpotifyPlayer';

export default function Home() {
  return (
    <>
      <TopMenuBar />
      <SpotifyPlayer />
    </>);
}
