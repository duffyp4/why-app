
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
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

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/dial-tone.mp3');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const startConversationSession = async () => {
      try {
        if (!sessionStartedRef.current) {
          console.log('Starting initial conversation session...', {
            timestamp: new Date().toISOString(),
            currentStatus: conversation.status
          });
          
          // Play dial tone
          if (audioRef.current) {
            try {
              await audioRef.current.play();
            } catch (audioError) {
              console.error('Audio playback error:', audioError);
            }
          }

          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm"
          });
          sessionStartedRef.current = true;
          console.log('Conversation session started successfully:', {
            conversationId,
            status: conversation.status,
            timestamp: new Date().toISOString(),
            sessionStarted: sessionStartedRef.current
          });
        }
      } catch (error) {
        console.error('Error starting conversation session:', {
          error,
          status: conversation.status,
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      if (sessionStartedRef.current) {
        console.log('Cleaning up conversation...', {
          status: conversation.status,
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
        sessionStartedRef.current = false;
        conversation.endSession();
      }
    };
  }, [onCallStarted, conversation]);

  const handleGiraffeClick = async () => {
    try {
      console.log('Giraffe button clicked:', {
        currentStatus: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });

      // Only send the message if we have an active session
      if (sessionStartedRef.current && conversation.status === "connected") {
        console.log('Sending giraffe fact request...', {
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
        
        await conversation.startSession({
          agentId: "bvV3UYHC4ytDbrYZI1Zm",
          initialMessages: ["Tell me a fact about giraffes"]
        });
      } else {
        console.log('Cannot send giraffe request - no active session:', {
          currentStatus: conversation.status,
          timestamp: new Date().toISOString(),
          sessionStarted: sessionStartedRef.current
        });
      }
    } catch (error) {
      console.error('Error in giraffe fact request:', {
        error,
        status: conversation.status,
        timestamp: new Date().toISOString(),
        sessionStarted: sessionStartedRef.current
      });
    }
  };

  const animalEmojis = ['🐱', '🐵', '🐰', '🐧', '🐘', '🦒'];

  return (
    <div className="fixed inset-0 bg-[#1E2F3D] z-50 flex flex-col items-center p-8 font-fredoka animate-[scale-up_0.3s_ease-out]">
      {/* Phone number and status */}
      <div className="text-center mt-16">
        <div className="text-white text-4xl mb-2">555-555-5555</div>
        <div className="text-[#4CAF50] text-xl animate-pulse">
          {isConnecting ? 'calling...' : 'Learn with Lara'}
        </div>
      </div>

      {/* Decorative animal buttons */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="grid grid-cols-3 gap-8">
          {animalEmojis.map((emoji, index) => (
            <div 
              key={index}
              className={`w-16 h-16 rounded-full bg-[#33C3F0]/20 border-2 border-[#33C3F0]/40 flex items-center justify-center ${
                index === 5 ? 'cursor-pointer hover:bg-[#33C3F0]/30 transition-colors' : ''
              }`}
              onClick={index === 5 ? handleGiraffeClick : undefined}
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
