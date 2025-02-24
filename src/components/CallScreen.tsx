
import React, { useEffect, useState, useRef } from 'react';
import { PhoneOff } from 'lucide-react';
import { useConversation } from '@11labs/react';

interface CallScreenProps {
  onCallStarted: () => void;
  onEndCall: () => void;
}

export const CallScreen = ({ onCallStarted, onEndCall }: CallScreenProps) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const sessionStartedRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const hasCalledStartRef = useRef(false);
  
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('CallScreen received message:', {
        message,
        status: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onError: (error) => {
      console.error('CallScreen conversation error:', {
        error,
        status: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onConnect: () => {
      console.log('CallScreen WebSocket connected:', {
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onDisconnect: () => {
      if (sessionStartedRef.current) {
        console.log('CallScreen WebSocket disconnected:', {
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
      }
    }
  });

  // Handle audio initialization
  useEffect(() => {
    const initAudio = async () => {
      try {
        if (!audioContextRef.current) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          audioContextRef.current = audioContext;

          const response = await fetch('/dial-tone.mp3');
          const arrayBuffer = await response.arrayBuffer();
          
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.loop = true;
          source.connect(audioContext.destination);
          sourceRef.current = source;
          
          console.log('Audio successfully initialized');
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();

    return () => {
      console.log('CallScreen cleanup - audio resources');
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
          sourceRef.current.disconnect();
        } catch (error) {
          console.error('Error cleaning up audio source:', error);
        }
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle conversation session
  useEffect(() => {
    if (isConnecting && !sessionStartedRef.current && !hasCalledStartRef.current) {
      const timer = setTimeout(() => {
        setIsConnecting(false);
        if (!hasCalledStartRef.current) {
          hasCalledStartRef.current = true;
          console.log('CallScreen - Calling onCallStarted');
          onCallStarted();
        }
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isConnecting, onCallStarted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('CallScreen - Final cleanup');
      if (sessionStartedRef.current) {
        sessionStartedRef.current = false;
        hasCalledStartRef.current = false;
      }
    };
  }, []);

  const decorativeEmojis = ['🐱', '🐵', '🐰', '🐧', '🐘', '🦊'];

  return (
    <div className="fixed inset-0 bg-[#1E2F3D] z-50 flex flex-col items-center p-8 font-fredoka animate-[scale-up_0.3s_ease-out]">
      <div className="text-center mt-16">
        <div className="text-white text-4xl mb-2">123-555-5555</div>
        <div className="text-[#4CAF50] text-xl animate-pulse">
          {isConnecting ? 'calling...' : 'Learn with Lara'}
        </div>
      </div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-3 gap-8">
          {decorativeEmojis.map((emoji, index) => (
            <div 
              key={index}
              className="w-16 h-16 rounded-full bg-[#33C3F0]/20 border-2 border-[#33C3F0]/40 flex items-center justify-center"
            >
              <span 
                className="text-3xl" 
                role="img" 
                aria-label={`Decorative animal ${index + 1}`}
              >
                {emoji}
              </span>
            </div>
          ))}
        </div>
      </div>

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
