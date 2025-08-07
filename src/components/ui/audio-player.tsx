import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button-variants';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Loader2
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Surah } from '@/types/quran';

interface AudioPlayerProps {
  surah: Surah;
  reciterName: string;
  audioUrl: string;
  onNext?: () => void;
  onPrevious?: () => void;
  onClose?: () => void;
  autoPlay?: boolean; // إضافة خاصية التشغيل التلقائي
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  surah,
  reciterName,
  audioUrl,
  onNext,
  onPrevious,
  onClose,
  autoPlay = true // قيمة افتراضية true للتشغيل التلقائي
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      if (autoPlay) { // التشغيل التلقائي عند جاهزية الصوت
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("فشل التشغيل التلقائي:", error);
        });
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (onNext) onNext();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNext, autoPlay]); // إضافة autoPlay إلى تبعيات useEffect

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // إعادة تعيين حالة التشغيل عند تغيير audioUrl
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(true);
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error("فشل تشغيل الصوت:", error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="audio-player shadow-golden  ">
      <CardContent className="p-6">
        <audio ref={audioRef} src={audioUrl} preload="auto" />
      
        {/* Controls */}
        <div className="flex items-center justify-between mb-5 space-x-4 space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="golden"
            size="lg"
            onClick={togglePlay}
            disabled={isLoading}
            className="rounded-full w-16 h-16"
          >
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!onNext}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-0">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="w-full"
            disabled={isLoading}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

      
        {/* Close Button */}
        {onClose && (
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" onClick={onClose}>
              إغلاق المشغل
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;