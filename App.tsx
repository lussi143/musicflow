
import React, { useState } from 'react';
import Header from './components/Header';
import PlayerBar from './components/PlayerBar';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import PlaylistView from './components/PlaylistView';
import ArtistsView from './components/ArtistsView';
import CreateEventView from './components/CreateEventView';
import EventModal from './components/EventModal';
import { ViewType, Playlist, Track } from './types';
import { MOCK_PLAYLISTS, MOCK_TRACKS } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.HOME);
  const [allTracks, setAllTracks] = useState<Track[]>(MOCK_TRACKS);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerTriggered, setPlayerTriggered] = useState(false);
  
  // Event Management State
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
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

  const handleCreateOrUpdateEvent = (track: Track) => {
    if (editingTrack) {
        // Update
        setAllTracks(prev => prev.map(t => t.id === track.id ? track : t));
        setEditingTrack(null);
    } else {
        // Create
        setAllTracks(prev => [track, ...prev]);
    }
    setCurrentView(ViewType.HOME);
    setIsEventModalOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setAllTracks(prev => prev.filter(t => t.id !== eventId));
    setIsEventModalOpen(false);
  };

  const handleEditFromModal = (track: Track) => {
    setEditingTrack(track);
    setIsEventModalOpen(false);
    setCurrentView(ViewType.CREATE_EVENT);
  };

  const handleCancelEdit = () => {
    setEditingTrack(null);
    setCurrentView(ViewType.HOME);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewType.HOME:
        return (
          <HomeView 
            tracks={allTracks}
            onPlaylistSelect={handlePlaylistClick} 
            onTrackSelect={handleTrackSelect} 
            onViewDetails={handleViewDetails}
          />
        );
      case ViewType.EXPLORE:
        return <ExploreView onTrackSelect={handleTrackSelect} />;
      case ViewType.PLAYLISTS:
        return <ArtistsView />;
      case ViewType.CREATE_EVENT:
        return (
          <CreateEventView 
            tracks={allTracks} 
            editingTrack={editingTrack}
            onCreateEvent={handleCreateOrUpdateEvent} 
            onDeleteEvent={handleDeleteEvent}
            onCancelEdit={handleCancelEdit}
          />
        );
      case ViewType.PLAYLIST_DETAIL:
        return selectedPlaylist ? (
          <PlaylistView 
            playlist={selectedPlaylist} 
            onTrackSelect={handleTrackSelect} 
            currentTrackId={currentTrack?.id}
          />
        ) : (
          <HomeView 
            tracks={allTracks}
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
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Header 
        currentView={currentView} 
        onViewChange={(view) => {
            if (view !== ViewType.CREATE_EVENT) setEditingTrack(null);
            setCurrentView(view);
        }} 
      />
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 pb-40">
        {renderContent()}
      </main>

      {/* Event Modal Overlay */}
      <EventModal 
        isOpen={isEventModalOpen} 
        onClose={() => setIsEventModalOpen(false)} 
        event={activeEvent}
        onDelete={handleDeleteEvent}
        onEdit={handleEditFromModal}
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
