import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useState } from 'react';

interface VideoPlayerProps {
  lessonTitle: string;
}

export function VideoPlayer({ lessonTitle }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(23); // Mock progress

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 inline-block mb-4">
            <Play className="w-12 h-12 text-white" />
          </div>
          <p className="text-white text-lg">{lessonTitle}</p>
          <p className="text-gray-400 text-sm mt-2">Video player placeholder</p>
        </div>

        {/* Controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <div className="mb-3">
            <div className="h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:text-blue-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-white text-sm">12:34 / 45:20</span>
            </div>

            <button className="text-white hover:text-blue-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
