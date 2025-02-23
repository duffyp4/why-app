
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from "@/components/ui/use-toast";

export const VoiceChat = ({ isOpen }: { isOpen: boolean }) => {
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
          // First try to get microphone permission
          await navigator.mediaDevices.getUserMedia({ audio: true });
          
          // Then play the dial tone
          await dialTone.play();
          console.log('Dial tone playing successfully');
          
          // Start conversation after 2 seconds
          const timer = setTimeout(async () => {
            dialTone.pause();
            try {
              await conversation.startSession({
                agentId: "bvV3UYHC4ytDbrYZI1Zm",
                overrides: {
                  agent: {
                    firstMessage: "Hello! I'm here to chat with you. What's on your mind?",
                    language: "en",
                  },
                  tts: {
                    voiceId: "XB0fDUnXU5powFXDhCwa", // Charlotte's voice
                  },
                },
              });
              console.log('Conversation started successfully');
            } catch (error) {
              console.error('Failed to start conversation:', error);
              toast({
                title: "Error",
                description: "Failed to start the conversation. Please make sure you've set up an AI agent in ElevenLabs.",
                variant: "destructive"
              });
            }
          }, 2000);

          return () => {
            clearTimeout(timer);
            dialTone.pause();
          };
        } catch (error) {
          console.error('Failed to start audio:', error);
          toast({
            title: "Error",
            description: "Please allow microphone access to start the conversation.",
            variant: "destructive"
          });
        }
      };

      startConversationFlow();
    }
  }, [isOpen, dialTone, conversation, toast]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up conversation');
      conversation.endSession();
    };
  }, [conversation]);

  return null;
};
