
import React from 'react';
import { Playlist, Track } from '../types';
import { Play, Shuffle, Heart, MoreHorizontal, Clock, Plus } from 'lucide-react';

interface PlaylistViewProps {
  playlist: Playlist;
  onTrackSelect: (track: Track) => void;
  currentTrackId?: string;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ playlist, onTrackSelect, currentTrackId }) => {
  return (
    <div className="pb-16 animate-in fade-in slide-in-from-right-4 duration-500 max-w-5xl mx-auto">
      {/* Refined Banner */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-10 mb-10 text-center md:text-left">
        <div className="w-64 h-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
           <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 space-y-4">
          <span className="text-[#2563EB] font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Official Playlist</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0F172A] leading-tight">
            {playlist.name}
          </h1>
          <p className="text-gray-500 text-lg font-medium max-w-2xl">{playlist.description}</p>
          <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-[#0F172A]">MusicFlow Studio</span>
            <span className="text-gray-200">•</span>
            <span>{playlist.tracks.length} tracks</span>
            <span className="text-gray-200">•</span>
            <span>25:12 total duration</span>
          </div>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex items-center gap-4 mb-10">
        <button className="flex items-center gap-3 px-10 py-3.5 bg-[#2563EB] text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
           <Play size={18} fill="white" />
           Play Now
        </button>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-white border border-gray-200 text-[#0F172A] rounded-xl font-bold hover:bg-gray-50 transition-all">
           <Shuffle size={18} />
           Shuffle
        </button>
        <button className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:bg-gray-50 transition-all">
           <Heart size={20} />
        </button>
        <button className="p-3.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-all ml-auto">
           <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Tracks List - Vertical Rhythm */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-[3rem_1fr_1fr_5rem] px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 bg-gray-50/50">
          <div className="text-center">#</div>
          <div>Track Name</div>
          <div className="hidden md:block">Release</div>
          <div className="flex justify-center"><Clock size={14} /></div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {playlist.tracks.map((track, idx) => {
            const isActive = track.id === currentTrackId;
            return (
              <div 
                key={track.id}
                onClick={() => onTrackSelect(track)}
                className={`grid grid-cols-[3rem_1fr_1fr_5rem] items-center px-6 py-4 transition-all cursor-pointer group ${
                  isActive ? 'bg-blue-50/80' : 'hover:bg-gray-50'
                }`}
              >
                <div className={`text-center font-black text-xs transition-colors ${isActive ? 'text-[#2563EB]' : 'text-gray-300'}`}>
                   {isActive ? (
                     <div className="flex items-center justify-center gap-0.5">
                       <span className="w-1 h-3 bg-[#2563EB] animate-pulse"></span>
                       <span className="w-1 h-2 bg-[#2563EB] animate-pulse" style={{ animationDelay: '0.1s' }}></span>
                       <span className="w-1 h-3 bg-[#2563EB] animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                     </div>
                   ) : idx + 1}
                </div>
                
                <div className="flex items-center gap-4 min-w-0">
                  <img src={track.cover} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt={track.title} />
                  <div className="min-w-0">
                    <h4 className={`font-bold text-sm truncate ${isActive ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>{track.title}</h4>
                    <p className="text-[11px] font-medium text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>

                <div className="hidden md:block text-xs font-semibold text-gray-400 truncate">{track.album}</div>

                <div className="flex items-center justify-center gap-4">
                  <span className="text-xs font-bold text-gray-400 tabular-nums">
                    {track.duration}
                  </span>
                  <button className="text-gray-300 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlaylistView;
