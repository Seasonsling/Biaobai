
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Disc, Music2 } from 'lucide-react';

interface Track {
  title: string;
  description: string;
  url: string;
}

interface MusicPlayerProps {
  currentSlideIndex: number;
  totalSlides: number;
}

const TRACKS: Track[] = [
  {
    title: "Sea, You & Me",
    description: "Summer Pockets",
    url: "https://link.hhtjim.com/163/1311347835.mp3"
  },
  {
    title: "I feel it in the wind",
    description: "Finale",
    url: "https://link.hhtjim.com/163/1976472443.mp3"
  }
];

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSlideIndex, totalSlides }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Determine which track should be playing based on slide index
  // 0 -> Main Theme (Summer Pockets)
  // 1 -> Finale Theme (I feel it in the wind) - Only for the last slide
  useEffect(() => {
    const isFinale = currentSlideIndex === totalSlides - 1;
    const targetTrackIdx = isFinale ? 1 : 0;

    if (currentTrackIdx !== targetTrackIdx) {
      setCurrentTrackIdx(targetTrackIdx);
    }
  }, [currentSlideIndex, totalSlides]);

  // Handle track change (when currentTrackIdx updates)
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Small timeout to allow src update
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(console.error);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [currentTrackIdx]);

  // Auto-play when component mounts
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

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-1000">
      <audio 
        ref={audioRef} 
        src={TRACKS[currentTrackIdx].url} 
        loop={true}
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
