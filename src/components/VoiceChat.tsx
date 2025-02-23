
import { useEffect, useState } from 'react';
import { useConversation } from '@11labs/react';

export const VoiceChat = ({ isOpen }: { isOpen: boolean }) => {
  const conversation = useConversation();
  const [dialTone, setDialTone] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/dial-tone.mp3');
    audio.loop = true;
    setDialTone(audio);

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  useEffect(() => {
    if (isOpen && dialTone) {
      dialTone.play();
      
      // Start conversation after 2 seconds of dial tone
      const timer = setTimeout(async () => {
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
        } catch (error) {
          console.error('Failed to start conversation:', error);
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        dialTone.pause();
      };
    }
  }, [isOpen, dialTone, conversation]);

  useEffect(() => {
    return () => {
      conversation.endSession();
    };
  }, [conversation]);

  return null;
};
