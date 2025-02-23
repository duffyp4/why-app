
import { useEffect, useRef } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ isOpen, onError }: { isOpen: boolean; onError: (message: string) => void }) => {
  const conversation = useConversation();
  const sessionStartedRef = useRef(false);

  useEffect(() => {
    if (isOpen && !sessionStartedRef.current) {
      console.log('Attempting to start new conversation session');
      
      const startConversationFlow = async () => {
        try {
          sessionStartedRef.current = true;
          console.log('Starting conversation session...');
          
          await conversation.startSession({
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
          console.log('Conversation session started successfully');
          onError(''); // Clear any previous errors
        } catch (error) {
          console.error('Failed to start conversation:', error);
          sessionStartedRef.current = false;
          onError('Failed to start the conversation. Please check your microphone permissions and try again.');
        }
      };

      startConversationFlow();
    }

    return () => {
      if (sessionStartedRef.current) {
        console.log('Cleaning up conversation session');
        conversation.endSession();
        sessionStartedRef.current = false;
      }
    };
  }, [isOpen, conversation, onError]);

  return null;
};
