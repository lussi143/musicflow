
import React from 'react';
import { Track } from '../types';
import { MOCK_TRACKS } from '../constants';
import { Play, TrendingUp, Radio, Mic2, Star } from 'lucide-react';

interface ExploreViewProps {
  onTrackSelect: (track: Track) => void;
}

const ExploreView: React.FC<ExploreViewProps> = ({ onTrackSelect }) => {
  const genres = [
    { name: 'Techno', color: 'bg-zinc-900 border-zinc-800 text-white', icon: Radio },
    { name: 'Indie', color: 'bg-zinc-900 border-zinc-800 text-white', icon: TrendingUp },
    { name: 'Soul', color: 'bg-zinc-900 border-zinc-800 text-white', icon: Mic2 },
    { name: 'Nu-Jazz', color: 'bg-zinc-900 border-zinc-800 text-white', icon: Radio },
    { name: 'Ambient', color: 'bg-zinc-900 border-zinc-800 text-white', icon: Star },
    { name: 'Phonk', color: 'bg-zinc-900 border-zinc-800 text-white', icon: Mic2 },
  ];

  return (
    <div className="space-y-20 pb-10 animate-in fade-in duration-500">
      <section className="relative h-[450px] rounded-[3rem] overflow-hidden group shadow-2xl">
        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover brightness-[0.4] transition-transform duration-[4s] group-hover:scale-110" alt="Explore" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent p-16 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#8B5CF6] animate-ping"></span>
            <span className="text-white font-black text-xs uppercase tracking-[0.3em]">Live Recording Available</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white mb-8 leading-[1.1] max-w-3xl">
            Experience the <br/><span className="text-[#8B5CF6]">Sonic Underground</span>
          </h1>
          <p className="text-zinc-400 text-xl font-medium max-w-xl mb-12 leading-relaxed">
            Unfiltered studio sessions and exclusive live tracks from the world's most innovative independent creators.
          </p>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-3 px-10 py-4 bg-[#8B5CF6] text-white rounded-full font-black hover:scale-105 hover:bg-[#7C3AED] transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Play size={20} fill="white" />
              Listen Now
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/10 rounded-full font-black hover:bg-white/20 transition-all">
              Save Playlist
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black mb-10 tracking-tight">Browse Genres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {genres.map((genre) => (
            <div 
              key={genre.name} 
              className={`p-8 rounded-[2.5rem] ${genre.color} border flex flex-col items-center justify-center gap-6 cursor-pointer transition-all hover:-translate-y-2 hover:border-[#8B5CF6]/40 hover:bg-[#18181B] group`}
            >
              <div className="p-4 bg-[#18181B] rounded-2xl border border-white/5 group-hover:bg-[#8B5CF6] transition-colors">
                <genre.icon size={32} className="group-hover:text-white transition-colors" />
              </div>
              <span className="font-black text-lg tracking-tight uppercase group-hover:text-[#8B5CF6] transition-colors">{genre.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-black mb-10 tracking-tight">Emerging Tracks</h2>
        <div className="bg-[#18181B] rounded-[2.5rem] p-6 border border-white/5 shadow-2xl">
          {MOCK_TRACKS.map((track, index) => (
            <div 
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className="flex items-center gap-6 p-5 rounded-[1.5rem] hover:bg-white/5 transition-all cursor-pointer group border-b border-white/5 last:border-0"
            >
              <span className="w-8 text-zinc-600 font-black text-lg text-center group-hover:text-[#8B5CF6]">{String(index + 1).padStart(2, '0')}</span>
              <img src={track.cover} className="w-16 h-16 rounded-2xl object-cover shadow-lg" alt={track.title} />
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-lg truncate group-hover:text-[#8B5CF6] transition-colors leading-none mb-2">{track.title}</h4>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">{track.artist}</p>
              </div>
              <div className="hidden md:block text-sm font-bold text-zinc-500 tracking-wide uppercase">{track.album}</div>
              <div className="flex items-center gap-8">
                 <span className="text-sm font-black text-zinc-600 tabular-nums">{track.duration}</span>
                 <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 opacity-0 group-hover:opacity-100 hover:border-[#8B5CF6] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all">
                    <Play size={20} fill="currentColor" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreView;
