
import { useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ isOpen, onError }: { isOpen: boolean; onError: (message: string) => void }) => {
  const conversation = useConversation({
    onConnect: () => {
      console.log('WebSocket connection established');
    },
    onDisconnect: () => {
      console.log('WebSocket connection ended');
    },
    onMessage: (message) => {
      console.log('Message received:', message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      onError('An error occurred during the conversation');
    },
  });
  
  const sessionStartedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !sessionStartedRef.current) {
      const startConversationFlow = async () => {
        try {
          // Request microphone access first
          await navigator.mediaDevices.getUserMedia({ audio: true });
          console.log('Microphone access granted');
          
          sessionStartedRef.current = true;
          const conversationId = await conversation.startSession({
            agentId: "bvV3UYHC4ytDbrYZI1Zm",
            overrides: {
              agent: {
                firstMessage: "Hello! I'm here to chat with you. What's on your mind?",
                language: "en",
              },
              tts: {
                voiceId: "XB0fDUnXU5powFXDhCwa",
                stability: 0.5,
                similarityBoost: 0.75,
                modelId: "eleven_multilingual_v2",
              },
            },
          });
          console.log('Conversation started with ID:', conversationId);
          onError(''); // Clear any previous errors
        } catch (error) {
          console.error('Failed to start conversation:', error);
          sessionStartedRef.current = false;
          onError('Please allow microphone access to start the conversation.');
        }
      };

      startConversationFlow();
    }

    return () => {
      if (sessionStartedRef.current) {
        console.log('Ending conversation session');
        conversation.endSession();
        sessionStartedRef.current = false;
      }
    };
  }, [isOpen, conversation, onError]);

  // Add volume control (optional)
  useEffect(() => {
    if (sessionStartedRef.current) {
      conversation.setVolume({ volume: 1.0 });
    }
  }, [conversation]);

  return null;
};
