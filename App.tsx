
import React, { useState } from 'react';
import Header from './components/Header';
import PlayerBar from './components/PlayerBar';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import PlaylistView from './components/PlaylistView';
import ArtistsView from './components/ArtistsView';
import EventModal from './components/EventModal';
import { ViewType, Playlist, Track } from './types';
import { MOCK_PLAYLISTS, MOCK_TRACKS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerTriggered, setPlayerTriggered] = useState(false);
  
  // Modal State
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Track | null>(null);

  const handlePlaylistClick = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setCurrentView(ViewType.PLAYLIST_DETAIL);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setPlayerTriggered(true);
  };

  const handleViewDetails = (track: Track) => {
    setActiveEvent(track);
    setIsEventModalOpen(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewType.HOME:
        return (
          <HomeView 
            onPlaylistSelect={handlePlaylistClick} 
            onTrackSelect={handleTrackSelect} 
            onViewDetails={handleViewDetails}
          />
        );
      case ViewType.EXPLORE:
        return <ExploreView onTrackSelect={handleTrackSelect} />;
      case ViewType.PLAYLISTS:
        return <ArtistsView />;
      case ViewType.PLAYLIST_DETAIL:
        return selectedPlaylist ? (
          <PlaylistView 
            playlist={selectedPlaylist} 
            onTrackSelect={handleTrackSelect} 
            currentTrackId={currentTrack?.id}
          />
        ) : (
          <HomeView 
            onPlaylistSelect={handlePlaylistClick} 
            onTrackSelect={handleTrackSelect} 
            onViewDetails={handleViewDetails}
          />
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-zinc-500">
            <p className="text-xl">Discover more content soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 pb-40">
        {renderContent()}
      </main>

      {/* Event Modal Overlay */}
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        event={activeEvent}
      />

      {/* Player Bar only appears when music is clicked */}
      {playerTriggered && currentTrack && (
        <PlayerBar 
          currentTrack={currentTrack} 
          isPlaying={isPlaying} 
          onPlayPause={() => setIsPlaying(!isPlaying)} 
        />
      )}
    </div>
  );
};

export default App;
