
import React, { useEffect, useState } from 'react';
import { PhoneOff } from 'lucide-react';

interface CallScreenProps {
  onCallStarted: () => void;
  onEndCall: () => void;
}

export const CallScreen = ({ onCallStarted, onEndCall }: CallScreenProps) => {
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    // Play dial tone sound
    const audio = new Audio('/dial-tone.mp3');
    audio.play();

    // Wait 3 seconds before starting the actual call
    const timer = setTimeout(() => {
      setIsConnecting(false);
      onCallStarted();
    }, 3000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onCallStarted]);

  return (
    <div className="fixed inset-0 bg-[#1E2F3D] z-50 flex flex-col items-center p-8 font-fredoka animate-[scale-up_0.3s_ease-out]">
      {/* Phone number and status */}
      <div className="text-center mt-16">
        <div className="text-white text-4xl mb-2">555-555-5555</div>
        <div className="text-[#4CAF50] text-xl animate-pulse">
          {isConnecting ? 'calling...' : 'Learn with Lara'}
        </div>
      </div>

      {/* End call button */}
      <div className="fixed bottom-16 left-0 right-0 flex justify-center">
        <button 
          onClick={onEndCall}
          className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          <PhoneOff className="w-8 h-8 text-white transform rotate-135" />
        </button>
      </div>
    </div>
  );
};
