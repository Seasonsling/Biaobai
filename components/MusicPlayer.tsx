
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Disc, Music2 } from 'lucide-react';

interface Track {
  title: string;
  description: string;
  url: string;
}

const TRACKS: Track[] = [
  {
    title: "Gymnopedie No. 1",
    description: "Erik Satie - Gentle Piano",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=gymnopedie-no-1-satie-6512.mp3"
  },
  {
    title: "River of Love",
    description: "Romantic Melodies",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=piano-moment-11176.mp3"
  }
];

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-play when component mounts (which happens after "Start" click)
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(e => {
            console.log("Auto-play blocked, waiting for interaction", e);
            setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length;
    setCurrentTrackIdx(nextIdx);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }, 100);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-1000">
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrackIdx].url} 
        loop 
        onEnded={nextTrack}
        onError={(e) => console.error("Audio error:", e)}
      />
      
      {/* Track Info Card */}
      <div className={`
        hidden md:flex items-center gap-3 bg-[#fffbf0]/90 backdrop-blur border border-[#e6dcc6] rounded-xl shadow-sm px-3 py-1.5 transition-all duration-500
        ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
      `}>
         <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0 animate-spin-slow">
             <Music2 size={12} className="text-rose-500" />
         </div>
         <div className="flex flex-col min-w-[80px]">
            <span className="text-xs font-serif font-bold text-[#5c524f] truncate max-w-[120px]">
              {TRACKS[currentTrackIdx].title}
            </span>
         </div>
         <button onClick={nextTrack} className="hover:bg-[#f0eadd] p-1 rounded-full text-[#8c827f] transition-colors">
             <SkipForward size={12} />
         </button>
      </div>

      {/* Main Play Button */}
      <button 
        onClick={togglePlay}
        className={`
          group relative flex items-center justify-center w-10 h-10 rounded-full 
          bg-[#fffbf0]/90 backdrop-blur border border-[#e6dcc6] shadow-sm hover:shadow-md
          text-[#5c524f] hover:text-rose-500 transition-all duration-300
        `}
      >
        {isPlaying ? (
             <>
               <span className="absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-20 animate-ping"></span>
               <Volume2 size={18} />
             </>
        ) : (
            <VolumeX size={18} />
        )}
      </button>
    </div>
  );
};
