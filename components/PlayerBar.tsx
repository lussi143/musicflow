
import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { Track } from '../types';

interface PlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentTrack, isPlaying, onPlayPause }) => {
  const [progress] = useState(30);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-3xl">
      <div className="bg-[#0A0A0B]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex items-center gap-8">
        
        {/* Info Area */}
        <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
          <div className="relative group">
            <img src={currentTrack.cover} className="w-14 h-14 rounded-2xl object-cover shadow-xl group-hover:scale-105 transition-transform" alt="" />
            <div className="absolute inset-0 bg-[#E879F9]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden md:block min-w-0 max-w-[150px]">
            <h4 className="font-extrabold text-sm text-white truncate tracking-tight">{currentTrack.title}</h4>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls Area */}
        <div className="flex-1 flex flex-col gap-2.5">
          <div className="flex items-center justify-center gap-8">
            <button className="text-zinc-500 hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button 
              onClick={onPlayPause}
              className="w-11 h-11 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#E879F9] hover:text-white transition-all active:scale-95 shadow-xl"
            >
              {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>
          </div>
          <div className="w-full flex items-center gap-3 px-2">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E879F9] to-[#22D3EE] rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-black text-zinc-600 tabular-nums tracking-widest">{currentTrack.duration}</span>
          </div>
        </div>

        {/* Tools Area */}
        <div className="flex items-center gap-6 flex-shrink-0 pr-4">
          <button className="text-zinc-500 hover:text-[#E879F9] transition-all">
            <Heart size={20} />
          </button>
          <div className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors cursor-pointer hidden sm:flex">
             <Volume2 size={20} />
             <div className="w-16 h-1 bg-white/10 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
