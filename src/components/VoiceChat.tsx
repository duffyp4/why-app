
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ isOpen }: { isOpen: boolean }) => {
  const conversation = useConversation();
  const [dialTone, setDialTone] = useState<HTMLAudioElement | null>(null);

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
      console.log('Conversation opened, playing dial tone');
      // Need to handle user interaction first
      const playAudio = async () => {
        try {
          await dialTone.play();
          console.log('Dial tone playing successfully');
          
          // Start conversation after 2 seconds of dial tone
          const timer = setTimeout(async () => {
            console.log('Stopping dial tone, starting conversation');
            dialTone.pause();
            try {
              await conversation.startSession({
                agentId: "default", // Replace with your agent ID from ElevenLabs
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
            }
          }, 2000);

          return () => {
            clearTimeout(timer);
            dialTone.pause();
          };
        } catch (error) {
          console.error('Failed to play dial tone:', error);
        }
      };

      playAudio();
    }
  }, [isOpen, dialTone, conversation]);

  useEffect(() => {
    return () => {
      console.log('Cleaning up conversation');
      conversation.endSession();
    };
  }, [conversation]);

  return null;
};
