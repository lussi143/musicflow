
import React, { useState } from 'react';
import { ViewType } from '../types';
import { Star, Menu, X, PlusCircle } from 'lucide-react';
import { MOCK_TRACKS } from '../constants';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    { id: ViewType.HOME, label: 'Discover' },
    { id: ViewType.EXPLORE, label: 'Explore' },
    { id: ViewType.PLAYLISTS, label: 'Artists' },
    { id: ViewType.CREATE_EVENT, label: 'Create Event' },
  ];

  const featuredArtists = Array.from(new Set(MOCK_TRACKS.map(t => t.artist)));

  const handleNavClick = (viewId: ViewType) => {
    onViewChange(viewId);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="bg-[#E879F9] text-[#050505] py-1.5 px-4 md:px-6 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-12 whitespace-nowrap animate-[marquee_45s_linear_infinite]">
          {[...featuredArtists, ...featuredArtists].map((artist, idx) => (
            <div key={`${artist}-${idx}`} className="flex items-center gap-2 md:gap-4">
              <Star size={8} fill="currentColor" className="opacity-80" />
              <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-[0.3em] md:tracking-[0.4em]">
                {artist}
              </span>
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-[60] bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5 px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <div 
            onClick={() => handleNavClick(ViewType.HOME)} 
            className="flex items-center cursor-pointer group"
          >
            <span className="text-xl md:text-2xl font-black tracking-tighter text-white hover:text-[#E879F9] transition-all duration-300 uppercase">
              MusicFlow
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-bold tracking-tight transition-all duration-300 relative py-2 px-1 flex items-center gap-2 ${
                currentView === link.id ? 'text-[#E879F9]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {link.id === ViewType.CREATE_EVENT && <PlusCircle size={14} />}
              {link.label}
              {currentView === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E879F9] rounded-full shadow-[0_0_15px_#E879F9]" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-sm font-bold text-zinc-400 hover:text-white transition-all">Sign In</button>
          <button className="glow-button bg-white text-black px-6 py-2 rounded-full text-xs font-extrabold shadow-xl hover:bg-[#E879F9] hover:text-white transition-all active:scale-95">
            Join Now
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55] bg-[#050505] pt-24 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-2xl font-black text-left uppercase tracking-tighter flex items-center gap-4 ${
                  currentView === link.id ? 'text-[#E879F9]' : 'text-zinc-500'
                }`}
              >
                {link.id === ViewType.CREATE_EVENT && <PlusCircle size={28} />}
                {link.label}
              </button>
            ))}
            <div className="h-px bg-white/10 w-full my-4" />
            <button className="text-xl font-bold text-white text-left">Sign In</button>
            <button className="bg-[#E879F9] text-white px-8 py-4 rounded-2xl text-lg font-black shadow-2xl">
              Join Now
            </button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
};

export default Header;
