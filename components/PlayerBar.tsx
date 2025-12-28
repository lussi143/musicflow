
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Info, X, Maximize2 } from 'lucide-react';
import { Track } from '../types';

interface PlayerBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showVolume, setShowVolume] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && isFinite(audioRef.current.duration) && audioRef.current.duration > 0) {
      const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      if (isFinite(seekTime)) {
        audioRef.current.currentTime = seekTime;
        setProgress(parseFloat(e.target.value));
      }
    }
  };

  if (!currentTrack) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ease-in-out transform ${isMinimized ? 'scale-100' : 'scale-100'}`}>
      <audio 
        ref={audioRef} 
        src={currentTrack.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
      
      <div className={`bg-[#0A0A0B]/95 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all duration-500 ${isMinimized ? 'w-16 h-16 p-0' : 'w-72 md:w-80 p-5'}`}>
        
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center group relative overflow-hidden rounded-[2.5rem]"
          >
            <img src={currentTrack.cover} className="w-full h-full object-cover group-hover:brightness-50 transition-all" alt="" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
            </div>
            {isPlaying && (
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#E879F9] rounded-full animate-pulse border-2 border-[#0A0A0B]" />
            )}
          </button>
        ) : (
          <>
            {/* Header / Info */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/10">
                  <img src={currentTrack.cover} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="min-w-0">
                   <p className="text-[10px] font-black text-[#E879F9] uppercase tracking-widest mb-0.5">Flowing</p>
                   <h4 className="text-white text-sm font-bold truncate leading-none">{currentTrack.title}</h4>
                </div>
              </div>
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-center gap-6">
                <button 
                  onClick={onPrev}
                  className="text-zinc-500 hover:text-white transition-all transform active:scale-90"
                >
                  <SkipBack size={20} fill="currentColor" />
                </button>
                <button 
                  onClick={onPlayPause}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#E879F9] hover:text-white transition-all shadow-xl"
                >
                  {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>
                <button 
                  onClick={onNext}
                  className="text-zinc-500 hover:text-white transition-all transform active:scale-90"
                >
                  <SkipForward size={20} fill="currentColor" />
                </button>
              </div>

              {/* Progress */}
              <div className="px-1">
                <input 
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#E879F9] hover:accent-[#22D3EE] transition-all"
                />
                <div className="flex justify-between mt-2">
                   <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest tabular-nums">
                     {audioRef.current && isFinite(audioRef.current.currentTime) ? Math.floor(audioRef.current.currentTime / 60) + ':' + Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0') : '0:00'}
                   </span>
                   <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest tabular-nums">{currentTrack.duration}</span>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div className="flex items-center gap-4">
                   <button className="text-zinc-500 hover:text-red-500 transition-colors">
                     <Heart size={18} />
                   </button>
                   <button className="text-zinc-500 hover:text-[#E879F9] transition-colors">
                     <Info size={18} />
                   </button>
                </div>
                
                <div className="flex items-center gap-2 relative">
                  <button 
                    onMouseEnter={() => setShowVolume(true)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <Volume2 size={18} />
                  </button>
                  <div 
                    className={`transition-all duration-300 overflow-hidden flex items-center ${showVolume ? 'w-20 opacity-100' : 'w-0 opacity-0'}`}
                    onMouseLeave={() => setShowVolume(false)}
                  >
                    <input 
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none accent-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spotify-like Branding Badge */}
            <div className="absolute bottom-1 right-4 flex items-center gap-1 opacity-20">
               <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[7px] font-black uppercase text-zinc-500 tracking-tighter">Verified Link</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerBar;
