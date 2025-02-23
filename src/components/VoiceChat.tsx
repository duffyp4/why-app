
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from "@/components/ui/use-toast";

export const VoiceChat = ({ isOpen, onError }: { isOpen: boolean; onError: (message: string) => void }) => {
  const conversation = useConversation();
  const [dialTone, setDialTone] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Initializing dial tone audio');
    const audio = new Audio('/dial-tone.mp3');
    audio.loop = true;
    setDialTone(audio);

    return () => {
      console.log('Cleaning up dial tone audio');
      audio.pause();
      audio.remove();
    };
  }, []);

  useEffect(() => {
    if (isOpen && dialTone) {
      console.log('Conversation opened, attempting to start');
      
      const startConversationFlow = async () => {
        try {
          // Play the dial tone first
          await dialTone.play().catch((error) => {
            console.error('Failed to play dial tone:', error);
            // Continue even if dial tone fails
          });
          console.log('Starting conversation flow');
          
          // Start conversation after a short delay
          const timer = setTimeout(async () => {
            if (dialTone) {
              dialTone.pause();
            }
            try {
              await conversation.startSession({
                agentId: "bvV3UYHC4ytDbrYZI1Zm",
                overrides: {
                  agent: {
                    firstMessage: "Hello! I'm here to chat with you. What's on your mind?",
                    language: "en",
                  },
                  tts: {
                    voiceId: "XB0fDUnXU5powFXDhCwa",
                  },
                },
              });
              console.log('Conversation started successfully');
              onError(''); // Clear any previous errors
            } catch (error) {
              console.error('Failed to start conversation:', error);
              onError('Failed to start the conversation. Please try refreshing the page.');
            }
          }, 1000);

          return () => {
            clearTimeout(timer);
            if (dialTone) {
              dialTone.pause();
            }
          };
        } catch (error) {
          console.error('Failed to start audio:', error);
          onError('An error occurred while starting the conversation. Please try refreshing the page.');
        }
      };

      startConversationFlow();
    }
  }, [isOpen, dialTone, conversation, onError]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up conversation');
      conversation.endSession();
    };
  }, [conversation]);

  return null;
};
