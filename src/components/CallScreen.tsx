
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
  
  const conversation = useConversation({
    onMessage: (message) => {
      console.log('Received message:', {
        message,
        status: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onError: (error) => {
      console.error('Conversation error:', {
        error,
        status: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onConnect: () => {
      console.log('WebSocket connected:', {
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    },
    onDisconnect: () => {
      if (sessionStartedRef.current) {
        console.log('WebSocket disconnected:', {
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
      }
    }
  });

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create Audio Context
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioContext;

        // Fetch the audio file
        const response = await fetch('/dial-tone.mp3');
        const arrayBuffer = await response.arrayBuffer();
        
        // Decode the audio data
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Create and configure source
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(audioContext.destination);
        sourceRef.current = source;
        
        console.log('Audio successfully initialized');
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();

    return () => {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const startConversationSession = async () => {
      try {
        if (!sessionStartedRef.current) {
          console.log('Starting initial conversation session...');
          
          // Start audio playback using Web Audio API
          if (sourceRef.current && audioContextRef.current) {
            try {
              if (audioContextRef.current.state === 'suspended') {
                await audioContextRef.current.resume();
              }
              sourceRef.current.start();
              console.log('Audio playback started successfully');
            } catch (audioError) {
              console.error('Audio playback error:', audioError);
            }
          }

          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          sessionStartedRef.current = true;
          console.log('Conversation session started:', conversationId);
        }
      } catch (error) {
        console.error('Error starting conversation session:', error);
      }
    };

    // Wait 3 seconds before starting the actual call
    const timer = setTimeout(() => {
      setIsConnecting(false);
      onCallStarted();
      startConversationSession();
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (sourceRef.current) {
        try {
          sourceRef.current.stop();
        } catch (error) {
          console.error('Error stopping audio:', error);
        }
      }
      if (sessionStartedRef.current) {
        console.log('Cleaning up conversation...');
        sessionStartedRef.current = false;
        conversation.endSession();
      }
    };
  }, [onCallStarted, conversation]);

  const decorativeEmojis = ['🐱', '🐵', '🐰', '🐧', '🐘', '🦊'];

  return (
    <div className="fixed inset-0 bg-[#1E2F3D] z-50 flex flex-col items-center p-8 font-fredoka animate-[scale-up_0.3s_ease-out]">
      {/* Phone number and status */}
      <div className="text-center mt-16">
        <div className="text-white text-4xl mb-2">555-555-5555</div>
        <div className="text-[#4CAF50] text-xl animate-pulse">
          {isConnecting ? 'calling...' : 'Learn with Lara'}
        </div>
      </div>

      {/* Decorative animal buttons (non-interactive) */}
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
